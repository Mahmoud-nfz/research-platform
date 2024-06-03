import { getHref } from '@/utils/getHref';

export const projects = {
	getOne: (projectId: string) => `/projects/${projectId}`,
	getAllWithCreatePermission: () => '/projects/can-create',
	create: () => '/projects',
	getAll: () => '/projects',
	search: (searchParams: { query: string }) =>
		getHref('/projects/search', searchParams),
};
