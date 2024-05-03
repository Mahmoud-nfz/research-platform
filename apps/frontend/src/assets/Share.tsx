import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		{...props}
	>
		<path
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M14 7h2a5 5 0 0 1 0 10h-2M10 7H8a5 5 0 0 0 0 10h2m-2-5h8"
		/>
	</svg>
);
export default SvgShare;
