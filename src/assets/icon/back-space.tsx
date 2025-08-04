import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BackSpaceIcon({ width = 24, height = 18, color = "#222", ...props }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 18"
      fill="none"
      {...props}
    >
      <Path
        d="M7.807.5H19.5A3.5 3.5 0 0123 4v10a3.5 3.5 0 01-3.5 3.5H7.676a3.5 3.5 0 01-2.939-1.599l-3.652-5.644a1.5 1.5 0 01-.038-1.567l3.73-6.444A3.5 3.5 0 017.807.5z"
        stroke={color}
      />
      <Path d="M19 13l-8-8M11 13l8-8" stroke={color} strokeLinecap="round" />
    </Svg>
  );
}

export default BackSpaceIcon;
