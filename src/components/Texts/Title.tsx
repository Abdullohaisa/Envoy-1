import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
import React, { ReactNode } from "react";
import AppText from "./Text";
import { useThemeColors } from "@/theme/useThemeColors";

interface Props {
  align?: "left" | "center" | "right";
  children: ReactNode;
  props?: TextProps;
  style?: TextStyle;
}

const AppTitle = ({ align = "left", children, style, ...props }: Props) => {
  const Colors = useThemeColors();
  return (
    <AppText
      style={[
        styles.title,
        { textAlign: align, color: Colors.textPrimary },
        style,
      ]}
      {...props}
    >
      {children}
    </AppText>
  );
};

export default AppTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
