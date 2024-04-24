"use client";
import { send } from "process";
import React, { useState } from "react";

export default function Upload() {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [bucketName, setBucketName] = useState<string | null>(null);
	const [folderName, setFolderName] = useState<string | null>(null);
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
	};
	const handleBucketName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value || null;
		setBucketName(name);
	}
	const handleFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value || null;
		setFolderName(name);
	}

	const handleFileUpload = () => {
		if (!selectedFile) return;
		const updatedFileName = bucketName + "/" + selectedFile.name;
		const updatedFile = new File([selectedFile], updatedFileName, { type: selectedFile.type });
		const newSocket = new WebSocket("ws://localhost:1206/ws");

		newSocket.onopen = () => {
			console.log("WebSocket connection established");
			const CHUNK_SIZE = 1024 * 1024;
			let offset = 0;
			const sendBucketName = () => {
				var btt = updatedFileName +'/'+ folderName;
				newSocket.send(btt);
				
			}
			const sendChunks = () => {
				const chunk = updatedFile.slice(offset, offset + CHUNK_SIZE);
				const reader = new FileReader();

				reader.onload = (e) => {
					if (e.target?.result) {
						const result = e.target.result;
						if (result instanceof ArrayBuffer) {
							
							newSocket.send(result);
							offset += result.byteLength;
							if (offset < updatedFile.size) {
								sendChunks();
							} else {
								newSocket.close();
							}
						} else {
							console.error(
								"Unexpected result type:",
								typeof result
							);
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
			setSocket(null);
		};

		setSocket(newSocket);
	};

	return (
		<div>
		<div className="flex flex-col">
			<h1>Enter Folder Name</h1>
			<input type="text" placeholder="Enter Folder name" onChange={handleFolderName} />
			<h1>Enter Bucket Name</h1>
			<input type="text" placeholder="Enter Folder name" onChange={handleBucketName} />
			</div>
		<div className="flex flex-col">
			<h1>WebSocket File Upload</h1>
			<input type="file" onChange={handleFileSelect} />
			
			<button onClick={handleFileUpload}>Upload File</button>
		</div></div>
	);
}
