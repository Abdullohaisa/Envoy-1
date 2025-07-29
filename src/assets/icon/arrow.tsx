import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

type Props = {
  size?: number;
  color?: string;
  direction?: "left" | "right" | "up" | "down";
};

function ArrowIcon({ size = 16, color = "#222", direction = "left" }: Props) {
  const rotation = {
    left: "0deg",
    right: "180deg",
    up: "-90deg",
    down: "90deg",
  }[direction];

  return (
    <View style={{ transform: [{ rotate: rotation }] }}>
      <Svg
        width={size}
        height={(size * 14) / 16} // proporsiyani saqlab qolish uchun
        viewBox="0 0 16 14"
        fill="none"
      >
        <Path
          d="M8 1L2 7m0 0l6 6M2 7h12.5"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export default ArrowIcon;
