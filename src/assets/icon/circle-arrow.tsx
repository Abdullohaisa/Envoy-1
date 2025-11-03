import * as React from "react";
import { Platform } from "react-native";
import Svg, { Path } from "react-native-svg";

function CiricleArrowIcon(props: any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4 10l-.707.707L2.586 10l.707-.707L4 10zm17 8a1 1 0 11-2 0h2zM8.293 15.707l-5-5 1.414-1.414 5 5-1.414 1.414zm-5-6.414l5-5 1.414 1.414-5 5-1.414-1.414zM4 9h10v2H4V9zm17 7v2h-2v-2h2zm-7-7a7 7 0 017 7h-2a5 5 0 00-5-5V9z"
        fill={Platform.OS === "ios" ? "silver" : "#444"}
      />
    </Svg>
  );
}

export default CiricleArrowIcon;
