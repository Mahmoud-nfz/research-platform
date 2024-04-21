"use client";

import React, { useState } from "react";
import { DownChevron, SearchIcon } from "@/assets/icons/icons";

const searchCategories = ["Projects", "Data", "Models"];

export const SearchBar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const uniformHeightStyle = {
		height: "40px",
		display: "flex",
		alignItems: "center",
	};

	return (
		<form className="flex-grow mx-auto flex">
			<div className="relative">
				<button
					id="dropdown-button"
					className="flex-shrink-0 z-10 inline-flex items-center py-0 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-l-md hover:bg-gray-200"
					type="button"
					onClick={toggleDropdown}
					style={uniformHeightStyle}
				>
					All categories
					<DownChevron />
				</button>
				<div
					id="dropdown"
					className={`absolute mt-1 z-10 ${isDropdownOpen ? "block" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
					style={{ left: 0 }}
				>
					<ul
						className="py-2 text-sm text-gray-700"
						aria-labelledby="dropdown-button"
					>
						{searchCategories.map((category) => (
							<li>
								<button
									type="button"
									className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
								>
									{category}
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="relative w-full">
				<input
					type="search"
					id="search-dropdown"
					className="block px-3 py-0 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
					placeholder="Search Projects, Data, Templates..."
					required
					style={uniformHeightStyle}
				/>
				<button
					type="submit"
					className="absolute top-0 right-0 pl-2 text-sm font-medium text-black bg-gray-200 rounded-r-md border hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
					style={{ ...uniformHeightStyle, width: "40px" }} // This sets the width of the search button
				>
					<SearchIcon />
					<span className="sr-only">Search</span>
				</button>
			</div>
		</form>
	);
};
