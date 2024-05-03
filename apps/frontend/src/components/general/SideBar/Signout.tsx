'use client';

import { NotificationsIcon, SettingsIcon } from '@/assets';
import useLogout from '@/hooks/auth/useLogout';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';

export const Signout = ({
	user,
}: {
	user: {
		imageUrl: string;
		firstName: string;
		job: string;
	};
}) => {
	const { mutate: signout } = useLogout();
	return (
		<div className="flex items-center ml-5 space-x-4">
			<SettingsIcon className="h-6 w-6" />
			<NotificationsIcon className="h-6 w-6" />
			<Popover className="relative">
				<Popover.Button className="outline-none">
					<Image
						src={user.imageUrl}
						alt="profile"
						className="rounded-full border-2 aspect-square object-cover border-white border-solid"
						width={32}
						height={32}
					/>
				</Popover.Button>
				<Transition
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<Popover.Panel className="fixed top-12 right-28 bg-white text-black shadow p-1 rounded-2xl">
						<button onClick={() => signout(undefined)} className="p-1">
							Se déconnecter
						</button>
					</Popover.Panel>
				</Transition>
			</Popover>
			<div>
				<h1 className="text-sm font-semibold capitalize text-center">
					{user.firstName}
				</h1>
				<h1 className="text-xs text-center capitalize">{user.job}</h1>
			</div>
		</div>
	);
};
