import { WarningIcon } from '@/assets';
import React from 'react';

export const EmptyComponent = ({ message }: { message: string }) => {
	return (
		<section className="flex mt-24 items-center justify-center p-5 w-full">
			<div className="text-center">
				<div className="inline-flex rounded-full bg-yellow-100 p-4">
					<div className="rounded-full stroke-primary-600 bg-yellow-200 p-4">
						<WarningIcon height={64} width={64} />
					</div>
				</div>
				<h1 className="mt-5 text-4xl font-semibold lg:text-5xl">{message} </h1>
			</div>
		</section>
	);
};
