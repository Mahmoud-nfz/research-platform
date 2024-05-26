import {
	HomeIcon,
	ProjectIcon,
	DataIcon,
	ProfileIcon,
	SettingsOutlineIcon,
	LogoutIcon,
} from '@/assets';

interface Item {
	title: string;
	icon: JSX.Element;
	href: string;
}

export const ItemComponent = (item: Item) => (
	<li>
		<a
			href={item.href}
			className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-[#dcc69b] pr-6"
		>
			<span className="inline-flex justify-center items-center ml-4">
				{item.icon}
			</span>
			<span className="ml-2 text-sm tracking-wide truncate">{item.title}</span>
		</a>
	</li>
);

export const categories = ['Projects', 'Data', 'Models'];

export const OtherItems: Item[] = [
	{
		title: 'Profile',
		icon: <ProfileIcon />,
		href: '/profile',
	},
	{
		title: 'Paramètres',
		icon: <SettingsOutlineIcon />,
		href: '/settings',
	},
	{
		title: 'Se déconnecter',
		icon: <LogoutIcon />,
		href: '/logout',
	},
];

export const MenuItems: Item[] = [
	{
		title: 'Accueil',
		icon: <HomeIcon />,
		href: '/platform',
	},
	{
		title: 'Projets',
		icon: <ProjectIcon />,
		href: '/platform/projects',
	},
	{
		title: 'Données',
		icon: <DataIcon />,
		href: '/platform/data-collections',
	},
];

export const actions: { [key: string]: Item[] } = {
	Projects: [
		{
			title: 'Liste des projets',
			icon: <ProjectIcon />,
			href: '/platform/projects/',
		},
		{
			title: 'Nouveau projet',
			icon: <ProjectIcon />,
			href: '/platform/projects/new',
		},
	],
	Data: [
		{
			title: 'Repertoire de données',
			icon: <DataIcon />,
			href: '/platform/data/',
		},
		{
			title: 'Créer une collection de données',
			icon: <DataIcon />,
			href: '/platform/data/new',
		},
	],
};
