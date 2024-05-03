import * as React from 'react';
import type { SVGProps } from 'react';
const SvgProfileicon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		width={20}
		height={20}
		{...props}
	>
		<path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
	</svg>
);
export default SvgProfileicon;
