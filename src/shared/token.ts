import { Dimensions, Platform } from "react-native";

export const screens = Dimensions.get("window");

export const Spacing = {
  horizontal: screens.width * 0.03,
};

export const Radius = {
  primary: 5,
  input: 20,
};

export const Fonts = {
  regular: "Inter-Regular",
  medium: "Inter-Medium",
  semiBold: "Inter-SemiBold",
  bold: "Inter-Bold",
  italic: "Inter-Italic",
};

const currencies = ["UZS", "USD", "RUBL"];

export const Shadow = {
  light: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
  dark: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: 10,
    },
  }),
};

export const AndroidRipple = {
  color: "#00BEFF",
  borderless: false,
  radius: -0.5,
  foreground: true,
};
