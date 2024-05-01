const MINIO_WRAPPER_ENDPOINT = process.env.NEXT_PUBLIC_MINIO_WEBSOCKETS_ENDPOINT;

export const handleFileUpload = (
    selectedFile: File,
    bucketName: string,
    folderName: string,
    callback: (progress: number) => void,
    errorCallback: (error: string) => void
) => {
    console.log("Uploading file:", selectedFile.name);
    const updatedFileName = bucketName + "/" + selectedFile.name;
    const updatedFile = new File([selectedFile], updatedFileName, { type: selectedFile.type });
    const newSocket = new WebSocket(`ws://${MINIO_WRAPPER_ENDPOINT}/upload`);
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
                        callback((offset / updatedFile.size) * 100); 
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
