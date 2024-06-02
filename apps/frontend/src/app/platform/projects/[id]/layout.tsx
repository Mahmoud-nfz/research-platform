import {
	EntityTypes,
	InformationSidebar,
} from '@/components/general/InformationSideBar';
import { endpoints } from '@/constants';
import { Project } from '@/types/entities';
import { PageProps } from '@/types/page-props';
import { fetcher } from '@/utils/fetcher';
import { notFound } from 'next/navigation';

async function getProjectInfo(projectId: string) {
	return fetcher<Project>(endpoints.getProject(projectId), {
		method: 'GET',
	});
}

export default async function ProjectLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
}> & { params: { id: string } }) {
	if (!params?.id) notFound();

	const { data: project } = await getProjectInfo(params.id);

	return (
		<div className="flex h-full">
			{children}
			<InformationSidebar
				entity={{ ...dummyProject, ...project }}
				entityType={EntityTypes.project}
			/>
		</div>
	);
}

const dummyProject = {
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
