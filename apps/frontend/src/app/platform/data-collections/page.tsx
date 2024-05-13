import React from 'react';
import { DataCollectionsList } from '@/components/data-collections/DataCollectionsList';
import { DataCollection, Project } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';
import { endpoints } from '@/constants';

export const dynamic = 'force-dynamic';

async function getDataCollections() {
	return fetcher<DataCollection[]>(endpoints.allDataCollections, {
		method: 'GET',
	});
}

async function getProjectsWithCreatePermission() {
	return fetcher<Project[]>(endpoints.projectsWithCreatePermission, {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];

export default async function DataCollections() {
	const [{ data: dataCollections }, { data: projects }] = await Promise.all([
		getDataCollections(),
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
