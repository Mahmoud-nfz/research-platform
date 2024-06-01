import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './SelectFile.module.scss';
import { ffmpegStore } from '../../stores/ffmpegStore';

const file = ffmpegStore.file;
export const SelectFile: React.FC = observer(() => {
	if (!file) {
		return (
			<div className={styles.step}>
				<label>
					<input
						type="file"
						accept="video/*,.mkv,.mov,.mp4,.m4v,.mk3d,.wmv,.asf,.mxf,.ts,.m2ts,.3gp,.3g2,.flv,.webm,.ogv,.rmvb,.avi"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								ffmpegStore.loadVideo(file);
							}
							e.target.value = '';
						}}
					/>
					<span>Selectionner une vidéo</span>
				</label>
			</div>
		);
	}
});
