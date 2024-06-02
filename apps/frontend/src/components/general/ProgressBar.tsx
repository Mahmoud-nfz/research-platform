'use client';

import clsxm from '@/utils/clsxm';

export const ProgressBar = ({
	progress,
	className,
}: {
	progress: number;
	className: string;
}) => {
	return (
		<div
			className={clsxm('rounded-xl shadow-sm overflow-hidden p-1', className)}
		>
			<div className="relative h-2 flex border-2 border-solid rounded items-center justify-center">
				<div
					style={{ width: `${progress}%` }}
					className="absolute top-0 bottom-0 left-0 rounded-lg w-[100%] bg-primary-200"
				/>
				<div className="relative text-primary-900 font-medium text-xs">
					{progress.toFixed(2)}%
				</div>
			</div>
		</div>
	);
};
