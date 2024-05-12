import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataCollection } from '../database/entities/data-collection.entity';
import { DataSource, Repository } from 'typeorm';
import { Permission, Project, User } from '@/database/entities';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MetadataIndex } from '@/metadata-engine/metadata-index.enum';
import { DataCollectionMetadata } from '@/metadata-engine/schemas';

@Injectable()
export class DataCollectionService {
	constructor(
		@InjectRepository(DataCollection)
		private readonly repository: Repository<DataCollection>,
		private readonly elasticsearchService: ElasticsearchService,
		private readonly dataSource: DataSource
	) {}

	async createOne(
		owner: User,
		project: Project,
		values: Partial<DataCollection>
	) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		try {
			const dataCollection = new DataCollection({ ...values, owner, project });
			const result = await queryRunner.manager
				.withRepository(this.repository)
				.save(dataCollection);
			await this.elasticsearchService.index({
				index: MetadataIndex.data_collections,
				document: new DataCollectionMetadata(result),
			});
			await queryRunner.commitTransaction();
			// do not worry about the finally clause executing after the return.
			// it is always executed. this can be tested easily.
			return result;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await queryRunner.release();
		}
	}

	async findManyByOwner(owner: User) {
		return this.repository
			.createQueryBuilder('data_collection')
			.where('data_collection.owner_id = :ownerId', { ownerId: owner.id })
			.execute();
	}

	async findManyByUser(user: User) {
		// Subquery to select subjects where the user has any permission
		const permissionSubQuery = this.repository.manager
			.createQueryBuilder(Permission, 'permission')
			.select('DISTINCT permission.subject_id')
			.where('permission.user_id = :userId', { userId: user.id })
			.getQuery();

		// Main query to select data collections accessible by the user
		return (
			this.repository
				.createQueryBuilder('data_collection')
				// Owner of data collection
				.where('data_collection.owner_id = :userId', { userId: user.id })
				// User has permission on data collection
				.orWhere(`data_collection.id IN (${permissionSubQuery})`)
				// User has permission on project containing data collections
				.orWhere(`data_collection.project_id IN (${permissionSubQuery})`)
				.getMany()
		);
	}

	async findManyByProject(user: User, project: Project) {
		// Subquery to select subjects where the user has any permission
		const permissionSubQuery = this.repository.manager
			.createQueryBuilder(Permission, 'permission')
			.select('DISTINCT permission.subject_id')
			.where('permission.user_id = :userId', { userId: user.id });

		// Main query to select data collections accessible by the user
		return this.repository
			.createQueryBuilder('data_collection')
			.where('data_collection.project_id = :projectId', {
				projectId: project.id,
			})
			.andWhere((qb) =>
				qb
					// Owner of data collection
					.where('data_collection.owner_id = :userId', { userId: user.id })
					// User has permission on data collection
					.orWhere(`data_collection.id IN (${permissionSubQuery.getQuery()})`)
					// User has permission on project
					.orWhere(`:projectId IN (${permissionSubQuery.getQuery()})`, {
						projectId: project.id,
					})
					.setParameters(permissionSubQuery.getParameters())
			)
			.getMany();
	}
}
