export * from './auth';
export * from './data-collections';
export * from './files';
export * from './minio';
export * from './projects';

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
