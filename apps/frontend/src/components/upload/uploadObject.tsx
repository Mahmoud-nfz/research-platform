'use client';

import useUploadFile from '@/hooks/upload/useUploadFile';
import React, { useState } from 'react';

const Upload: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [bucketName, setBucketName] = useState<string | null>(null);
	const [folderName, setFolderName] = useState('');
	const [uploadProgress, setUploadProgress] = useState(0);

	const { mutate: uploadFile, error } = useUploadFile();

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
	};

	const handleBucketName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value || null;
		setBucketName(name);
	};

	const handleFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value || '';
		setFolderName(name);
	};

	const handleUpload = () => {
		if (!selectedFile || !bucketName) return;
		if (!folderName) {
			setFolderName('');
		}
		// @ts-ignore
		uploadFile({ selectedFile, bucketName, folderName, setUploadProgress });
	};

	return (
		<div>
			<div className="flex flex-col">
				<h1>Enter Folder Name</h1>
				<input
					type="text"
					placeholder="Enter Folder name"
					onChange={handleFolderName}
				/>
				<h1>Enter Bucket Name</h1>
				<input
					type="text"
					placeholder="Enter Bucket name"
					onChange={handleBucketName}
				/>
			</div>
			<div className="flex flex-col">
				<h1>WebSocket File Upload</h1>
				<input type="file" onChange={handleFileSelect} />
				<button onClick={handleUpload}>Upload File</button>
			</div>
			{uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
			{error && <p className="text-red-700">{error.message}</p>}
		</div>
	);
};

export default Upload;
