export const endpoints = {
  login: "/auth/login",
  profile: "/user/profile",
  projects: "/projects",
  createProject: "/projects",
  createObjectMetadata: "/elastic/create",
  searchObjects: "/elastic",
  getObjects: (bucketName: string) => `/bucket/${bucketName}/objects`,
  deleteObject: (bucketName: string, objectName: string) =>
    `/bucket/${bucketName}/object/${objectName}`,
  renameObject: (bucketName: string) => `/bucket/${bucketName}/object/rename`,
  copyObject: (
    sourceBucket: string,
    destinationBucket: string,
    objectName: string
  ) => `/bucket/${sourceBucket}/${destinationBucket}/${objectName}`,
  upload: '/upload',
  download: '/download'
};
