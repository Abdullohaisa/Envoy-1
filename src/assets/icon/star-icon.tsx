import * as React from "react";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

interface StarProps {
  size?: number;
  color?: string;
}

const StarIcon = ({ size = 24, color }: StarProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Defs>
      <ClipPath id="clip">
        <Rect width="24" height="24" rx={2} ry={2} />
      </ClipPath>
    </Defs>
    <Path
      d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.784 1.402 8.172L12 18.896l-7.336 3.86 1.402-8.172L.132 9.211l8.2-1.193L12 .587z"
      fill={color}
      clipPath="url(#clip)"
    />
  </Svg>
);

export default StarIcon;
