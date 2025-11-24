import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FlagsIcon({ size = 18, color = "#000", ...props }) {
  return (
    <Svg
      width={(46 / 24) * size}
      height={size}
      viewBox="0 0 46 24"
      fill="none"
      {...props}
    >
      <Path
        d="M17.343 22.601l5-7.601M28.343 23l-9-13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25 10.987c7.313-1.03 6.543 9.031 13.856 8l5.687-9.85c-7.313 1.031-6.543-9.03-13.856-8L25 10.987zM20.543 11.987c-7.313-1.03-6.543 9.031-13.856 8L1 10.137c7.313 1.031 6.543-9.03 13.856-8l5.687 9.85z"
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default FlagsIcon;
