'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { SideBar } from '@/components/general/SideBar/SideBar';
const SelectFile = dynamic(
	() =>
		import('../../components/ffmpeg/SelectFile').then(
			(module) => module.SelectFile
		),
	{ ssr: false }
);
const Crop = dynamic(
	() => import('../../components/ffmpeg/Crop').then((module) => module.Crop),
	{ ssr: false }
);
const Render = dynamic(
	() =>
		import('../../components/ffmpeg/Render').then((module) => module.Render),
	{ ssr: false }
);

const Ffmpeg = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-grow bg-[#ededed]">
				<SideBar />
				<div>
					<SelectFile />
					<Crop />
					<Render />
				</div>
			</div>
		</div>
	);
};

export default Ffmpeg;
