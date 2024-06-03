import { File } from '@/database/entities';

export type UploadTokenPayloadDto = Pick<
	Partial<File>,
	'id' | 'hash' | 'name' | 'path' | 'size'
> & { userId: string };
