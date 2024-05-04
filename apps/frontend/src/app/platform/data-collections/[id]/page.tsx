import React from 'react';
import { ChevronLeftDouble, CloudUploadIcon } from '@/assets';
import { FolderCard } from '@/components/data-collections/FolderCard';
import UploadModal from '@/components/general/modals/UploadModal';
import { fetcher } from '@/utils/fetcher';
import { endpoints } from '@/constants';
import { PageProps } from '@/types/page-props';
import { notFound } from 'next/navigation';
import { getServerSideSearchParams } from '@/utils/getServerSideSearchParams';
import { File } from '@/types/entities';
import { FileCard } from '@/components/data-collections/FileCard';

async function getFiles(dataCollectionId: string, path?: string) {
	return fetcher<{ files: File[]; folders: File[] }>(
		endpoints.files.getDirectChildrenAt(dataCollectionId, { path }),
		{
			method: 'GET',
		}
	);
}

export default async function DataCollections({
	params,
	searchParams,
}: PageProps) {
	if (!params?.id) notFound();
	const dataCollectionId = params.id;
	const { path } = getServerSideSearchParams(searchParams, ['path']);
	const {
		data: { folders, files },
	} = await getFiles(dataCollectionId, path);

	return (
		<div className="flex flex-col p-5 flex-grow justify-between h-full">
			<div className="flex flex-col p-5 flex-grow">
				<h5 className="text-sm font-light">
					<ChevronLeftDouble className="h-5 w-5 inline mr-1" />
					Retourner a la collection de donnees
				</h5>
				<div className="px-10 w-full">{/* More existing content */}</div>
				<div className="w-full flex flex-wrap">
					{folders.map((folder, idx) => (
						<FolderCard key={idx} folder={folder} />
					))}
					{files.map((file, idx) => (
						<FileCard key={idx} folder={file} />
					))}
				</div>
			</div>
			<UploadModal />
		</div>
	);
}
