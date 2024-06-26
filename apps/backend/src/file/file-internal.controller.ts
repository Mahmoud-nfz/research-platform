import {
	Controller,
	Post,
	Body,
	ParseUUIDPipe,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { UploadTokenPayloadDto } from './dtos/commit-upload.dto';
import { PermissionGuard } from '@/permission/permission.guard';
import { File } from '@/database/entities';
import { ParseJwtPipe } from '@/common/pipes/parse-jwt.pipe';
import { ApiKeyAuthGuard } from '@/auth/guards/api-key.guard';

/**
 * @notes
 * Intended for MinIO wrapper use
 */
@Controller('_files')
@UseGuards(ApiKeyAuthGuard, PermissionGuard)
export class FileInternalController {
	constructor(private readonly fileService: FileService) {}

	@Post('/upload/commit')
	async commitUpload(
		@Body('token', ParseJwtPipe) commitUploadDto: UploadTokenPayloadDto
	) {
		const file = new File({
			id: commitUploadDto.id,
			hash: commitUploadDto.hash,
			path: commitUploadDto.path,
			name: commitUploadDto.name,
			size: commitUploadDto.size,
			uploadedAt: new Date(),
		});
		return this.fileService.commitUpload(file);
	}

	@Delete('/upload/rollback')
	async rollbackUpload(@Body('id', ParseUUIDPipe) fileId: string) {
		const file = new File({ id: fileId });
		return this.fileService.rollbackUpload(file);
	}
}
