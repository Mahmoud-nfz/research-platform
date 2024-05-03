'use client';

import { getObjects } from '@/actions/objects/getObjects';
import React, { useState } from 'react';

const ListObjects: React.FC = () => {
	const [bucketName, setBucketName] = useState<string>('');
	const [objects, setObjects] = useState<string[]>([]);
	const [error, setError] = useState<string>('');

	const handleGetObjects = async () => {
		try {
			const { data: objects } = await getObjects(bucketName);

			setObjects(objects);
			setError('');
		} catch (error) {
			console.error('Error getting objects:', error);
		}
	};

	return (
		<div>
			<h2>List Objects</h2>
			<input
				type="text"
				value={bucketName}
				onChange={(e) => setBucketName(e.target.value)}
				placeholder="Enter Bucket Name"
			/>
			<button onClick={handleGetObjects}>Get Objects</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<h3>Objects in Bucket:</h3>
			<ul>
				{objects.map((object, index) => (
					<li key={index}>{object}</li>
				))}
			</ul>
		</div>
	);
};

export default ListObjects;
