import React from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';
import {
	BsCheck,
	BsVolumeMute,
	BsSymmetryVertical,
	BsSymmetryHorizontal,
	BsVolumeUp,
	BsArrowCounterclockwise,
} from 'react-icons/bs';

import styles from './Crop.module.scss';
import { ffmpegStore } from '../../stores/ffmpegStore';
import { VideoCrop } from './VideoCrop';
import { VideoTrim } from './VideoTrim';

export const Crop: React.FC = observer(() => {
	const video = ffmpegStore.video;
	if (!video) {
		return <div></div>;
	}

	return (
		<div className={styles.step}>
			<div className={styles.controls}>
				<div>
					<button
						title={ffmpegStore.transform.mute ? 'Unmute' : 'Mute'}
						onClick={() => {
							runInAction(() => {
								const mute = !ffmpegStore.transform.mute;
								ffmpegStore.transform = {
									...ffmpegStore.transform,
									mute,
								};
								video.muted = mute;
							});
						}}
					>
						{ffmpegStore.transform.mute ? <BsVolumeMute /> : <BsVolumeUp />}
					</button>
					<button
						title="Flip horizontally"
						onClick={() => {
							runInAction(() => {
								const { flipH, area } = ffmpegStore.transform;
								ffmpegStore.transform = {
									...ffmpegStore.transform,
									flipH: !flipH,
									area: area
										? [
												video.videoWidth - area[2] - area[0],
												area[1],
												area[2],
												area[3],
											]
										: undefined,
								};
							});
						}}
					>
						<BsSymmetryVertical />
					</button>
					<button
						title="Flip vertically"
						onClick={() => {
							runInAction(() => {
								const { flipV, area } = ffmpegStore.transform;
								ffmpegStore.transform = {
									...ffmpegStore.transform,
									flipV: !flipV,
									area: area
										? [
												area[0],
												video.videoHeight - area[3] - area[1],
												area[2],
												area[3],
											]
										: undefined,
								};
							});
						}}
					>
						<BsSymmetryHorizontal />
					</button>
				</div>
				<div>
					<button
						onClick={() => {
							ffmpegStore.reset();
						}}
						title="Reset"
					>
						<BsArrowCounterclockwise />
					</button>
					<button
						onClick={() => {
							runInAction(() => {
								video.pause();
								ffmpegStore.step = 2;
							});
						}}
						title="Confirm"
					>
						<BsCheck />
					</button>
				</div>
			</div>
			<VideoTrim
				time={ffmpegStore.transform.time}
				video={video}
				onChange={(time) => {
					runInAction(() => {
						ffmpegStore.transform = {
							...ffmpegStore.transform,
							time,
						};
					});
				}}
			/>
			<VideoCrop
				transform={ffmpegStore.transform}
				video={video}
				onChange={(area) =>
					runInAction(() => {
						ffmpegStore.transform = {
							...ffmpegStore.transform,
							area,
						};
					})
				}
			/>
		</div>
	);
});
