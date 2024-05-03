import { endpoints } from '@/constants';
import { fetcher } from '@/utils/fetcher';
import { Project } from '@/types/entities';
import { ProjectsList } from '@/components/projects/ProjectsList';

async function getProjects() {
	return fetcher<Project[]>(endpoints.projects, {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];
const dummyProject = {
	id: 'some-id',
	description: 'this is a description. A very long description',
	name: 'Some Project',
	ownerId: '1bd4269b-f255-4e34-8da1-f8cc3f47422c',
	tags: ['tun'],
	imageUrl: 'https://buffer.com/library/content/images/2023/10/free-images.jpg',
} as Project;

export default async function Projects() {
	const { data: projects } = await getProjects();

	return (
		<ProjectsList filters={filters} projects={[...projects, dummyProject]} />
	);
}
