'use client';

import { endpoints } from '@/constants';
import { useMutation } from '@tanstack/react-query';

export default function useDownloadFile() {
	return useMutation({
		mutationFn: async ({
			selectedObjects,
			bucketName,
		}: {
			selectedObjects: string[];
			bucketName: string;
		}) => {
			const url = new URL(
				endpoints.download,
				process.env.NEXT_PUBLIC_MINIO_WRAPPER_WEBSOCKET_URL
			);

			selectedObjects.forEach((fileName) => {
				const socket = new WebSocket(url);
				socket.onopen = () => {
					socket.send(JSON.stringify({ bucketName, fileName }));
				};

				socket.onmessage = (event) => {
					const message = event.data;
					if (message instanceof Blob) {
						const fileUrl = URL.createObjectURL(message);
						const a = document.createElement('a');
						a.href = fileUrl;
						a.download = fileName;
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
					}
				};

				socket.onerror = (error) => {
					throw new Error('WebSocket error', { cause: error });
				};
			});
		},
	});
}
