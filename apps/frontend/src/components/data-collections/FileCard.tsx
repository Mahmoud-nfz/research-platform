import Image from 'next/image';
import { File } from '@/types/entities';

export const FileCard = ({ folder }: { folder: File }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg w-42 h-32 m-3 flex flex-col">
			<div className="text-lg text-center font-semibold m-2">{folder.name}</div>

			<div className="w-full px-3 pt-2">
				<Image
					src="/welcome-image.png"
					height={100}
					width={100}
					className="w-full rounded-lg object-cover"
					alt={folder.name}
				/>
			</div>
		</div>
	);
};
