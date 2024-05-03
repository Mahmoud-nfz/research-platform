import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Se connecter',
	description: 'Connectez vouz à la plateforme de recherche',
};

export default function ProjectsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
