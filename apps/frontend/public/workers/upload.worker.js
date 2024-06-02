function encodeToBase64(buffer) {
	const bytes = new Uint8Array(buffer);
	const binary = Array(bytes.byteLength)
		.fill(0)
		.map((_, i) => String.fromCharCode(bytes[i]));
	return btoa(binary.join(''));
}

function encodeMessage(chunkIndex, chunkData) {
	return JSON.stringify({
		index: chunkIndex,
		data: encodeToBase64(chunkData),
	});
}

self.onmessage = function (event) {
	const { file, chunkIndex, chunkSize, url, jwt } = event.data;
	const offset = chunkIndex * chunkSize;
	const reader = new FileReader();

	reader.onload = (event) => {
		const chunkData = event.target?.result;
		if (chunkData instanceof ArrayBuffer) {
			const message = encodeMessage(chunkIndex, chunkData);
			const socket = new WebSocket(url);

			console.log(`Sending chunk index ${chunkIndex} ...`);

			socket.onopen = () => {
				socket.send(JSON.stringify({ token: jwt }));
				socket.send(message);
				socket.close();
				self.postMessage({ chunkIndex, success: true });
			};

			socket.onerror = (error) => {
				self.postMessage({ chunkIndex, success: false, error });
			};

			socket.onclose = () => {
				console.log(`closing socket on worker with chunk index ${chunkIndex}`);
			};
		} else {
			self.postMessage({
				chunkIndex,
				success: false,
				error: 'Unexpected result type',
			});
		}
	};

	const chunk = file.slice(offset, offset + chunkSize);
	reader.readAsArrayBuffer(chunk);
};
