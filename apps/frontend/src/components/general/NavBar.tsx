import Image from "next/image";
import { NotificationsIcon, SettingsIcon } from "@/assets/icons/icons";
import companyLogo from "~/company-logo-dark.png";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

const user = {
	img: "/jeff.jpg",
	name: "Jeffrey",
	role: "Researcher",
};

export const Navbar = () => {
	return (
		<div
			className="text-white p-4 flex justify-between items-center"
			style={{
				background:
					"linear-gradient(to right, #605f60 0%, #d9caaf 10%, #605f60 100%)",
			}}
		>
			<div className="flex items-center mx-5">
				<Image src={companyLogo} alt="Logo" className="w-32" />
			</div>
			<div className="flex items-center ml-5 mr-10 text-black font-semibold text-sm">
				<Link href={"/"}> Accueil </Link>
			</div>

			<SearchBar />

			<div className="flex items-center ml-5 space-x-4">
				<SettingsIcon className="h-6 w-6" />
				<NotificationsIcon className="h-6 w-6" />
				<Image
					src={user.img}
					alt="Profile"
					className="rounded-full"
					width={32}
					height={32}
				/>
				<div>
					<h1 className="text-sm font-semibold text-center">{user.name}</h1>
					<h1 className="text-xs text-center">{user.role}</h1>
				</div>
			</div>
		</div>
	);
};
