import React from "react";
import { ChevronLeftDouble, CloudUploadIcon } from "@/assets";
import { Folder, FolderCard } from "@/components/data-collections/FolderCard";
import UploadModal from "@/components/general/modals/UploadModal";

const folder: Folder = {
  id: 1,
  name: "Folder 1",
  image: "/welcome-image.png",
  size: "5.17 GB",
  numFiles: 1,
};
const folders: Folder[] = [folder, folder, folder, folder];

export default function DataCollections(): JSX.Element {
  return (
    <div className="flex flex-col p-5 flex-grow justify-between h-full">
      <div className="flex flex-col p-5 flex-grow">
        <h5 className="text-sm font-light">
          <ChevronLeftDouble className="h-5 w-5 inline mr-1" />
          Retourner a la collection de donnees
        </h5>
        <div className="px-10 w-full">{/* More existing content */}</div>
        <div className="w-full flex flex-wrap">
          {folders.map((folder, idx) => (
            <FolderCard key={idx} folder={folder} />
          ))}
        </div>
      </div>
      <UploadModal />
    </div>
  );
}
