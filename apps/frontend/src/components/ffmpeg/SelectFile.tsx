import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ffmpegStore } from '../../actions/ffmpeg/ffmpegStore';

const file = ffmpegStore.file;

export const SelectFile: React.FC = observer(() => {
	const [bucketName, setBucketName] = useState('');
	const [fileName, setFileName] = useState('');

	const handleFileSelection = () => {
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
		};

		// Handle connection error
		socket.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		// Handle connection close event
		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};
	};

	return (
		<div className="step">
			<div className="block">
				<label>
					Bucket Name:
					<input
						type="text"
						value={bucketName}
						onChange={(e) => setBucketName(e.target.value)}
					/>
				</label>
			</div>
			<div className="block">
				<label>
					File Name:
					<input
						type="text"
						value={fileName}
						onChange={(e) => setFileName(e.target.value)}
					/>
				</label>
			</div>
			<button onClick={handleFileSelection}>Send Request</button>
		</div>
	);
});
