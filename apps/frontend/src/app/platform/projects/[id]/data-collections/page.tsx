import React from 'react';
import { DataCollectionsList } from '@/components/data-collections/DataCollectionsList';
import { DataCollection, Project } from '@/types/entities';
import { fetcher } from '@/utils/fetcher';
import { endpoints } from '@/constants';
import path from 'path';
import { PageProps } from '@/types/page-props';
import { notFound } from 'next/navigation';

async function getDataCollections(projectId: string) {
	const endpoint = path.join(endpoints.dataCollectionsPerProject, projectId);
	return fetcher<DataCollection[]>(endpoint, {
		method: 'GET',
	});
}

async function getProjectsWithCreatePermission() {
	return fetcher<Project[]>(endpoints.projectsWithCreatePermission, {
		method: 'GET',
	});
}

const filters = ['Option 1', 'Option 2', 'Option 3'];

const dataCollection = {
	id: '1',
	name: 'Collection 1',
	description:
		'Ce sont des donnees de tracking des chevaux de course. Les donnees sont collectees par des capteurs sur les chevaux et sont stockees dans une base de donnees. Les donnees sont ensuite analysees pour determiner les performances des chevaux et les facteurs qui influencent ces performances.',
	imageUrl: '/welcome-image.png',
	tags: ['tag1', 'tag2'],
} as DataCollection;

export default async function DataCollections({ params }: PageProps) {
	if (!params?.id) notFound();

	const [{ data: dataCollections }, { data: projects }] = await Promise.all([
		getDataCollections(params.id),
		getProjectsWithCreatePermission(),
	]);

	return (
		<DataCollectionsList
			dataCollections={[...dataCollections, dataCollection]}
			filters={filters}
			projectsWithCreatePermission={[...projects]}
		/>
	);
}
