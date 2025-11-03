// import { Radius } from "@/shared/token";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { vibration } from "@/utils/hapticks";
// import { Dimensions, Pressable, StyleSheet, View, Text } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";

// const { width } = Dimensions.get("window");
// const BOX_WIDTH = width * 0.92;
// const OPTION_WIDTH = BOX_WIDTH / 2;
// const ANIMATION_DURATION = 250;

// const ChangeRoleButton = ({
//   setRole,
//   role,
// }: {
//   setRole: (role: "Customer" | "Driver") => void;
//   role: "Customer" | "Driver";
// }) => {
//   const Colors = useThemeColors();

//   const translateX = useSharedValue(0);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateX: translateX.value }],
//     };
//   });

//   const handleSwitch = (role: "Customer" | "Driver") => {
//     setRole(role);
//     translateX.value = withTiming(role === "Customer" ? 0 : OPTION_WIDTH, {
//       duration: ANIMATION_DURATION,
//     });
//     vibration.light();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={[styles.switchBox, { borderColor: Colors.borderColor }]}>
//         {/* Animated background box */}
//         <Animated.View style={[styles.highlight, animatedStyle]}>
//           <View
//             style={[
//               {
//                 backgroundColor: Colors.borderColor,
//                 flex: 1,
//                 borderRadius: 15,
//               },
//             ]}
//           />
//         </Animated.View>

//         {/* Buttons */}
//         <Pressable
//           onPress={() => handleSwitch("Customer")}
//           style={styles.option}
//         >
//           <Text
//             style={[
//               styles.text,
//               { color: Colors.textSecondary },
//               role === "Customer" && { color: Colors.textPrimary },
//             ]}
//           >
//             Buyurtmachi
//           </Text>
//         </Pressable>

//         <Pressable onPress={() => handleSwitch("Driver")} style={styles.option}>
//           <Text
//             style={[
//               styles.text,
//               { color: Colors.textSecondary },
//               role === "Driver" && { color: Colors.textPrimary },
//             ]}
//           >
//             Haydovchi
//           </Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default ChangeRoleButton;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginBottom: 25,
//     width: "100%",
//   },
//   switchBox: {
//     width: BOX_WIDTH,
//     height: 55,
//     borderRadius: 20,
//     flexDirection: "row",
//     overflow: "hidden",
//     position: "relative",
//     borderWidth: 1,
//   },
//   option: {
//     width: OPTION_WIDTH,
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   text: {
//     fontSize: 16,
//   },
//   activeText: {
//     color: "#000",
//   },
//   highlight: {
//     position: "absolute",
//     width: OPTION_WIDTH,
//     height: "100%",
//     borderRadius: 18,
//     zIndex: 0,
//     padding: 5,
//   },
// });

import { Radius } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { vibration } from "@/utils/hapticks";
import { Dimensions, Pressable, StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import AppText from "@/components/Texts/Text";

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
  const translateX = useSharedValue(role === "Customer" ? 0 : OPTION_WIDTH);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Barmoq bilan surish
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    let newX = event.nativeEvent.translationX;
    if (role === "Driver") newX += OPTION_WIDTH;

    if (newX < 0) newX = 0;
    if (newX > OPTION_WIDTH) newX = OPTION_WIDTH;

    translateX.value = newX;
  };

  const onHandlerEnd = (event: PanGestureHandlerGestureEvent) => {
    const finalX = translateX.value;
    if (finalX > OPTION_WIDTH / 2) {
      translateX.value = withTiming(OPTION_WIDTH, {
        duration: ANIMATION_DURATION,
      });
      runOnJS(setRole)("Driver");
      runOnJS(vibration.light)();
    } else {
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      runOnJS(setRole)("Customer");
      runOnJS(vibration.light)();
    }
  };

  const handleSwitch = (role: "Customer" | "Driver") => {
    setRole(role);
    translateX.value = withTiming(role === "Customer" ? 0 : OPTION_WIDTH, {
      duration: ANIMATION_DURATION,
    });
    vibration.light();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.switchBox, { borderColor: Colors.borderColor }]}>
        {/* Animated background box */}
        <Animated.View style={[styles.highlight, animatedStyle]}>
          <View
            style={[
              {
                backgroundColor: Colors.borderColor,
                flex: 1,
                borderRadius: 15,
              },
            ]}
          />
        </Animated.View>

        {/* Gesture Handler */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent} // surish davomida ishlaydi
          onEnded={() => {
            // tugagach
            const finalX = translateX.value;
            if (finalX > OPTION_WIDTH / 2) {
              translateX.value = withTiming(OPTION_WIDTH, {
                duration: ANIMATION_DURATION,
              });
              runOnJS(setRole)("Driver");
              runOnJS(vibration.light)();
            } else {
              translateX.value = withTiming(0, {
                duration: ANIMATION_DURATION,
              });
              runOnJS(setRole)("Customer");
              runOnJS(vibration.light)();
            }
          }}
        >
          <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
            {/* Buttons */}
            <Pressable
              onPress={() => handleSwitch("Customer")}
              style={styles.option}
            >
              <AppText
                style={[
                  styles.text,
                  { color: Colors.textSecondary },
                  role === "Customer" && { color: Colors.textPrimary },
                ]}
              >
                Buyurtmachi
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => handleSwitch("Driver")}
              style={styles.option}
            >
              <AppText
                style={[
                  styles.text,
                  { color: Colors.textSecondary },
                  role === "Driver" && { color: Colors.textPrimary },
                ]}
              >
                Haydovchi
              </AppText>
            </Pressable>
          </View>
        </PanGestureHandler>
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
    padding: 5,
  },
});
