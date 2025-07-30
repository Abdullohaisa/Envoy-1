import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type SunIconProps = {
  size?: number;
  color?: string;
};

const SunIcon: React.FC<SunIconProps> = ({ size = 24, color = "#222", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Circle cx={12} cy={12} r={3.5} stroke={color} />
      <Path
        d="M12 5V3M12 21v-2M16.95 7.05l1.414-1.414M5.636 18.364L7.05 16.95M19 12h2M3 12h2M16.95 16.95l1.414 1.414M5.636 5.636L7.05 7.05"
        stroke={color}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SunIcon;
