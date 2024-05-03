import * as React from 'react';
import type { SVGProps } from 'react';
const SvgWarningicon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 28 28"
		width="1em"
		height="1em"
		{...props}
	>
		<path
			d="M14 9.333V14m0 4.667h.012M25.667 14c0 6.443-5.224 11.667-11.667 11.667S2.334 20.443 2.334 14 7.557 2.333 14 2.333 25.667 7.557 25.667 14"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default SvgWarningicon;
