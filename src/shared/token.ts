import { Dimensions } from "react-native";

export const screens = Dimensions.get("window");

export const Spacing = {
  horizontal: screens.width * 0.04,
};

export const Radius = {
  primary: 5,
  input: 20,
};
