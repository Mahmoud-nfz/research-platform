import { Base, DataCollection } from '@/database/entities';
import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateDataCollectionDto
	implements Partial<Omit<DataCollection, keyof Base>>
{
	@IsUUID()
	projectId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsUrl()
	imageUrl: string;

	@IsString()
	description: string;

	@IsString({ each: true })
	tags: string[];
}
