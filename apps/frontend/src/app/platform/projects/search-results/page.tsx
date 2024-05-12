import { endpoints } from '@/constants';
import { fetcher } from '@/utils/fetcher';
import { Project } from '@/types/entities';
import { ProjectsList } from '@/components/projects/ProjectsList';
import { getServerSideSearchParams } from '@/utils/getServerSideSearchParams';
import { PageProps } from '@/types/page-props';

async function getProjects(data: { query: string }) {
	return fetcher<Project[]>(endpoints.searchProjects(data), {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];

export default async function Projects({ searchParams }: PageProps) {
	const { query } = getServerSideSearchParams(searchParams, ['query']);
	const { data: projects } = await getProjects({ query: query ?? '' });

	return <ProjectsList filters={filters} projects={[...projects]} />;
}
