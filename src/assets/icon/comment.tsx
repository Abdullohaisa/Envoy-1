import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CommentIcon({ size = 24, color = "#222", ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10.4c0-2.24 0-3.36.436-4.216a4 4 0 011.748-1.748C6.04 4 7.16 4 9.4 4h5.2c2.24 0 3.36 0 4.216.436a4 4 0 011.748 1.748C21 7.04 21 8.16 21 10.4v1.2c0 2.24 0 3.36-.436 4.216a4 4 0 01-1.748 1.748C17.96 18 16.84 18 14.6 18H7.414a1 1 0 00-.707.293l-2 2c-.63.63-1.707.184-1.707-.707V10.4zM9 8a1 1 0 000 2h6a1 1 0 100-2H9zm0 4a1 1 0 100 2h3a1 1 0 100-2H9z"
        fill={color}
      />
    </Svg>
  );
}

export default CommentIcon;
