'use server';

import { endpoints } from '@/constants';
import { fetcher } from '@/utils/fetcher';

export async function deleteObject(bucketName: string, objectName: string) {
	return fetcher(endpoints.deleteObject(bucketName, objectName), {
		method: 'DELETE',
		base: process.env.MINIO_WRAPPER_HTTP_URL as string,
	});
}
