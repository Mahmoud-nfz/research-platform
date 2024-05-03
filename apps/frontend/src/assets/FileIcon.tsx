import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFileicon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 15 20"
		{...props}
	>
		<path
			fill="#070707"
			d="M5.633 8.965a1.715 1.715 0 1 0 0-3.43 1.715 1.715 0 0 0 0 3.43"
		/>
		<path
			fill="#070707"
			d="M14.208 16.97a2.287 2.287 0 0 1-2.287 2.287H2.772A2.287 2.287 0 0 1 .485 16.97V3.248A2.287 2.287 0 0 1 2.772.96h6.29l5.146 5.146zM2.772 2.104A1.144 1.144 0 0 0 1.63 3.248v11.435l2.543-2.543a.57.57 0 0 1 .698-.086l2.476 1.486 2.467-3.454a.572.572 0 0 1 .87-.072l2.381 2.382v-6.29h-2.287a1.715 1.715 0 0 1-1.715-1.715V2.104z"
		/>
	</svg>
);
export default SvgFileicon;
