'use server';

import { endpoints } from '@/constants';
import { fetcher } from '@/utils/fetcher';

export async function getObjects(bucketName: string) {
	return fetcher<{ data: string[] }>(endpoints.getObjects(bucketName), {
		method: 'GET',
		base: process.env.MINIO_WRAPPER_HTTP_URL as string,
	});
}
