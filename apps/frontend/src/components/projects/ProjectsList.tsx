"use client";

import { DownChevronIcon, FilterIcon } from "@/assets";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/types/entities";
import { CreateProjectModal } from "./CreateProjectModal";

export const ProjectsList = ({
  projects,
  filters,
}: {
  projects: Project[];
  filters: string[];
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row p-5 justify-between">
        <div className="text-3xl font-bold flex justify-center items-center">
          Liste de projets:
        </div>
        <div className="flex flex-row">
          <CreateProjectModal />
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
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};
