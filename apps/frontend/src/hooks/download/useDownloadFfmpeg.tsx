import { useMutation } from '@tanstack/react-query';
import { ffmpegStore } from '../../actions/ffmpeg/ffmpegStore';

export default function useDownloadFfmpeg() {
	return useMutation({
		mutationFn: async ({
			selectedObjects,
			bucketName,
		}: {
			selectedObjects: string[];
			bucketName: string;
		}) => {
			const websocketUrl =
				process.env.REACT_APP_DOWNLOAD_WEBSOCKET_URL ||
				'ws://localhost:1206/download';

			selectedObjects.forEach((fileName) => {
				const socket = new WebSocket(websocketUrl);
				socket.onopen = () => {
					socket.send(JSON.stringify({ bucketName, fileName }));
				};

				socket.onmessage = async (event) => {
					const fileData = event.data;
					console.log('Received file data:', fileData);
					const blob = new Blob([fileData]);
					const url = URL.createObjectURL(blob);

					const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
					ffmpegStore.loadVideo(file);
				};

				socket.onerror = (error) => {
					throw new Error('WebSocket error', { cause: error });
				};
			});
		},
	});
}
