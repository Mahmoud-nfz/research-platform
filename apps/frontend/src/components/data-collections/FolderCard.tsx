'use client';

import Image from 'next/image';
import { FolderIcon } from '@/assets';
import { File } from '@/types/entities';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { advancePath } from '@/utils/advanceSegment';

export const FolderCard = ({ folder }: { folder: File }) => {
	const path = usePathname();
	const searchParams = useSearchParams();
	const url = new URL(path, window.location.origin);
	url.search = searchParams.toString();
	url.searchParams.set(
		'path',
		advancePath(searchParams.get('path') ?? '/', folder.path)
	);

	return (
		<Link
			href={url}
			className="bg-white shadow-lg rounded-lg w-42 h-32 m-3 flex flex-col"
		>
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
		</Link>
	);
};
