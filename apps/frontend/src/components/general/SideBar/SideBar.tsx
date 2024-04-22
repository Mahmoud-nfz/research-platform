import React from "react";
import { ItemComponent, MenuItems, OtherItems } from "./Items";

export const SideBar = () => {
	return (
		<aside className="w-64 p-5">
			<div className="bg-[#fffdfd] overflow-auto h-full rounded-xl">
				<div className="overflow-y-auto overflow-x-hidden flex-grow">
					<ul className="flex flex-col py-4 space-y-1">

						<li className="px-5">
							<div className="flex flex-row items-center h-8">
								<div className="text-sm font-light tracking-wide text-gray-500">
									Menu
								</div>
							</div>
						</li>
						{MenuItems.map((item, index) => (
							<ItemComponent key={index} {...item} />
						))}

						<li className="px-5">
							<div className="flex flex-row items-center h-8">
								<div className="text-sm font-light tracking-wide text-gray-500">
									Actions
								</div>
							</div>
						</li>
						{MenuItems.map((item, index) => (
							<ItemComponent key={index} {...item} />
						))}

						<li className="px-5">
							<div className="flex flex-row items-center h-8">
								<div className="text-sm font-light tracking-wide text-gray-500">
									Paramètres
								</div>
							</div>
						</li>
						{OtherItems.map((item, index) => (
							<ItemComponent key={index} {...item} />
						))}
						
					</ul>
				</div>
			</div>
		</aside>
	);
};
