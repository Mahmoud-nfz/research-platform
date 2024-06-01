'use client';
import React from 'react';
import './index.scss';
import { SelectFile } from '../../components/ffmpeg/SelectFile';
import { ffmpegStore } from '../../stores/ffmpegStore';
import { Crop } from '../../components/ffmpeg/Crop';
import { Render } from '../../components/ffmpeg/Render';

const Ffmpeg = () => {
	const step = ffmpegStore.step;

	return (
		<div className="app">
			<br></br>
			<SelectFile />
			<br></br>
			<Crop />
			<br></br>
			<Render />
		</div>
	);
};

export default Ffmpeg;
