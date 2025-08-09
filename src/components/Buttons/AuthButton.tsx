import {
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import KeyboardResponsiveView from "../KeyboardResponsiveView/KeyboardResponsiveView";
import { screens } from "@/shared/token";
import AppButton from "./Button";
import { useThemeColors } from "@/theme/useThemeColors";

interface Props {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

const AuthButton = ({
  text,
  style,
  textStyle,
  loading,
  disabled,
  ...props
}: PressableProps & Props) => {
  return (
    <View style={{}}>
      <KeyboardResponsiveView>
        <AppButton
          text={text}
          textStyle={textStyle}
          style={style}
          disabled={disabled}
          loading={loading}
          {...props}
        />
      </KeyboardResponsiveView>
    </View>
  );
};

export default AuthButton;

const styles = StyleSheet.create({});
