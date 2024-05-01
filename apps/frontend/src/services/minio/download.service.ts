const MINIO_WRAPPER_ENDPOINT = process.env.NEXT_PUBLIC_MINIO_WEBSOCKETS_ENDPOINT;

export const handleFileDownload = (selectedObjects:any, bucketName:any) => {
    selectedObjects.forEach((fileName:any) => {
        const socket = new WebSocket(`ws://${MINIO_WRAPPER_ENDPOINT}/download`);
        socket.onopen = () => {
            console.log("WebSocket connection established for download");
            socket.send(JSON.stringify({ bucketName, fileName }));
        };

        socket.onmessage = (event) => {
            const message = event.data;
            if (typeof message === "string") {
            } else if (message instanceof Blob) {
                const fileUrl = URL.createObjectURL(message);
                const a = document.createElement("a");
                a.href = fileUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed for download");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    });
};