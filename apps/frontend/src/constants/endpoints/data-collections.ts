import { join } from 'path';

export const dataCollections = {
	create: () => '/data-collections',
	getAll: () => '/data-collections',
	getAllPerProject: (projectId: string) => join('/data-collections', projectId),
};
