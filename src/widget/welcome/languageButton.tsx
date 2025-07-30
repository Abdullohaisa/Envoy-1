import { Pressable, Text, View } from "react-native";
import React from "react";
import { WelcomePageStyles as styles } from "./style";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";

const WelcomeLanguageButton = () => {
  const Colors = useThemeColors();
  return (
    <Pressable
      style={[styles.langButton, { backgroundColor: Colors.secondary }]}
    >
      <View
        style={[
          styles.langButtonBox,
          {
            borderColor: Colors.primary,
          },
        ]}
      >
        <AppText
          style={[
            styles.langButtonText,
            { color: Colors.primary, fontWeight: "900" },
          ]}
        >
          Uz
        </AppText>
      </View>
    </Pressable>
  );
};

export default WelcomeLanguageButton;
