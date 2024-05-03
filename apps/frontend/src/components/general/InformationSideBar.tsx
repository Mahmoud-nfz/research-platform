import { EditIcon, ShareIcon } from '@/assets';
import React from 'react';
import { UsersSmallIcons } from '../users/UsersSmallIcons';

export enum EntityTypes {
	project = 'projet',
	dataCollection = 'collection de données',
}

export const InformationSidebar = ({
	entity,
	entityType,
}: {
	entity: Entity;
	entityType: EntityTypes;
}) => {
	return (
		<div className="sidebar w-64 h-full py-4">
			<div className="h-full bg-white rounded-l-2xl p-3 overflow-y-auto">
				<div className="flex flex-row justify-between mb-3">
					<div className="text-sm font-light">ID: {entity.id}</div>
					<div className="flex flex-row justify-between">
						<button className="bg-primary-300 mx-1 rounded-md p-1">
							<EditIcon className="h-3 w-3" />
						</button>
						<button className="bg-primary-300 mx-1 rounded-md p-1">
							<ShareIcon className="h-3 w-3" />
						</button>
					</div>
				</div>
				<div className="relative h-36">
					{/* Background div */}
					<div
						className="rounded-lg m-1 absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: `url(${entity.image})`,
							opacity: 0.5,
						}}
					></div>

					{/* Title div */}
					<div className="relative p-3 opacity-100 mx-auto text-center items-center justify-center text-black text-md font-bold">
						<div>{entity.name}</div>
					</div>
				</div>
				<h3 className="p-3 text-lg font-bold">
					Description{' '}
					{entityType == EntityTypes.dataCollection ? 'de la' : 'du'}{' '}
					{entityType} :
				</h3>
				<p className="text-sm px-2">{entity.description}</p>
				<div className="flex flex-row justify-between mt-2">
					<h3 className="px-3 text-lg font-bold">Tags:</h3>

					<div className="flex flex-row justify-end">
						{entity.tags.slice(0, 3).map((tag, idx) => (
							<div
								key={idx}
								className="bg-gray-200 rounded-lg p-1 font-semibold text-sm m-1"
							>
								{tag}
							</div>
						))}
					</div>
				</div>

				<h3 className="px-3 mt-1 text-sm font-semibold">
					Personnes ayant l'accès:
				</h3>
				<div className="flex flex-row px-5 py-1">
					<UsersSmallIcons usersImages={entity.usersImages} />
				</div>
				<h3 className="px-3 mt-1 text-sm font-semibold">Propriétaire:</h3>
				<div className="flex flex-row px-5 py-1">
					<UsersSmallIcons usersImages={[entity.ownerImage]} />
				</div>
			</div>
		</div>
	);
};

interface Entity {
	id: any;
	image: string;
	name: string;
	description: string;
	tags: string[];
	usersImages: string[];
	ownerImage: string;
}
