// Upload.tsx
import React, { useState } from "react";
import { handleFileUpload } from "../../../services/upload.service";
import { set } from "react-hook-form";

const Upload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [bucketName, setBucketName] = useState<string | null>(null);
    const [folderName, setFolderName] = useState<string >("");
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleBucketName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value || null;
        setBucketName(name);
    };

    const handleFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value || "";
        setFolderName(name);
    };

    const handleUpload = () => {
        if (!selectedFile || !bucketName ) return;
        if (!folderName) {setFolderName('');}
        handleFileUpload(
            selectedFile,
            bucketName,
            folderName,
            (progress) => setUploadProgress(progress),
            (error) => setError(error)
        );
    };

    return (
        <div>
            <div className="flex flex-col">
                <h1>Enter Folder Name</h1>
                <input type="text" placeholder="Enter Folder name" onChange={handleFolderName} />
                <h1>Enter Bucket Name</h1>
                <input type="text" placeholder="Enter Bucket name" onChange={handleBucketName} />
            </div>
            <div className="flex flex-col">
                <h1>WebSocket File Upload</h1>
                <input type="file" onChange={handleFileSelect} />
                <button onClick={handleUpload}>Upload File</button>
            </div>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Upload;
