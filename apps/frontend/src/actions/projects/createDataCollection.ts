'use server';

import { endpoints } from '@/constants';
import { DataCollection, Project } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';

export async function createDataCollection(data: Partial<DataCollection>) {
	return fetcher(endpoints.dataCollections.create(), {
		method: 'POST',
		body: JSON.stringify(data),
	});
}
