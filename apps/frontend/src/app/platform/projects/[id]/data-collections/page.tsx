import React from 'react';
import { DataCollectionsList } from '@/components/data-collections/DataCollectionsList';
import { DataCollection, Project } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';
import { endpoints } from '@/constants';
import { PageProps } from '@/types/page-props';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getDataCollections(projectId: string) {
	return fetcher<DataCollection[]>(
		endpoints.dataCollections.getAllPerProject(projectId),
		{
			method: 'GET',
		}
	);
}

async function getProjectsWithCreatePermission() {
	return fetcher<Project[]>(endpoints.projects.getAllWithCreatePermission(), {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];

export default async function DataCollections({ params }: PageProps) {
	if (!params?.id) notFound();

	const [{ data: dataCollections }, { data: projects }] = await Promise.all([
		getDataCollections(params.id),
		getProjectsWithCreatePermission(),
	]);

	return (
		<DataCollectionsList
			dataCollections={[...dataCollections]}
			filters={filters}
			projectsWithCreatePermission={[...projects]}
		/>
	);
}
