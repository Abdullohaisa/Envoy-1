import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import AuthHedaer from "@/components/Header/AuthHeader/AuthHedaer";
import { screens } from "@/shared/token";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import BackSpaceIcon from "@/assets/icon/back-space";
import { vibration } from "@/utils/hapticks";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const RPSmsCodePage = () => {
  const [code, setCode] = useState("");
  const Colors = useThemeColors();

  const handlePress = (value: string) => {
    if (value === "del") {
      setCode((prev) => prev.slice(0, -1));
    } else if (code.length < 4) {
      setCode((prev) => prev + value);
    }
    vibration.light();
  };

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "del"],
  ];

  console.log(code);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <AuthHedaer title="Sms kod" />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
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

                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    transform: [{ scale: scale.value }],
                  };
                });

                const handleAnimatedPress = () => {
                  // animatsiya
                  scale.value = withTiming(0.9, { duration: 50 }, () => {
                    scale.value = withTiming(1, { duration: 200 });
                  });

                  // funksiyani ishga tushuramiz
                  handlePress(btn);
                };

                return (
                  <TouchableWithoutFeedback
                    key={idx}
                    onPressIn={handleAnimatedPress}
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RPSmsCodePage;

const styles = StyleSheet.create({});
