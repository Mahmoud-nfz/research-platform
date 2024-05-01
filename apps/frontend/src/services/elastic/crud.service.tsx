import axios from "axios";
import { ElasticCreateMetaData,ElasticSearchMetaData } from "../../types/elastic-search";

const ELASTIC_ENDPOINT = process.env.NEXT_PUBLIC_ELASTIC_ENDPOINT;

export const createObjectMetadata = async (metadata: ElasticCreateMetaData) => {
  try {
    const requestData = {
      data: {
        objectName: metadata.data.objectName,
        description: metadata.data.description,
        tags: metadata.data.tags,
        path: metadata.data.path,
        type: metadata.data.type
      }
    };

    const response = await axios.post(`${ELASTIC_ENDPOINT}/create`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating object:", error);
    throw new Error(error.message);
  }
}

 
 export const searchObjects = async (query: string): Promise<{ objectName: string; descriptionSnippet: string; path: string }[]> => {
   try {
     const response = await axios.get(`${ELASTIC_ENDPOINT}?search=${encodeURIComponent(query)}`);
     const searchResults: ElasticSearchMetaData[] = response.data;
     const formattedResults = searchResults.map(result => ({
       objectName: result.data.objectName,
       descriptionSnippet: result.data.description.substring(0, 50), // Adjust the length as needed
       path: result.data.path
     }));
     return formattedResults;
   } catch (error) {
     console.error("Error searching objects:", error);
     throw new Error("Failed to search objects");
   }
 }
 