import * as React from "react";
import type { SVGProps } from "react";
const SvgDownChevronicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    aria-hidden="true"
    viewBox="0 0 10 6"
    height={20}
    width={20}
    {...props}
  >
    <path stroke="currentColor" d="m1 1 4 4 4-4" />
  </svg>
);
export default SvgDownChevronicon;
