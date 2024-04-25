import Image from "next/image";
import { NotificationsIcon, SettingsIcon } from "@/assets";
import companyLogo from "~/company-logo-dark.png";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Popover } from "@headlessui/react";
import { Signout } from "./SideBar/Signout";

const testUser = {
  imageUrl: "/jeff.jpg",
  firstName: "Jeffrey",
  job: "Researcher",
};

export const Navbar = async () => {
  const session = await getServerSession(options);
  const user: typeof testUser = { ...testUser, ...session?.user };

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

      <Signout user={user} />
    </div>
  );
};
