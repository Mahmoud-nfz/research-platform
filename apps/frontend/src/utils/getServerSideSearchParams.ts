import { PageProps } from '@/types/page-props';

export const getServerSideSearchParams = <const K extends readonly string[]>(
	searchParams: PageProps['searchParams'],
	keys: K
) => {
	return keys.reduce((result, key) => {
		const search_query = searchParams[key];
		const search = Array.isArray(search_query) ? search_query[0] : search_query;
		return { ...result, [key]: search };
	}, {}) as { [key in K[number]]: string | undefined };
};
