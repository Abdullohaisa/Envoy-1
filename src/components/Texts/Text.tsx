import { StyleSheet, Text, TextProps, View } from "react-native";
import React from "react";
import { Fonts } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";

type TFont = keyof typeof Fonts;

interface AppTextProp extends TextProps {
  variant?: TFont;
}

const AppText = ({ variant = "regular", style, ...props }: AppTextProp) => {
  const Colors = useThemeColors();
  return (
    <Text
      {...props}
      style={[{ fontFamily: Fonts[variant], color: Colors.textPrimary }, style]}
    />
  );
};

export default AppText;
