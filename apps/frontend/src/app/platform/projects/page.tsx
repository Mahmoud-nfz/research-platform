import { endpoints } from '@/constants';
import { fetcher } from '@/utils/fetcher';
import { Project } from '@/types/entities';
import { ProjectsList } from '@/components/projects/ProjectsList';

export const dynamic = 'force-dynamic';

async function getProjects() {
	return fetcher<Project[]>(endpoints.projects, {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];

export default async function Projects() {
	const { data: projects } = await getProjects();

	return <ProjectsList filters={filters} projects={[...projects]} />;
}
