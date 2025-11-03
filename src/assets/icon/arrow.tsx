// import * as React from "react";
// import Svg, { Path } from "react-native-svg";
// import { View } from "react-native";

// type Props = {
//   size?: number;
//   color?: string;
//   direction?: "left" | "right" | "up" | "down";
// };

// function ArrowIcon({ size = 16, color = "#222", direction = "left" }: Props) {
//   const rotation = {
//     left: "0deg",
//     right: "180deg",
//     up: "-90deg",
//     down: "90deg",
//   }[direction];

//   return (
//     <View style={{ transform: [{ rotate: rotation }] }}>
//       <Svg
//         width={size}
//         height={(size * 14) / 16}
//         viewBox="0 0 16 14"
//         fill="none"
//       >
//         <Path
//           d="M8 1L2 7m0 0l6 6M2 7h12.5"
//           stroke={color}
//           strokeWidth={2}
//           strokeLinecap="round"
//         />
//       </Svg>
//     </View>
//   );
// }
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

type Props = {
  size?: number;
  color?: string;
  direction?: "left" | "right" | "up" | "down";
  type?: "arrow" | "chevron";
};

function ArrowIcon({
  size = 16,
  color = "#222",
  direction = "left",
  type = "arrow",
}: Props) {
  // Burilish burchagi
  const rotation = React.useMemo(() => {
    switch (direction) {
      case "left":
        return "180deg";
      case "right":
        return "0deg";
      case "up":
        return "-90deg";
      case "down":
        return "90deg";
      default:
        return "0deg";
    }
  }, [direction]);

  return (
    <View style={{ transform: [{ rotate: rotation }] }}>
      {type === "arrow" ? (
        // Arrow tipidagi o‘q
        <Svg
          width={size}
          height={(size * 14) / 16}
          viewBox="0 0 16 14"
          fill="none"
        >
          <Path
            d="M8 1L14 7L8 13M14 7H1.5"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : (
        // Chevron tipidagi (>) belgisi
        <Svg
          width={size}
          height={(size * 14) / 16}
          viewBox="0 0 16 14"
          fill="none"
        >
          <Path
            d="M6 1L12 7L6 13"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </View>
  );
}

export default ArrowIcon;
