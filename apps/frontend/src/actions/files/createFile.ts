'use server';

import { endpoints } from '@/constants';
import { File } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';

type CreateFile = Pick<
	File,
	'hash' | 'name' | 'path' | 'size' | 'dataCollectionId'
>;

export async function createFile(data: CreateFile) {
	return fetcher<{ url: string; jwt: string }>(endpoints.files.createFile(), {
		method: 'POST',
		body: JSON.stringify(data),
	});
}
