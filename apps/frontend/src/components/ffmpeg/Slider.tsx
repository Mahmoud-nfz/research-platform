import React, { useRef } from 'react';
import { IPointerDragData, usePointerDrag } from 'react-use-pointer-drag';
import { clamp } from '../../utils/helpers';

interface SliderProps {
	min: number;
	max: number;
	value: number;
	onChange?(value: number): void;
}

export const Slider: React.FC<SliderProps> = ({
	min,
	max,
	value,
	onChange,
}) => {
	const trackRef = useRef<HTMLDivElement>(null);

	const handleEvent = ({ x }: IPointerDragData<unknown>) => {
		const rect = trackRef.current!.getBoundingClientRect();
		const newValue = clamp(
			((x - rect.left) / rect.width) * (max - min) + min,
			min,
			max
		);
		onChange?.(newValue);
	};

	const { dragProps } = usePointerDrag({
		preventDefault: true,
		stopPropagation: true,
		onClick: handleEvent,
		onMove: handleEvent,
	});

	return (
		<div>
			<div
				ref={trackRef}
				{...dragProps()}
				className="relative h-8 bg-orange-200 rounded overflow-hidden"
			>
				<div
					style={{
						left: `${((value - min) / (max - min)) * 100}%`,
					}}
					className="absolute top-0 h-full w-1 bg-black"
				></div>
			</div>
		</div>
	);
};
