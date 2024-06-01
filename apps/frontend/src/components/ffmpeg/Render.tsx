'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { BsDownload } from 'react-icons/bs';
import { runInAction } from 'mobx';

import styles from './Ffmpeg.module.scss';
import { ffmpegStore } from '../../actions/ffmpeg/ffmpegStore';
import { Slider } from './Slider';

export const Render: React.FC = observer(() => {
	const [outputUrl, setOutputUrl] = useState<string>();

	const { ffmpeg, video } = ffmpegStore;

	if (!ffmpeg.loaded) {
		return (
			<div className={styles.loading}>
				<span>Veuillez patienter</span>
				<progress value={ffmpeg.loadProgress} max={1} />
			</div>
		);
	}

	if (!video) {
		return <div></div>;
	}

	const { area, scale = 1 } = ffmpegStore.transform;
	const x = Math.trunc((scale * (area ? area[0] : 0)) / 2) * 2;
	const y = Math.trunc((scale * (area ? area[1] : 0)) / 2) * 2;
	const width =
		Math.trunc((scale * (area ? area[2] : video.videoWidth)) / 2) * 2;
	const height =
		Math.trunc((scale * (area ? area[3] : video.videoHeight)) / 2) * 2;

	const crop = async () => {
		setOutputUrl(undefined);

		const args: string[] = [];
		const filters: string[] = [];

		const { flipH, flipV, area, time, mute } = ffmpegStore.transform;

		if (flipH) {
			filters.push('hflip');
		}

		if (flipV) {
			filters.push('vflip');
		}

		if (scale !== 1) {
			filters.push(
				`scale=${Math.trunc((video.videoWidth * scale) / 2) * 2}:${
					Math.trunc((video.videoHeight * scale) / 2) * 2
				}`
			);
		}

		if (
			area &&
			(area[0] !== 0 || area[1] !== 0 || area[2] !== 1 || area[3] !== 1)
		) {
			filters.push(`crop=${width}:${height}:${x}:${y}`);
		}

		// Add filters
		if (filters.length > 0) {
			args.push('-vf', filters.join(', '));
		}

		if (time) {
			let start = 0;
			if (time[0] > 0) {
				start = time[0];
				args.push('-ss', `${start}`);
			}

			if (time[1] < video.duration) {
				args.push('-t', `${time[1] - start}`);
			}
		}

		args.push('-c:v', 'libx264');
		args.push('-preset', 'veryfast');

		if (mute) {
			args.push('-an');
		} else {
			args.push('-c:a', 'copy');
		}

		const newFile = await ffmpeg.exec(ffmpegStore.file!, args);
		setOutputUrl(URL.createObjectURL(newFile));
	};

	return (
		<div className={styles.step}>
			{ffmpeg.running ? (
				<>
					<div className={styles.actionsRender}>
						<button onClick={() => ffmpeg.cancel()}>
							<span>Cancel</span>
						</button>
					</div>
					<div className={styles.info}>
						<span>Running</span>
						<progress value={ffmpeg.execProgress} max={1} />
						<pre>{ffmpeg.output}</pre>
					</div>
				</>
			) : (
				<>
					<div className={styles.settings}>
						<div>
							Resolution: {width}px x {height}px
						</div>
						<div>
							Scale: {Math.round(scale * 100) / 100}
							<Slider
								min={0.1}
								max={1}
								value={scale}
								onChange={(value) => {
									runInAction(() => {
										ffmpegStore.transform.scale = value;
									});
								}}
							/>
						</div>
					</div>
					<div className={styles.actionsRender}>
						<button onClick={crop}>
							<span>Render MP4</span>
						</button>
						{outputUrl && (
							<a
								href={outputUrl}
								download="cropped.mp4"
								className={clsx('button', styles.download)}
							>
								<BsDownload />
								<span>Download</span>
							</a>
						)}
					</div>
				</>
			)}
			{outputUrl && !ffmpeg.running && (
				<div>
					<video src={outputUrl} controls />
				</div>
			)}
		</div>
	);
});
