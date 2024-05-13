import {
	EntityTypes,
	InformationSidebar,
} from '@/components/general/InformationSideBar';

export default function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-full">
			{children}
			<InformationSidebar entity={project} entityType={EntityTypes.project} />
		</div>
	);
}

const project = {
	id: 156456,
	name: 'Project 1',
	description: "C'est un projet de recherche sur les chevaux de course.",
	image: '/welcome-image.png',
	tags: ['tag1', 'tag2'],
	usersImages: ['/jeff.jpg', '/jeff.jpg', '/jeff.jpg'],
	ownerImage: '/jeff.jpg',
	imageUrl: '/jeff.jpg',
	size: '5.17 GB',
	numFolders: 1,
};
