import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataCollection, File, User } from '@/database/entities';
import { DataSource, Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MetadataIndex } from '@/metadata-engine/metadata-index.enum';
import { FileMetadata } from '@/metadata-engine/schemas';
import { dirname } from 'path';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(File) private readonly repository: Repository<File>,
		private readonly elasticsearchService: ElasticsearchService,
		private readonly dataSource: DataSource,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async createOne(
		values: Partial<File>,
		dataCollection: DataCollection,
		user: User
	) {
		// Create a File entity with the provided values
		const file = this.repository.create({
			...values,
			dataCollection,
		});

		// Check if a file with the same dataCollectionId, path, and name already exists
		const existingFile = await this.repository.findOne({
			where: {
				dataCollection,
				path: values.path,
				name: values.name,
			},
		});

		if (existingFile) {
			// If the file exists and the hash is different, throw a 400 Bad Request error
			if (
				!timingSafeEqual(
					Buffer.from(existingFile.hash),
					Buffer.from(values.hash)
				)
			) {
				throw new BadRequestException(
					'A different file with the same path and name already exists/is currently being uploaded in this data collection.'
				);
			}

			// If the file exists and the hash is the same, return the existing file's JWT and URL
			const jwt = this.jwtService.sign({
				id: existingFile.id,
				hash: existingFile.hash,
				userId: user.id,
				size: existingFile.size,
				path: existingFile.path,
				name: existingFile.name,
			});
			return { jwt, url: this.configService.getMinioWrapperConfig().wsUrl };
		} else {
			// If the file doesn't exist, insert the new file
			await this.repository.save(file);

			// Generate the JWT for the new file
			const jwt = this.jwtService.sign({
				id: file.id,
				hash: file.hash,
				userId: user.id,
				size: file.size,
				path: file.path,
				name: file.name,
			});

			// Return the JWT and URL
			return { jwt, url: this.configService.getMinioWrapperConfig().wsUrl };
		}
	}

	async rollbackUpload(file: File) {
		return this.repository.delete(file.id);
	}

	async commitUpload(file: File) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const result = await queryRunner.manager
				.createQueryBuilder()
				.update(File)
				.set(file)
				.where('id = :id', { id: file.id })
				.returning('*')
				.execute()
				.then((res) => {
					if (res.affected === 0)
						throw new BadRequestException('File not found');
					else
						return new File({
							...res.raw[0],
							uploadedAt: res.raw[0]?.uploaded_at ?? null,
							dataCollectionId: res.raw[0]?.data_collection_id,
						});
				});

			await this.elasticsearchService.index({
				index: MetadataIndex.files,
				document: new FileMetadata(result),
			});

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await queryRunner.release();
		}
	}

	async findFilesByDataCollection(dataCollection: DataCollection) {
		const result = await this.elasticsearchService.search<FileMetadata>({
			index: MetadataIndex.files,
			query: {
				term: {
					dataCollectionId: dataCollection.id,
				},
			},
		});
		return result.hits.hits.map((res) => res._source);
	}

	async findDirectFilesByDataCollection(
		dataCollection: DataCollection,
		path: string
	) {
		const result = await this.elasticsearchService.search<FileMetadata>({
			index: MetadataIndex.files,
			query: {
				bool: {
					must: [
						{ term: { dataCollectionId: dataCollection.id } },
						{
							regexp: {
								// Match either the prefix path or the prefix path with a segment after it
								path: `${path}(([^/]+/)?)`,
							},
						},
					],
				},
			},
		});

		const toFolder = (file: FileMetadata) => ({
			...file,
			name: file.path.split('/').at(-2),
			path: dirname(file.path),
		});

		return result.hits.hits.reduce(
			(prev, curr) => ({
				folders:
					curr._source.path !== path &&
					!prev.folders.find(
						(folder) => folder.path === dirname(curr._source.path)
					)
						? [...prev.folders, toFolder(curr._source)]
						: prev.folders,
				files:
					curr._source.path === path
						? [...prev.files, curr._source]
						: prev.files,
			}),
			{ files: [], folders: [] } as {
				files: FileMetadata[];
				folders: FileMetadata[];
			}
		);
	}
}
