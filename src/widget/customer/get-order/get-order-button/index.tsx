import { Pressable, View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { Spacing, screens } from "@/shared/token";
import ArrowIcon from "@/assets/icon/arrow";
import { memo } from "react";
import { safeNavigate } from "@/utils/safe-navigation";
import { LinearGradient } from "expo-linear-gradient"; // ensure import
import tinycolor from "tinycolor2";

type Props = {
  title: string;
  icon: (color: string, size: number) => React.ReactNode;
  route: string;
  filled: boolean;
  value?: string | null | number;
};

export const OrderButton = memo(
  ({ title, icon, route, filled, value }: Props) => {
    const router = useRouter();
    const Colors = useThemeColors();
    const bg = Colors.Boxbackground;
    const bgTransparent = tinycolor(bg).setAlpha(0).toRgbString();

    let pickup: string | null = null;
    let dropoff: string | null = null;
    if (typeof value === "string" && value.includes("->")) {
      [pickup, dropoff] = value.split("->").map((v) => v.trim());
    }

    const borderColor = filled ? Colors.green04 : "transparent";
    const iconColor = filled ? Colors.green : Colors.primary;
    const textColor = filled ? Colors.green : Colors.textPrimary;

    return (
      <Pressable
        onPress={() => safeNavigate(() => router.push(route))}
        style={[
          styles.button,
          {
            backgroundColor: Colors.Boxbackground,
            borderColor,
            borderWidth: 1.5,
          },
        ]}
      >
        <View style={styles.row}>
          <View
            style={[
              styles.left,
              { width: "90%", overflow: "hidden", position: "relative" },
            ]}
          >
            {/* GRADIENT: chapdan o'ngga */}
            <LinearGradient
              colors={[bgTransparent, bg]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientOverlay}
              pointerEvents="none"
            />

            {icon(iconColor, 30)}

            <View style={{ flex: 1, gap: 5 }}>
              <AppText
                variant={filled ? "semiBold" : "regular"}
                style={[styles.buttonText, { color: textColor }]}
              >
                {title}
              </AppText>

              {value && (
                <View>
                  {pickup && dropoff ? (
                    <View style={[styles.routeRow, { gap: 10 }]}>
                      <AppText
                        numberOfLines={1}
                        ellipsizeMode="clip"
                        style={{
                          color: Colors.textPrimary,
                          fontSize: 12,
                          flexShrink: 1,
                        }}
                      >
                        {pickup}
                      </AppText>
                      <ArrowIcon
                        size={12}
                        direction="right"
                        color={Colors.textSecondary}
                      />
                      <AppText
                        numberOfLines={1}
                        ellipsizeMode="clip"
                        style={{
                          color: Colors.textPrimary,
                          fontSize: 12,
                          flexShrink: 1,
                        }}
                      >
                        {dropoff}
                      </AppText>
                    </View>
                  ) : (
                    <AppText
                      numberOfLines={1}
                      ellipsizeMode="clip"
                      style={{ color: Colors.textPrimary, fontSize: 12 }}
                    >
                      {value}
                    </AppText>
                  )}
                </View>
              )}
            </View>
          </View>

          <View style={{ width: "10%", alignItems: "center" }}>
            {filled ? (
              <Feather name="check-circle" size={22} color={Colors.green} />
            ) : (
              <Feather
                name="chevron-right"
                size={22}
                color={Colors.textSecondary}
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: Spacing.horizontal,
    justifyContent: "center",
    height: screens.height * 0.1,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.horizontal,
  },
  buttonText: {
    fontSize: 17,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  gradientOverlay: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 100, // qancha grad bo'lishini xohlasangiz shuni sozlang
    zIndex: 1,
  },
});
