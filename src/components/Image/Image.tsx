import { ImageSourcePropType, StyleProp, StyleSheet } from "react-native";
import { Image, ImageStyle } from "expo-image";

// ⚙️ Muhit o'zgaruvchisini olish
const PREFIX = process.env.EXPO_PUBLIC_PREFIX || "";

interface Props {
  source: ImageSourcePropType | string | null;
  contentFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: "low" | "normal" | "high";
  fallback?: string;
  style?: StyleProp<ImageStyle>;
  cachePolicy?: "memory" | "memory-disk" | "disk" | "none";
  blurRadius?: number;
}

const AppImage = ({
  source,
  contentFit = "cover",
  priority = "normal",
  style,
  fallback,
  cachePolicy = "memory-disk",
  blurRadius,
}: Props) => {
  const isRemote = typeof source === "string" && !!source;

  const fullUri =
    isRemote && !source.startsWith("https")
      ? `${PREFIX}${source.startsWith("/") ? "" : "/"}${source}`
      : source;

  return (
    <Image
      source={
        isRemote
          ? { uri: fullUri }
          : source || require("../../assets/image/welcome-third.webp")
      }
      style={[styles.image, style]}
      contentFit={contentFit}
      priority={isRemote ? priority : undefined}
      placeholder={isRemote && fallback ? [{ uri: fallback }] : undefined}
      transition={isRemote ? 300 : 0}
      cachePolicy={isRemote ? cachePolicy : undefined}
      blurRadius={blurRadius}
    />
  );
};

export default AppImage;

const styles = StyleSheet.create({
  image: {
    flexShrink: 0,
    resizeMode: "cover",
  },
});
