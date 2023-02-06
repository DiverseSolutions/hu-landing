import * as React from "react";
const SvgClock = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 6.25a.833.833 0 0 0-.834.833V10c0 .298.159.573.417.722l2.886 1.666a.834.834 0 0 0 .833-1.443l-2.47-1.426V7.083A.833.833 0 0 0 10 6.25Z"
      fill="#000"
      fillOpacity={0.65}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Zm0-1.666a6.667 6.667 0 1 0 0-13.334 6.667 6.667 0 0 0 0 13.334Z"
      fill="#000"
      fillOpacity={0.65}
    />
  </svg>
);
export default SvgClock;
