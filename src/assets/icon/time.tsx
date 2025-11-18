import * as React from "react";
import Svg, { Path } from "react-native-svg";

function TimeIcon({ size = 24, color = "#222", ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zm1-14.5a1 1 0 10-2 0v5.25c0 .69.56 1.25 1.25 1.25h3.25a1 1 0 100-2H13V6.5z"
        fill={color}
      />
    </Svg>
  );
}

export default TimeIcon;
