"use client";
import axios from "axios";
const MINIO_WRAPPER_ENDPOINT = process.env.MINIO_WRAPPER_ENDPOINT;

export const handleFileUpload = (
    selectedFile: File,
    bucketName: string,
    folderName: string,
    callback: (progress: number) => void,
    errorCallback: (error: string) => void
) => {
    const updatedFileName = bucketName + "/" + selectedFile.name;
    const updatedFile = new File([selectedFile], updatedFileName, { type: selectedFile.type });
    const newSocket = new WebSocket("ws://localhost:1206/ws");
    newSocket.onopen = () => {
        console.log("WebSocket connection established");

        const CHUNK_SIZE = 1024 * 1024;
        let offset = 0;

        const sendBucketName = () => {
            const btt = updatedFileName + '/' + folderName;
            newSocket.send(btt);
        };

        const sendChunks = () => {
            const chunk = updatedFile.slice(offset, offset + CHUNK_SIZE);
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    const result = e.target.result;
                    if (result instanceof ArrayBuffer) {
                        newSocket.send(result);
                        offset += result.byteLength;
                        callback((offset / updatedFile.size) * 100); // Update progress
                        if (offset < updatedFile.size) {
                            sendChunks();
                        } else {
                            newSocket.close();
                        }
                    } else {
                        console.error("Unexpected result type:", typeof result);
                        errorCallback("Unexpected result type");
                    }
                }
            };

            reader.readAsArrayBuffer(chunk);
        };

        sendBucketName();
        sendChunks();
    };

    newSocket.onclose = () => {
        console.log("WebSocket connection closed");
    };

    newSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        errorCallback("WebSocket error");
    };
};


export const getObjects = async (bucketName: any, setObjects: any, setError: any) => {
    console.log(`${MINIO_WRAPPER_ENDPOINT}`)
    try {
        if (!bucketName.trim()) {
            setError("Please enter a bucket name.");
            return;
        }
        const response = await axios.get(`http://localhost:1206/bucket/${bucketName}/objects`);
        setObjects(response.data.objects);
        setError("");
    } catch (error) {
        console.error("Error fetching objects:", error);
        setError("Error fetching objects. Please try again.");
    }
};


export const deleteObject = async (bucketName: any, objectName: any) => {
    try {
        const response = await axios.delete(`http://localhost:1206/bucket/${bucketName}/object/${objectName}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting object:", error);
        throw new Error("Error deleting object. Please try again.");
    }
};

export const renameObject = async (bucketName: any, oldName: any, newName:any) => {
    try {
        const response = await axios.post(`http://localhost:1206/bucket/${bucketName}/object/rename`, { oldName, newName });
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
        const response = await axios.post(`http://localhost:1206/bucket/${sourceBucket}/${destinationBucket}/${objectName}`);
        return response.data;
    } catch (error) {
        console.error("Error copying object:", error);
        throw new Error("Error copying object. Please try again.");
    }
};
