import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function MapIcon({ size = 24, color = "#222", ...props }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.218 4.092C3 4.52 3 5.08 3 6.2v.614l17.99-1.636c-.019-.488-.07-.814-.208-1.086a2 2 0 00-.874-.874C19.48 3 18.92 3 17.8 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874zM21 7.186l-4.865.442 2.506 13.367c.592-.013.963-.058 1.267-.213a2 2 0 00.874-.874C21 19.48 21 18.92 21 17.8V7.186zM16.608 21L14.134 7.81 3 8.822V17.8c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C4.52 21 5.08 21 6.2 21h10.408zM12.5 15.03c0 2.158-2.14 3.674-3.073 4.233a.827.827 0 01-.854 0C7.64 18.704 5.5 17.188 5.5 15.029 5.5 12.912 7.196 11.5 9 11.5c1.867 0 3.5 1.412 3.5 3.53z"
        fill={color}
      />
      <Circle cx={9} cy={15} r={1} fill={color} />
    </Svg>
  );
}

export default MapIcon;
