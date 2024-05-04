import { Controller, Post, Body, ParseUUIDPipe, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dtos/create-file.dto';
import { DataCollection, File } from '@/database/entities';
import { CommitUploadDto } from './dtos/commit-upload.dto';

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('/create')
	async create(
		@Body() createFileDto: CreateFileDto,
		@Body('dataCollectionId', ParseUUIDPipe) dataCollectionId: string
	) {
		const dataCollection = new DataCollection({ id: dataCollectionId });
		return this.fileService.createOne(createFileDto, dataCollection);
	}

	/**
	 * @notes
	 * Intended for MinIO wrapper use
	 */
	@Post('/upload/commit')
	async commitUpload(@Body() finishUploadDto: CommitUploadDto) {
		const file = new File({ ...finishUploadDto });
		return this.fileService.commitUpload(file);
	}

	/**
	 * @notes
	 * Intended for MinIO wrapper use
	 */
	@Delete('/upload/rollback')
	async rollbackUpload(@Body('id', ParseUUIDPipe) fileId: string) {
		const file = new File({ id: fileId });
		return this.fileService.rollbackUpload(file);
	}
}
