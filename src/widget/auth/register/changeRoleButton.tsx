import { useThemeColors } from "@/theme/useThemeColors";
import { vibration } from "@/utils/hapticks";
import { Dimensions, Pressable, StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const BOX_WIDTH = width * 0.92;
const OPTION_WIDTH = BOX_WIDTH / 2;
const ANIMATION_DURATION = 250;

const ChangeRoleButton = ({
  setRole,
  role,
}: {
  setRole: (role: "Customer" | "Driver") => void;
  role: "Customer" | "Driver";
}) => {
  const Colors = useThemeColors();

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleSwitch = (role: "Customer" | "Driver") => {
    setRole(role);
    translateX.value = withTiming(role === "Customer" ? 0 : OPTION_WIDTH, {
      duration: ANIMATION_DURATION,
    });
    vibration.light();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.switchBox, { borderColor: Colors.Boxbackground }]}>
        {/* Animated background box */}
        <Animated.View
          style={[
            styles.highlight,
            animatedStyle,
            { backgroundColor: Colors.Boxbackground },
          ]}
        />

        {/* Buttons */}
        <Pressable
          onPress={() => handleSwitch("Customer")}
          style={styles.option}
        >
          <Text
            style={[
              styles.text,
              { color: Colors.textSecondary },
              role === "Customer" && { color: Colors.textPrimary },
            ]}
          >
            Buyurtmachi
          </Text>
        </Pressable>

        <Pressable onPress={() => handleSwitch("Driver")} style={styles.option}>
          <Text
            style={[
              styles.text,
              { color: Colors.textSecondary },
              role === "Driver" && { color: Colors.textPrimary },
            ]}
          >
            Haydovchi
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChangeRoleButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 25,
    width: "100%",
  },
  switchBox: {
    width: BOX_WIDTH,
    height: 55,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
  },
  option: {
    width: OPTION_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 16,
  },
  activeText: {
    color: "#000",
  },
  highlight: {
    position: "absolute",
    width: OPTION_WIDTH,
    height: "100%",
    borderRadius: 18,
    zIndex: 0,
  },
});
