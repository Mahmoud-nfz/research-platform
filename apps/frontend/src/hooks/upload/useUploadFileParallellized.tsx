'use client';

import { createFile } from '@/actions/files/createFile';
import { DEFAULT_CHUNK_SIZE, MAX_WORKER_NUM, endpoints } from '@/constants';
import { UploadSchema } from '@/types/schemas';
import { hash } from '@/utils/hash';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export default function useUploadFileParallellized() {
	return useMutation({
		mutationFn: async ({
			data,
			setUploadProgress,
		}: {
			data: UploadSchema & { dataCollectionId: string };
			setUploadProgress: Dispatch<SetStateAction<number>>;
		}) => {
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
			let workers: Worker[] = [];

			const terminateWorkers = () => {
				workers.forEach((worker) => worker.terminate());
				workers = [];
			};

			const sendChunkToWorker = (worker: Worker, chunkIndex: number) => {
				console.log(`Begnning chunk index ${chunkIndex} upload`);
				worker.postMessage({
					file,
					chunkIndex,
					chunkSize,
					url,
					jwt,
				});
			};

			const sendMissingChunks = (missingChunks: number[]) => {
				workers = Array(MAX_WORKER_NUM)
					.fill(0)
					.map((_, workerIndex) => {
						const worker = new Worker('/workers/upload.worker.js');

						worker.onmessage = (
							event: MessageEvent<{
								chunkIndex: number;
								success: boolean;
								error?: Error;
							}>
						) => {
							const { chunkIndex, success, error } = event.data;
							if (success) {
								console.log(`Chunk ${chunkIndex} successfully uploaded`);
								setUploadProgress(
									(prevProgress) => prevProgress + 100 / missingChunks.length
								);
							} else {
								console.error(`Failed to upload chunk ${chunkIndex}:`, error);
							}

							const nextChunkIndex = missingChunks.shift();
							if (nextChunkIndex !== undefined) {
								sendChunkToWorker(worker, nextChunkIndex);
							} else {
								console.log(`Terminating worker ${workerIndex}`);
								worker.terminate();
							}
						};

						return worker;
					});

				console.log(missingChunks);
				workers.forEach((worker) => {
					const chunkIndex = missingChunks.shift();
					if (chunkIndex !== undefined) {
						sendChunkToWorker(worker, chunkIndex);
					} else {
						worker.terminate();
					}
				});
			};

			socket.onopen = () => {
				console.log('here');
				socket.send(JSON.stringify({ token: jwt }));
			};

			socket.onmessage = (message) => {
				const data = JSON.parse(message.data);
				console.log('mes', data.missingChunks);
				terminateWorkers();
				chunkSize = data.chunkSize;
				sendMissingChunks(data.missingChunks);
			};

			socket.onerror = (error) => {
				console.log('there', error);
				terminateWorkers();
				throw new Error('WebSocket error', { cause: error });
			};

			socket.onclose = (event) => {
				console.log('closed', event.reason);
			};
		},
		onError: (error: Error) => {
			console.log(error);
		},
	});
}
