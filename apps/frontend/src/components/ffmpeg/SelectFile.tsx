'use client';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ffmpegStore } from '../../actions/ffmpeg/ffmpegStore';

const file = ffmpegStore.file;

export const SelectFile: React.FC = observer(() => {
	const [bucketName, setBucketName] = useState('');
	const [fileName, setFileName] = useState('');
	const [isLoading, setIsLoading] = useState(false); // State to manage loading animation

	const handleFileSelection = () => {
		setIsLoading(true); // Start loading animation

		// Create a WebSocket connection
		const socket = new WebSocket('ws://localhost:1206/download');

		// Handle connection open event
		socket.onopen = () => {
			console.log('WebSocket connection established');

			// Send a message to the server with bucket name and file name
			const message = {
				bucketName: bucketName,
				fileName: fileName,
			};
			socket.send(JSON.stringify(message));
		};

		// Handle received messages from the server
		socket.onmessage = (event) => {
			const fileData = event.data;

			// Handle received file data here
			console.log('Received file data:', fileData);

			// Pass the received file data to ffmpeg function
			// Here you may need to process the fileData according to your requirements
			ffmpegStore.loadVideo(fileData);

			setIsLoading(false); // Stop loading animation
		};

		// Handle connection error
		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
			setIsLoading(false); // Stop loading animation
		};

		// Handle connection close event
		socket.onclose = () => {
			console.log('WebSocket connection closed');
			setIsLoading(false); // Stop loading animation
		};
	};

	return (
		<div className="step p-4">
			<div className="block mb-4">
				<label className="block text-sm font-medium text-gray-700">
					Bucket Name:
					<input
						type="text"
						value={bucketName}
						onChange={(e) => setBucketName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
					/>
				</label>
			</div>
			<div className="block mb-4">
				<label className="block text-sm font-medium text-gray-700">
					File Name:
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500 sm:text-sm"
					/>
				</label>
			</div>
			<button
				onClick={handleFileSelection}
				className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brown-600 hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500"
				disabled={isLoading}
			>
				{isLoading && (
					<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
				)}
				Send Request
			</button>
		</div>
	);
});
