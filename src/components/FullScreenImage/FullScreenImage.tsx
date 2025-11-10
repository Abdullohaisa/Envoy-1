// import React, { useEffect } from "react";
// import { StyleSheet } from "react-native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   withSpring,
//   Easing,
//   runOnJS,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { screens } from "@/shared/token";

// const FullscreenImage = ({
//   uri,
//   onClose,
// }: {
//   uri: string;
//   onClose: () => void;
// }) => {
//   const scale = useSharedValue(1);
//   const opacity = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   // 🔹 Kirish animatsiyasi
//   useEffect(() => {
//     opacity.value = withTiming(1, {
//       duration: 300,
//       easing: Easing.out(Easing.ease),
//     });
//   }, []);

//   // 🔹 Scroll (surish) gesture
//   const scrollGesture = Gesture.Pan()
//     .onChange((event) => {
//       translateY.value = event.translationY;
//     })
//     .onEnd((event) => {
//       if (Math.abs(event.translationY) > 100) {
//         runOnJS(onClose)(); // 👈 crash-free
//       } else {
//         translateY.value = withTiming(0, { duration: 200 });
//       }
//     });

//   // 🔹 Pinch (zoom)
//   const pinchGesture = Gesture.Pinch()
//     .onChange((event) => {
//       scale.value = event.scale;
//     })
//     .onEnd(() => {
//       scale.value = withSpring(1);
//     });

//   // 🔹 Double tap zoom
//   const doubleTapGesture = Gesture.Tap()
//     .numberOfTaps(2)
//     .onEnd(() => {
//       scale.value = withSpring(scale.value > 1 ? 1 : 2);
//     });

//   // 🔹 Barchasini birlashtirish
//   const composedGesture = Gesture.Simultaneous(
//     scrollGesture,
//     pinchGesture,
//     doubleTapGesture
//   );

//   // 🔹 Animatsiya uslubi
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { scale: Math.max(0.5, Math.min(2, scale.value)) }, // limit zoom
//       {
//         translateY: Math.max(
//           -screens.height,
//           Math.min(screens.height, translateY.value)
//         ),
//       }, // limit scroll
//     ],
//     opacity: opacity.value,
//   }));

//   return (
//     <GestureDetector gesture={composedGesture}>
//       <Animated.View style={styles.container}>
//         <Animated.Image
//           source={{ uri: process.env.EXPO_PUBLIC_PREFIX + uri }}
//           style={[styles.image, animatedStyle]}
//         />
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// export default FullscreenImage;

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   image: {
//     width: screens.width,
//     height: screens.height,
//     resizeMode: "contain",
//   },
// });

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { screens } from "@/shared/token";

const FullscreenImage = ({
  uri,
  onClose,
}: {
  uri: string;
  onClose: () => void;
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // 🔹 Kirish animatsiyasi
  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  // 🔹 Pan gesture (scroll down to close)
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (Math.abs(e.translationY) > 150) {
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  // 🔹 Pinch gesture (zoom)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    });

  // 🔹 Double tap gesture (quick zoom)
  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(scale.value > 1 ? 1 : 2);
    });

  // 🔹 Gesture birlashtirish (Pan + Pinch + DoubleTap)
  const composedGesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    doubleTapGesture
  );

  // 🔹 Animatsion uslubi
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: Math.min(Math.max(scale.value, 0.5), 3) }, // zoom limit 0.5–3
      { translateY: translateY.value }, // pan
    ],
    opacity: opacity.value,
  }));

  const fullUrl = process.env.EXPO_PUBLIC_PREFIX + uri;

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={styles.container}>
        <Animated.Image
          source={{ uri }}
          style={[styles.image, animatedStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default FullscreenImage;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  image: {
    width: screens.width,
    height: screens.height,
    resizeMode: "contain",
  },
});
