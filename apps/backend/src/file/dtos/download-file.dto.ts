import { IsPathString } from '@/common';
import { File } from '@/database/entities';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DownloadFileDto implements Partial<File> {
	@IsUUID()
	dataCollectionId: string;

	@IsPathString()
	path: string;

	@IsString()
	@IsNotEmpty()
	name: string;
}
