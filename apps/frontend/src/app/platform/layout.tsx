import { Navbar } from "@/components/general/NavBar";
import { SideBar } from "@/components/general/SideBar/SideBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Se connecter",
	description: "Connectez vous à la plateforme de recherche",
};

export default function PlatformLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={inter.className + " flex flex-col h-screen"}>
			<Navbar />
			<div className="flex flex-grow overflow-hidden">
				<SideBar />
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
		</div>
	);
}
