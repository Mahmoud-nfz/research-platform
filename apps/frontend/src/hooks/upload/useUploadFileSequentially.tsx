'use client';

import { createFile } from '@/actions/files/createFile';
import { DEFAULT_CHUNK_SIZE, endpoints } from '@/constants';
import { UploadSchema } from '@/types/schemas';
import { hash } from '@/utils/hash';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

function encodeToBase64(buffer: ArrayBuffer) {
	const bytes = new Uint8Array(buffer);
	const binary = Array(bytes.byteLength)
		.fill(0)
		.map((_, i) => String.fromCharCode(bytes[i]));
	return btoa(binary.join(''));
}

function encodeMessage(chunkIndex: number, chunkData: ArrayBuffer) {
	return JSON.stringify({
		index: chunkIndex,
		data: encodeToBase64(chunkData),
	});
}

export default function useUploadFileSequentially() {
	const [uploadProgress, setUploadProgress] = useState(0);
	const abortController = useMemo(() => new AbortController(), []);

	console.log('abort controller', abortController.signal.aborted);

	return {
		progress: uploadProgress,
		cancel: () => {
			console.log('aborting ...');
			abortController.abort();
		},
		...useMutation({
			mutationFn: async (data: UploadSchema & { dataCollectionId: string }) => {
				setUploadProgress(0);

				const file = data.files!.item(0)!;
				const fileHash = await hash(await file.arrayBuffer());
				const {
					data: { jwt, url: base },
				} = await createFile({
					path: data.path,
					hash: fileHash,
					name: data.name,
					size: file.size,
					dataCollectionId: data.dataCollectionId,
				});

				const url = new URL(endpoints.minioWrapper.upload(), base).href;
				const socket = new WebSocket(url);
				let chunkSize = DEFAULT_CHUNK_SIZE;

				const p = new Promise<void>((res, rej) => {
					const sendMissingChunks = async (
						missingChunks: number[],
						numChunks: number
					) =>
						Promise.all(
							missingChunks.map(
								(chunkIndex) =>
									new Promise<void>((res, rej) => {
										console.log(`Sending chunk ${chunkIndex} ...`);

										const offset = chunkIndex * chunkSize;
										const reader = new FileReader();

										reader.onload = (event) => {
											const chunkData = event.target?.result;
											if (chunkData instanceof ArrayBuffer) {
												const message = encodeMessage(chunkIndex, chunkData);
												socket.send(message);
												console.log(`Sent chunk ${chunkIndex}`);
												setUploadProgress(
													(progress) => progress + 100 / numChunks
												);
												res();
											} else {
												rej(
													new Error(
														'An error occurred while uploading the file',
														{
															cause: 'Unexpected result type',
														}
													)
												);
											}
										};

										reader.onabort = () => {
											console.log('aborted', chunkIndex);
											res();
										};

										const chunk = file.slice(offset, offset + chunkSize);
										reader.readAsArrayBuffer(chunk);

										abortController.signal.addEventListener('abort', () =>
											reader.abort()
										);
									})
							)
						);

					socket.onopen = () => {
						socket.send(JSON.stringify({ token: jwt }));
					};

					socket.onmessage = async (message) => {
						const data = JSON.parse(message.data);
						console.log(message, data);
						chunkSize = data.chunkSize;
						try {
							setUploadProgress(
								(data.numChunks - data.missingChunks.length) *
									(100 / data.numChunks)
							);
							await sendMissingChunks(data.missingChunks, data.numChunks);
							socket.close();
							console.log('finished');
							res();
							console.log('finished 2');
						} catch (err) {
							console.log('err', err);
							socket.close();
							rej(err);
						}
					};

					socket.onerror = (error) => {
						socket.close();
						rej(new Error('WebSocket error', { cause: error }));
					};

					socket.onclose = (event) => {
						rej(new Error('Connection closed', { cause: event.reason }));
					};
				});

				console.log('p', p);

				return p;
			},
			onError: (error: Error) => {
				console.log(error);
			},
		}),
	};
}
