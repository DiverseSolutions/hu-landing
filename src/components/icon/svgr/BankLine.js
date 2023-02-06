import * as React from "react";
const SvgBankLine = (props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#bank-line_svg__a)">
      <path
        d="m16.894 2.956 11.333 6.333a2 2 0 0 1 1.107 1.791V13c0 .92-.747 1.667-1.667 1.667h-1v10.666H28A1.333 1.333 0 1 1 28 28H4a1.333 1.333 0 0 1 0-2.667h1.334V14.667h-1c-.92 0-1.667-.747-1.667-1.667v-1.92c0-.696.36-1.336.941-1.699l11.498-6.425a2 2 0 0 1 1.788 0ZM24 14.666H8v10.667h4v-8h2.667v8h2.667v-8H20v8h4V14.667Zm-8-9.175-10.666 6V12h21.333v-.51L16 5.49ZM16 8a1.333 1.333 0 1 1 0 2.667A1.333 1.333 0 0 1 16 8Z"
        fill="#000"
        fillOpacity={0.35}
      />
    </g>
    <defs>
      <clipPath id="bank-line_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgBankLine;
