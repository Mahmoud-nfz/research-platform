'use client';

import { downloadFile } from '@/actions/files/downloadFile';
import { endpoints } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function useDownloadFile() {
	return useMutation({
		mutationFn: async (data: {
			path: string;
			name: string;
			dataCollectionId: string;
		}) => {
			const fileHandle = await window.showSaveFilePicker({
				suggestedName: data.name,
			});
			const writableStream = await fileHandle.createWritable();

			const {
				data: { jwt, url: base },
			} = await downloadFile(data);

			const url = new URL(endpoints.download, base).href;
			const socket = new WebSocket(url);

			return new Promise<void>((res, rej) => {
				socket.onopen = () => {
					socket.send(JSON.stringify({ token: jwt }));
					toast('Starting download ...');
				};

				socket.onmessage = async (event) => {
					const chunk = event.data;
					await writableStream.write(chunk);
				};

				socket.onerror = async (error) => {
					await writableStream.close();
					socket.close();
					rej(new Error('WebSocket error', { cause: error }));
				};

				socket.onclose = async (event) => {
					await writableStream.close();
					console.log('Connection closed: ', event.reason);
					toast('Download finished. You can now check out your file.');
					res();
				};
			});
		},
	});
}
