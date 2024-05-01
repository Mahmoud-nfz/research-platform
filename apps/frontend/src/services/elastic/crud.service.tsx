import axios from "axios";
const ELASTIC_ENDPOINT = process.env.NEXT_PUBLIC_ELASTIC_ENDPOINT;

interface ObjectInfo {

  name: string;

  size: number;

 }

 export const createObject = async (objectName:any, description:any, tags:any, path:any) => {

   try {

     const data = {

       objectName: objectName,

       description: description,

       tags: tags,

       path: path

     };

     const response = await axios.post(`${ELASTIC_ENDPOINT}/endpoint/create`, data);

     return response.data;

   } catch (error) {

     console.error("Error creating object:", error);

     throw new Error("Error creating object. Please try again.");

   }

 }

  

export const getObjects = async (bucketName: any, setObjects: any, setError: any) => {

  console.log(`${ELASTIC_ENDPOINT}`)

  try {

    if (!bucketName.trim()) {

      setError("Please enter a bucket name.");

      return;

    }

    const response = await axios.get(`${ELASTIC_ENDPOINT}/bucket/${bucketName}/objects`);

    setObjects(response.data.objects);

    setError("");

  } catch (error) {

    console.error("Error fetching objects:", error);

    setError("Error fetching objects. Please try again.");

  }

};

  

export const deleteObject = async (bucketName: any, objectName: any) => {

  try {

    const response = await axios.delete(`${ELASTIC_ENDPOINT}/bucket/${bucketName}/object/${objectName}`);

    return response.data;

  } catch (error) {

    console.error("Error deleting object:", error);

    throw new Error("Error deleting object. Please try again.");

  }

};

  

export const renameObject = async (bucketName: any, oldName: any, newName:any) => {

  try {

    const response = await axios.post(`${ELASTIC_ENDPOINT}/bucket/${bucketName}/object/rename`, { oldName, newName });

    return response.data;

  } catch (error) {

    console.error("Error renaming object:", error);

    throw new Error("Error renaming object. Please try again.");

  }

};

  

export const copyObject = async (

  sourceBucket: string,

  destinationBucket: string,

  objectName: string,

) => {

  try {

    const response = await axios.post(`${ELASTIC_ENDPOINT}/bucket/${sourceBucket}/${destinationBucket}/${objectName}`);

    return response.data;

  } catch (error) {

    console.error("Error copying object:", error);

    throw new Error("Error copying object. Please try again.");

  }

};

  

export const fetchBucketObjectsFromMinio = async (bucketName: string): Promise<ObjectInfo[]> => {

  try {

   const response = await axios.get(`${ELASTIC_ENDPOINT}/bucket/${bucketName}/objects`);

   return response.data.objects;

  } catch (error) {

   throw new Error(`Error fetching objects from Minio: ${error}`);

  }

 };