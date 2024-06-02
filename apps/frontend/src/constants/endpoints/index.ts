import { getHref } from '@/utils/getHref';

export * from './files';

export const login = '/auth/login';
export const profile = '/user/profile';
export const projects = '/projects';
export const createProject = '/projects';
export const searchProjects = (searchParams: { query: string }) =>
	getHref('/projects/search', searchParams);
export const createFile = '/files/create';
export const searchObjectsMetadata = '/elastic';
export const getObjects = (bucketName: string) =>
	`/bucket/${bucketName}/objects`;
export const deleteObject = (bucketName: string, objectName: string) =>
	`/bucket/${bucketName}/object/${objectName}`;
export const renameObject = (bucketName: string) =>
	`/bucket/${bucketName}/object/rename`;
export const copyObject = (
	sourceBucket: string,
	destinationBucket: string,
	objectName: string
) => `/bucket/${sourceBucket}/${destinationBucket}/${objectName}`;
export const upload = '/upload';
export const download = '/download';
export const createDataCollection = '/data-collections';
export const allDataCollections = '/data-collections';
export const dataCollectionsPerProject = '/data-collections';
export const projectsWithCreatePermission = '/projects/can-create';
