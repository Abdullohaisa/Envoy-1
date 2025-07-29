import { ImageSourcePropType, StyleProp, StyleSheet } from "react-native";
import React from "react";
import { Image, ImageStyle } from "expo-image";

interface Props {
  source: ImageSourcePropType | string;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: "low" | "normal" | "high";
  fallback?: string;
  style?: StyleProp<ImageStyle>;
  cachePolicy?: "memory" | "memory-disk" | "disk" | "none";
}

const AppImage = ({
  source,
  contentFit = "cover",
  priority = "normal",
  style,
  fallback,
  cachePolicy = "memory-disk",
}: Props) => {
  const isRemote = typeof source === "string";

  return (
    <Image
      source={isRemote ? { uri: source } : source}
      style={[styles.image, style]}
      contentFit={contentFit}
      priority={isRemote ? priority : undefined}
      placeholder={isRemote ? fallback : undefined}
      transition={isRemote ? 300 : 0}
      cachePolicy={isRemote ? cachePolicy : undefined}
    />
  );
};

export default AppImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
