import { IsPathString } from '@/common';
import { File } from '@/database/entities';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsHash,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Min,
} from 'class-validator';

export class CommitUploadDto implements Partial<File> {
	@IsUUID()
	id: string;

	@IsOptional()
	@IsHash('sha-256')
	hash: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsOptional()
	@IsPathString()
	path: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	size: number;

	@Type(() => Date)
	@IsDate()
	uploadedAt: Date;

	@IsOptional()
	@IsUUID()
	dataCollectionId: string;
}
