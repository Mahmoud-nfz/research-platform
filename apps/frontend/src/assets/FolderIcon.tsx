import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFoldericon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		{...props}
	>
		<path
			fill="#1C274C"
			d="M2 6.95c0-.883 0-1.324.07-1.692A4 4 0 0 1 5.257 2.07C5.626 2 6.068 2 6.95 2c.386 0 .58 0 .766.017a4 4 0 0 1 2.18.904c.144.119.28.255.554.529L11 4c.816.816 1.224 1.224 1.712 1.495a4 4 0 0 0 .848.352C14.098 6 14.675 6 15.828 6h.374c2.632 0 3.949 0 4.804.77q.119.105.224.224c.77.855.77 2.172.77 4.804V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
		/>
		<path
			fill="#fff"
			fillRule="evenodd"
			d="M12.25 10a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75"
			clipRule="evenodd"
		/>
		<path
			fill="#1C274C"
			d="M16.986 3.02C16.832 3 16.649 3 16.283 3H12l.37.383c.666.69.922.948 1.218 1.118q.258.149.542.233c.326.096.683.101 1.625.101h.334c1.002 0 1.81 0 2.45.084q.24.03.461.081c-.186-1.037-.996-1.84-2.014-1.98"
		/>
	</svg>
);
export default SvgFoldericon;
