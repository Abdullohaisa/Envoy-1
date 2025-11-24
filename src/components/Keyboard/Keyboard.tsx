import BackSpaceIcon from "@/assets/icon/back-space";
import { screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { View, TouchableWithoutFeedback, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../Texts/Text";

type NumberKeyboardProps = {
  onKeyPress: (value: string) => void;
  codeLength: number;
  clearinput: () => void;
  count: number;
  resend: () => void;
};

const NumberKeyboard = ({
  onKeyPress,
  codeLength,
  clearinput,
  count,
  resend,
}: NumberKeyboardProps) => {
  const Colors = useThemeColors();
  const bottomInsets = useSafeAreaInsets().bottom;

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "del"],
  ];

  // 🔹 Resend tugmasi komponenti
  const ResendHeader = () => (
    <View
      style={{
        height: 40,
        backgroundColor: Colors.Boxbackground,
        borderBottomWidth: 0.5,
        borderColor: Colors.borderColor,
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginBottom: 0.5,
      }}
    >
      <Animated.View
        style={{
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 1,
          left: 2.5,
        }}
      >
        <AppText style={{ color: Colors.primary, textAlign: "center" }}>
          {count}
        </AppText>
      </Animated.View>
      <Pressable disabled={count !== 0} onPress={resend} style={{ flex: 1 }}>
        <AppText
          style={{
            color: !count ? Colors.primary : "#999",
            textAlign: "center",
          }}
        >
          Qayta sms yuborish
        </AppText>
      </Pressable>
    </View>
  );

  const KeyButton = ({ btn }: { btn: string }) => {
    const isZero = btn === "0";
    const isDel = btn === "del";
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
      if (btn !== "del" && codeLength >= 4) return;

      scale.value = withTiming(0.9, { duration: 50 }, () => {
        scale.value = withTiming(1, { duration: 200 });
      });

      onKeyPress(btn);
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={handlePress}
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
              borderBottomWidth: isDel || isZero ? 1 : 0.7,
            },
            animatedStyle,
          ]}
        >
          {isDel ? (
            <BackSpaceIcon color="red" />
          ) : (
            <AppText style={{ fontSize: 22, color: "#fff" }}>{btn}</AppText>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  // 🔹 Har bir satrni chizish
  const KeyRow = ({ row }: { row: string[] }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {row.map((btn, idx) => (
        <KeyButton key={idx} btn={btn} />
      ))}
    </View>
  );

  return (
    <View>
      <ResendHeader />
      {buttons.map((row, rowIndex) => (
        <KeyRow key={rowIndex} row={row} />
      ))}
      <View
        style={{
          height: bottomInsets,
          backgroundColor: Colors.Boxbackground,
          marginTop: 0.5,
        }}
      />
    </View>
  );
};

export default NumberKeyboard;
