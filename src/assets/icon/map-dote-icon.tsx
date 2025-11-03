import { useThemeColors } from "@/theme/useThemeColors";
import * as React from "react";
import Svg, { G, Path, Mask, Ellipse, Defs } from "react-native-svg";

function MapDoteIcon(props: any) {
  const Colors = useThemeColors();
  return (
    <Svg
      width={87}
      height={105}
      viewBox="0 0 25 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_4661_23)">
        {/* <Path
          d="M20 10.5c0 5.018-5.488 8.403-7.075 9.276a.87.87 0 01-.85 0C10.488 18.903 5 15.518 5 10.5 5 6 8.634 3 12.5 3c4 0 7.5 3 7.5 7.5z"
          fill="#ffffffba"
          stroke="#444"
        /> */}
        <Mask id="a" fill="#fff">
          <Path d="M12 21.5a.5.5 0 011 0v7a.5.5 0 01-1 0v-7z" />
        </Mask>
        <Path
          d="M12 21.5a.5.5 0 011 0v7a.5.5 0 01-1 0v-7z"
          fill={Colors.borderColor}
        />
        <Path
          d="M11 21.5v7h4v-7h-4zm3 7v-7h-4v7h4zM12.5 27a1.5 1.5 0 011.5 1.5h-4a2.5 2.5 0 002.5 2.5v-4zM11 28.5a1.5 1.5 0 011.5-1.5v4a2.5 2.5 0 002.5-2.5h-4zm1.5-5.5a1.5 1.5 0 01-1.5-1.5h4a2.5 2.5 0 00-2.5-2.5v4zm0-4a2.5 2.5 0 00-2.5 2.5h4a1.5 1.5 0 01-1.5 1.5v-4z"
          fill="#ff0000"
          mask="url(#a)"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
}

export default MapDoteIcon;
