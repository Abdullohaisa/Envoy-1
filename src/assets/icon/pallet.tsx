// import * as React from "react";
// import Svg, { Rect, Path } from "react-native-svg";

// type Props = {
//   size?: number; // SVG ni kattaligi (width & height)
//   color?: string; // SVG elementlari rangi
// };

// const PalletIcon = ({ size = 24, color = "#000000" }: Props) => {
//   return (
//     <Svg
//       width={size}
//       height={size} // kvadrat shakl
//       viewBox="0 0 320 321"
//       fill="none"
//     >
//       <Rect x={198} y={74} width={74} height={40} rx={10} fill={color} />
//       <Path
//         d="M48 218c0-5.523 4.477-10 10-10h204c5.523 0 10 4.477 10 10v19c0 5.523-4.477 10-10 10h-10.25a8.75 8.75 0 01-8.75-8.75 8.75 8.75 0 00-8.75-8.75h-50a8.75 8.75 0 00-8.75 8.75 8.75 8.75 0 01-8.75 8.75h-13a8.75 8.75 0 01-8.75-8.75 8.75 8.75 0 00-8.75-8.75h-49.5a8.75 8.75 0 00-8.75 8.75 8.75 8.75 0 01-8.75 8.75H58c-5.523 0-10-4.477-10-10v-19z"
//         fill={color}
//       />
//       <Rect x={163} y={119} width={109} height={82} rx={10} fill={color} />
//       <Rect x={48} y={136} width={109} height={65} rx={10} fill={color} />
//     </Svg>
//   );
// };

// export default PalletIcon;

import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

type Props = {
  size?: number; // width va height uchun
  color?: string; // barcha elementlarning rangi
};

const PalletIcon = ({ size = 20, color = "#9E9E9E" }: Props) => {
  return (
    <Svg
      width={size}
      height={size} // kvadrat ko‘rinish
      viewBox="0 0 320 321"
      fill="none"
    >
      <Rect x={198} y={69} width={74} height={40} rx={10} fill={color} />
      <Path
        d="M48 223C48 217.477 52.4772 213 58 213H262C267.523 213 272 217.477 272 223V242C272 247.523 267.523 252 262 252H251.75C246.918 252 243 248.082 243 243.25C243 238.418 239.082 234.5 234.25 234.5H184.25C179.418 234.5 175.5 238.418 175.5 243.25C175.5 248.082 171.582 252 166.75 252H153.75C148.918 252 145 248.082 145 243.25C145 238.418 141.082 234.5 136.25 234.5H86.75C81.9175 234.5 78 238.418 78 243.25C78 248.082 74.0825 252 69.25 252H58C52.4772 252 48 247.523 48 242V223Z"
        fill={color}
      />
      <Rect x={165} y={119} width={106.5} height={82} rx={10} fill={color} />
      <Rect x={48} y={136} width={106.5} height={65} rx={10} fill={color} />
    </Svg>
  );
};

export default PalletIcon;
