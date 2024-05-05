import Image from 'next/image';
import { FolderIcon } from '@/assets';
import { File } from '@/types/entities';

export const FolderCard = ({ folder }: { folder: File }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg w-42 h-32 m-3 flex flex-col">
			<div className="flex flex-row items-center">
				<FolderIcon className="h-6 w-6 m-2" />
				<div className="text-lg font-semibold">{folder.name}</div>
			</div>

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
