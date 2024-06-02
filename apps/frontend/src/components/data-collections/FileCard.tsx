'use client';

import Image from 'next/image';
import { File } from '@/types/entities';
import useDownloadFile from '@/hooks/download/useDownloadFile';

export const FileCard = ({ file }: { file: File }) => {
	const { mutate: downloadFile } = useDownloadFile();

	const handleDownload = () => {
		downloadFile(file);
	};

	return (
		<button
			onClick={handleDownload}
			className="bg-white shadow-lg rounded-lg w-42 h-32 m-3 flex flex-col"
		>
			<div className="text-lg text-center font-semibold m-2">{file.name}</div>

			<div className="w-full px-3 pt-2">
				<Image
					src="/welcome-image.png"
					height={100}
					width={100}
					className="w-full rounded-lg object-cover"
					alt={file.name}
				/>
			</div>
		</button>
	);
};
