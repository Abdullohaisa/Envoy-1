// components/Keyboard/CustomKeyboard.tsx

import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import BackSpaceIcon from "@/assets/icon/back-space";
import AppText from "@/components/Texts/Text";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onKeyPress: (value: string) => void;
  codeLength: number;
  clearinput: () => void;
};

const NumberKeyboard = ({ onKeyPress, codeLength, clearinput }: Props) => {
  const Colors = useThemeColors();

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "del"],
  ];

  return (
    <>
      {buttons.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {row.map((btn, idx) => {
            const isZero = btn === "0";
            const isDel = btn === "del";

            const scale = useSharedValue(1);

            const animatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: scale.value }],
            }));

            const handleAnimatedPress = () => {
              // faqat del yoki codeLength < 4 bo‘lsa ishlasin
              if (btn !== "del" && codeLength >= 4) return;

              scale.value = withTiming(0.9, { duration: 50 }, () => {
                scale.value = withTiming(1, { duration: 200 });
              });

              onKeyPress(btn);
            };

            return (
              <TouchableWithoutFeedback
                key={idx}
                onPressIn={handleAnimatedPress}
                onLongPress={clearinput}
              >
                <Animated.View
                  style={[
                    {
                      height: screens.height * 0.09,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: Colors.Boxbackground,
                      flex: isZero ? 2.01 : 1,
                      borderWidth: 0.7,
                      borderColor: Colors.pageBackground,
                    },
                    animatedStyle,
                  ]}
                >
                  {isDel ? (
                    <BackSpaceIcon color="red" />
                  ) : (
                    <AppText style={{ fontSize: 22 }}>{btn}</AppText>
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      ))}
    </>
  );
};

export default NumberKeyboard;
