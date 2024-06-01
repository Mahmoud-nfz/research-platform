'use client';
import React from 'react';
import './index.scss';
import { SelectFile } from '../../components/ffmpeg/SelectFile';
import { Crop } from '../../components/ffmpeg/Crop';
import { Render } from '../../components/ffmpeg/Render';
import { SideBar } from '@/components/general/SideBar/SideBar';

const Ffmpeg = () => {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-grow  bg-[#ededed]">
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
