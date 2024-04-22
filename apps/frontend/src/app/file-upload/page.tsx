"use client";
import React, { useState } from "react";

export default function Home() {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [bucketName, setBucketName] = useState<string | null>(null);
	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		setSelectedFile(file);
	};
	const handleBucketName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value || null;
		setBucketName(name);
	}

	const handleFileUpload = () => {
		if (!selectedFile) return;

		const newSocket = new WebSocket("ws://localhost:1206/ws");

		newSocket.onopen = () => {
			console.log("WebSocket connection established");
			newSocket.send(selectedFile.name);

			const CHUNK_SIZE = 1024 * 1024;
			let offset = 0;
			const sendBucketName = () => {
				if (bucketName) {
					newSocket.send(bucketName);
				}
			}
			const sendChunks = () => {
				const chunk = selectedFile.slice(offset, offset + CHUNK_SIZE);
				const reader = new FileReader();

				reader.onload = (e) => {
					if (e.target?.result) {
						const result = e.target.result;
						if (result instanceof ArrayBuffer) {
							// Send chunk of data
							newSocket.send(result);
							offset += result.byteLength;
							if (offset < selectedFile.size) {
								sendChunks();
							} else {
								// Close the WebSocket connection after all chunks have been sent
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
			sendChunks();
		};

		newSocket.onclose = () => {
			console.log("WebSocket connection closed");
			setSocket(null);
		};

		setSocket(newSocket);
	};

	return (
		<div className="flex flex-col">
			<h1>WebSocket File Upload</h1>
			<input type="file" onChange={handleFileSelect} />
			<input type="text" placeholder="Enter bucket name" onChange={handleBucketName} />
			<button onClick={handleFileUpload}>Upload File</button>
		</div>
	);
}
