import { File } from '@/database/entities';

export type FileTokenPayloadDto = Pick<
	Partial<File>,
	'id' | 'hash' | 'name' | 'path' | 'size' | 'dataCollectionId'
> & { userId: string };
