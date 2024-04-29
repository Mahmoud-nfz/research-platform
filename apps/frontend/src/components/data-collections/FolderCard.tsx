import Image from "next/image";
import { FolderIcon } from "@/assets";

export const FolderCard = ({ folder }: { folder: Folder }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg w-42 h-32 m-3 flex flex-col">
			<div className="flex flex-row">
				<FolderIcon className="h-6 w-6 m-2" />
				<div className="text-lg font-semibold flex justify-center items-center">
					{folder.name}
				</div>
			</div>

			<div className="w-full px-3 pt-2">
				<Image
					src={folder.image}
					height={100}
					width={100}
					className="w-full rounded-lg object-cover"
					alt={folder.name}
				/>
			</div>
		</div>
	);
};

export interface Folder {
	id: number;
	name: string;
	image: string;
	size: string;
	numFiles: number;
}
