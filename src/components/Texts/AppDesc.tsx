import { StyleSheet, Text, TextProps, View } from "react-native";
import React, { ReactNode } from "react";
import AppText from "./AppText";
import { useThemeColors } from "@/theme/useThemeColors";

interface Props {
  align?: "left" | "center" | "right";
  children: ReactNode;
  props?: TextProps;
}

const AppDesc = ({ align = "left", children, ...props }: Props) => {
  const Colors = useThemeColors();
  return (
    <AppText
      style={[styles.desc, { textAlign: align, color: Colors.textSecondary }]}
      {...props}
    >
      {children}
    </AppText>
  );
};

export default AppDesc;

const styles = StyleSheet.create({
  desc: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 22,
    letterSpacing: 1,
  },
});
