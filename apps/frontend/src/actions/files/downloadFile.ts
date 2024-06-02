'use server';

import { endpoints } from '@/constants';
import { File } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';

type DownloadFile = Pick<File, 'dataCollectionId' | 'path' | 'name'>;

export async function downloadFile(data: DownloadFile) {
	return fetcher<{ url: string; jwt: string }>(endpoints.files.download(), {
		method: 'PUT',
		body: JSON.stringify(data),
	});
}
