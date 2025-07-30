import { useThemeColors } from "@/theme/useThemeColors";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

const AppText: React.FC<TextProps> = ({ children, style, ...rest }) => {
  const Colors = useThemeColors();
  return (
    <Text style={[styles.text, { color: Colors.textPrimary }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
