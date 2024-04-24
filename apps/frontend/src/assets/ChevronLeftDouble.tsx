import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronLeftDouble = (props: SVGProps<SVGSVGElement>) => (
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
      d="m18 17-5-5 5-5m-7 10-5-5 5-5"
    />
  </svg>
);
export default SvgChevronLeftDouble;
