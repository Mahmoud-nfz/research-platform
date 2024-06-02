'use server';

import { endpoints } from '@/constants';
import { ElasticSearchMetaData } from '@/types/elastic-search';
import { fetcher } from '@/utils/fetcher';

export async function searchObjectsMetadata(query: string) {
	const endpoint = new URL(endpoints.searchObjectsMetadata);
	endpoint.searchParams.set('search', encodeURIComponent(query));

	const { data } = await fetcher<ElasticSearchMetaData[]>(endpoint.href, {
		method: 'GET',
	});

	return data.map((result) => ({
		objectName: result.data.objectName,
		descriptionSnippet: result.data.description,
		path: result.data.path,
	}));
}
