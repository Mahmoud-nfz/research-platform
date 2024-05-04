import {
	Controller,
	Post,
	Body,
	ParseUUIDPipe,
	Delete,
	Get,
	Param,
	UseGuards,
	Query,
	DefaultValuePipe,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dtos/create-file.dto';
import { DataCollection, File } from '@/database/entities';
import { CommitUploadDto } from './dtos/commit-upload.dto';
import { RequirePermission } from '@/permission/require-permission.decorator';
import { JwtAuthGuard } from '@/auth/guards';
import { PermissionGuard } from '@/permission/permission.guard';
import { DataCollectionAction } from '@/data-collection/data-collection-action.enum';
import { ParsePathPipe } from '@/common/pipes/parse-path.pipe';
import { normalize } from 'path';

@Controller('files')
@UseGuards(JwtAuthGuard, PermissionGuard)
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

	@Get(':id')
	@RequirePermission((req) => req.params.id, DataCollectionAction.read)
	async findFilesByDataCollection(
		@Param('id', ParseUUIDPipe) dataCollectionId: string
	) {
		const dataCollection = new DataCollection({ id: dataCollectionId });
		return this.fileService.findFilesByDataCollection(dataCollection);
	}

	@Get(':id/direct-children')
	@RequirePermission((req) => req.params.id, DataCollectionAction.read)
	async findDirectFilesByDataCollection(
		@Param('id', ParseUUIDPipe) dataCollectionId: string,
		@Query('path', new DefaultValuePipe('/'), ParsePathPipe) path: string
	) {
		const dataCollection = new DataCollection({ id: dataCollectionId });
		return this.fileService.findDirectFilesByDataCollection(
			dataCollection,
			normalize(path.concat('/'))
		);
	}
}
