import { IsPathString } from '@/common';
import { NormalizePath } from '@/common/decorators/normalize-path.decorator';
import { File } from '@/database/entities';
import { IsHash, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFileDto implements Partial<File> {
	@IsHash('sha256')
	hash: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@NormalizePath()
	@IsPathString()
	path: string;

	@IsInt()
	@Min(1)
	size: number;
}
