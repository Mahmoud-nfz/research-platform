import { DataCollection } from '@/components/data-collections/DataCollectionCard';
import {
	EntityTypes,
	InformationSidebar,
} from '@/components/general/InformationSideBar';

export default function DataCollectionLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-full">
			{children}
			<InformationSidebar
				entity={dataCollection}
				entityType={EntityTypes.dataCollection}
			/>
		</div>
	);
}

const dataCollection: DataCollection = {
	id: 156456,
	name: 'Collection 1',
	description:
		'Ce sont des donnees de tracking des chevaux de course. Les donnees sont collectees par des capteurs sur les chevaux et sont stockees dans une base de donnees. Les donnees sont ensuite analysees pour determiner les performances des chevaux et les facteurs qui influencent ces performances.',
	image: '/welcome-image.png',
	tags: ['tag1', 'tag2'],
	usersImages: ['/jeff.jpg', '/jeff.jpg', '/jeff.jpg'],
	ownerImage: '/jeff.jpg',
	size: '5.17 GB',
	numFolders: 1,
};
