import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFiltericon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width={20}
		height={20}
		{...props}
	>
		<path
			stroke="#1C274C"
			strokeLinecap="round"
			strokeWidth={1.5}
			d="M20.058 9.723c.948-.534 1.423-.801 1.682-1.232.26-.43.26-.949.26-1.987v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3H5c-1.414 0-2.121 0-2.56.412S2 4.488 2 5.815v.69c0 1.037 0 1.556.26 1.986s.733.698 1.682 1.232l2.913 1.64c.636.358.955.537 1.183.735.474.411.766.895.898 1.49.064.284.064.618.064 1.285v2.67c0 .909 0 1.364.252 1.718.252.355.7.53 1.594.88 1.879.734 2.818 1.101 3.486.683S15 19.452 15 17.542v-2.67c0-.666 0-1 .064-1.285a2.68 2.68 0 0 1 .899-1.49"
		/>
	</svg>
);
export default SvgFiltericon;
