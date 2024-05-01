import axios from "axios";
const ELASTIC_ENDPOINT = process.env.NEXT_PUBLIC_ELASTIC_ENDPOINT;

interface SearchResult {
  id: string;
  data: {
    objectName: string;
    description: string;
    tags: string[];
    path: string;
    type: string;
  };
}

 export const createObject = async (
   objectName: string,
   description: string,
   tags: string[],
   path: string,
  type: string
 ) => {
   try {
     const data = {
       objectName: objectName,
       description: description,
       tags: tags,
       path: path,
       type : type
     };
 
     const response = await axios.post(`${ELASTIC_ENDPOINT}/create`, data, {
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
     const searchResults: SearchResult[] = response.data;
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
 