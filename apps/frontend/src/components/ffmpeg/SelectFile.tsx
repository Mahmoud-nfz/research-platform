'use client';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import useDownloadFfmpeg from '../../hooks/download/useDownloadFfmpeg';

export const SelectFile: React.FC = observer(() => {
	const [bucketName, setBucketName] = useState('');
	const [fileName, setFileName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { mutate } = useDownloadFfmpeg();

	const handleFileSelection = async (): Promise<void> => {
		setIsLoading(true);
		await mutate({
			selectedObjects: [fileName],
			bucketName: bucketName,
		});
		setIsLoading(false);
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
