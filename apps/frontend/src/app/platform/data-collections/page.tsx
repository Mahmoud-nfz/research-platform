import React from "react";
import { DataCollectionsList } from "@/components/data-collections/DataCollectionsList";
import { DataCollection, Project } from "@/types/entities";
import { fetcher } from "@/utils/fetcher";
import { endpoints } from "@/constants";

async function getDataCollections() {
  return fetcher<DataCollection[]>(endpoints.allDataCollections, {
    method: "GET",
  });
}

async function getProjectsWithCreatePermission() {
  return fetcher<Project[]>(endpoints.projectsWithCreatePermission, {
    method: "GET",
  });
}

const filters = ["Option 1", "Option 2", "Option 3"];

const dummyDataCollection = {
  id: "1",
  name: "Collection 1",
  description:
    "Ce sont des donnees de tracking des chevaux de course. Les donnees sont collectees par des capteurs sur les chevaux et sont stockees dans une base de donnees. Les donnees sont ensuite analysees pour determiner les performances des chevaux et les facteurs qui influencent ces performances.",
  imageUrl: "/welcome-image.png",
  tags: ["tag1", "tag2"],
} as DataCollection;

export default async function DataCollections() {
  const [{ data: dataCollections }, { data: projects }] = await Promise.all([
    getDataCollections(),
    getProjectsWithCreatePermission(),
  ]);

  return (
    <DataCollectionsList
      dataCollections={[...dataCollections, dummyDataCollection]}
      filters={filters}
      projectsWithCreatePermission={[...projects]}
    />
  );
}
