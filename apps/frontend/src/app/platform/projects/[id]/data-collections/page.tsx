"use client";

import React, { useState } from "react";
import { ChevronLeftDouble, DownChevronIcon, FilterIcon } from "@/assets";
import { DataCollection, DataCollectionCard } from "@/components/data-collections/DataCollectionCard";

const filters = ["Option 1", "Option 2", "Option 3"];

const dataCollection: DataCollection = {
	id: 1,
	name: "Collection 1",
	description: "Ce sont des donnees de tracking des chevaux de course. Les donnees sont collectees par des capteurs sur les chevaux et sont stockees dans une base de donnees. Les donnees sont ensuite analysees pour determiner les performances des chevaux et les facteurs qui influencent ces performances.",
	image: "/welcome-image.png",
	tags: ["tag1", "tag2"],
	usersImages: ["/jeff.jpg", "/jeff.jpg", "/jeff.jpg"],
	ownerImage: "/jeff.jpg",
	size: "5.17 GB",
	numFolders: 1,
};
const dataCollections: DataCollection[] = [dataCollection, dataCollection, dataCollection, dataCollection];

export default function DataCollections(): JSX.Element {
	const [isDropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown visibility

	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen); // Toggle function for the dropdown

	return (
		<div className="flex flex-col p-5">
			<h5 className="text-sm font-light">
				<ChevronLeftDouble className="h-5 w-5 inline mr-1" />
				Retourner au projet
			</h5>
			<div className="flex flex-row px-4 py-2 justify-between">
				<div className="text-3xl font-bold flex justify-center items-center">
					Collections de données:
				</div>
				<div className="flex flex-row">
					<button className="bg-primary-500 m-2 p-2 rounded-md">
						Créer un projet
					</button>
					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="bg-white m-2 p-2 rounded-md flex flex-row"
						>
							<FilterIcon className="h-6 w-6 mr-3" />
							<span>Filtrer</span>
							<DownChevronIcon className="h-3 w-3 ml-3 my-auto" />
						</button>
						{isDropdownOpen && (
							<ul className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
								{filters.map((filter, idx) => (
									<li
										key={idx}
										className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
									>
										{filter}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
			<div className="px-10 w-full">
				<div className="w-full h-0.5 bg-primary-500"></div>
			</div>
			<div className="w-full flex flex-wrap">
				{dataCollections.map((dataCollection, idx) => (
					<DataCollectionCard key={idx} dataCollection={dataCollection} />
				))}
			</div>
		</div>
	);
}
