import { HomeIcon, ProjectIcon, DataIcon } from "@/assets";

export const categories = ["Projects", "Data", "Models"];

export const MenuItems = [
  {
    title: "Accueil",
    icon: <HomeIcon />,
    href: "/platform",
  },
  {
    title: "Projets",
    icon: <ProjectIcon />,
    href: "/platform/projects",
  },
  {
    title: "Données",
    icon: <DataIcon />,
    href: "/platform/data",
  },
];

export const actions = {
  Projects: [
    {
      title: "Liste des projets",
      icon: <ProjectIcon />,
      href: "/platform/projects/",
    },
    {
      title: "Nouveau projet",
      icon: <ProjectIcon />,
      href: "/platform/projects/new",
    },
  ],
};
