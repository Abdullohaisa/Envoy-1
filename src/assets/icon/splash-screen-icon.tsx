// import * as React from "react";
// import Svg, { Path } from "react-native-svg";
// import Animated, {
//   useSharedValue,
//   useAnimatedProps,
//   withTiming,
//   withSequence,
//   withSpring,
//   Easing,
// } from "react-native-reanimated";

// const AnimatedPath = Animated.createAnimatedComponent(Path);

// const SplashScreenIcon = ({ size = 150 }: { size?: number }) => {
//   const progress = useSharedValue(0);
//   const scale = useSharedValue(1);
//   const fillOpacity = useSharedValue(0);

//   React.useEffect(() => {
//     // 1. Chizish animatsiyasi
//     progress.value = withTiming(
//       1,
//       { duration: 1500, easing: Easing.linear },
//       () => {
//         // 2. Kichiklashib, keyin kattalashish
//         scale.value = withSequence(
//           withTiming(0.9, { duration: 200 }),
//           withSpring(1, { damping: 8, stiffness: 150 }, () => {
//             // 3. Fill rangini ko‘rsatish
//             fillOpacity.value = withTiming(1, { duration: 300 });
//           })
//         );
//       }
//     );
//   }, []);

//   const strokeLength = 1700; // taxminiy uzunlik

//   // Stroke animatsiyasi (chizish)
//   const animatedStrokeProps = useAnimatedProps(() => ({
//     strokeDashoffset: strokeLength * (1 - progress.value),
//   }));

//   // Fill va scale animatsiyasi
//   const animatedFillProps = useAnimatedProps(() => ({
//     transform: [{ scale: scale.value }],
//     fillOpacity: fillOpacity.value,
//   }));

//   return (
//     <Svg width={size} height={size} viewBox="0 0 627 668" fill="none">
//       {/* Chap qism */}
//       <AnimatedPath
//         d="M301.981 530.975C301.981 605.362 241.679 665.664 167.292 665.664H3.63184L301.981 10.7627V530.975Z"
//         stroke="#00BEFF"
//         strokeWidth={4.67133}
//         fill="none"
//         strokeDasharray={strokeLength}
//         animatedProps={animatedStrokeProps}
//       />

//       {/* O‘ng qism */}
//       <AnimatedPath
//         d="M324.653 530.975C324.653 605.362 384.956 665.664 459.343 665.664H623.003L324.653 10.7627V530.975Z"
//         stroke="#00BEFF"
//         strokeWidth={4.67133}
//         fill="none"
//         strokeDasharray={strokeLength}
//         animatedProps={animatedStrokeProps}
//       />

//       {/* Fill rangini oxirida qo‘shish */}
//       <AnimatedPath
//         d="M301.981 530.975C301.981 605.362 241.679 665.664 167.292 665.664H3.63184L301.981 10.7627V530.975Z"
//         fill="#00BEFF"
//         animatedProps={animatedFillProps}
//       />
//       <AnimatedPath
//         d="M324.653 530.975C324.653 605.362 384.956 665.664 459.343 665.664H623.003L324.653 10.7627V530.975Z"
//         fill="#00BEFF"
//         animatedProps={animatedFillProps}
//       />
//     </Svg>
//   );
// };

// export default SplashScreenIcon;

import * as React from "react";
import Svg, { Path, G } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

const SplashScreenIcon = ({ size = 150 }: { size?: number }) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const fillOpacity = useSharedValue(0);

  React.useEffect(() => {
    // 1. Chizish animatsiyasi
    progress.value = withTiming(
      1,
      { duration: 1500, easing: Easing.linear },
      () => {
        // 2. Kichiklashib, keyin kattalashish
        scale.value = withSequence(
          withTiming(0.9, { duration: 200 }),
          withSpring(1, { damping: 8, stiffness: 150 }, () => {
            // 3. Fill rangini ko‘rsatish
            fillOpacity.value = withTiming(1, { duration: 300 });
          })
        );
      }
    );
  }, []);

  const strokeLength = 1700;

  // Stroke animatsiyasi
  const animatedStrokeProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeLength * (1 - progress.value),
  }));

  // Fill opacity animatsiyasi
  const animatedFillProps = useAnimatedProps(() => ({
    fillOpacity: fillOpacity.value,
  }));

  // Scale animatsiyasi (G element uchun)
  const animatedScaleProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Svg width={size} height={size} viewBox="0 0 627 668" fill="none">
      {/* Chap qism */}
      <AnimatedPath
        d="M301.981 530.975C301.981 605.362 241.679 665.664 167.292 665.664H3.63184L301.981 10.7627V530.975Z"
        stroke="#00BEFF"
        strokeWidth={4.67133}
        fill="none"
        strokeDasharray={strokeLength}
        animatedProps={animatedStrokeProps}
      />

      {/* O‘ng qism */}
      <AnimatedPath
        d="M324.653 530.975C324.653 605.362 384.956 665.664 459.343 665.664H623.003L324.653 10.7627V530.975Z"
        stroke="#00BEFF"
        strokeWidth={4.67133}
        fill="none"
        strokeDasharray={strokeLength}
        animatedProps={animatedStrokeProps}
      />

      {/* Fill rangini oxirida qo‘shish */}
      <AnimatedG animatedProps={animatedScaleProps}>
        <AnimatedPath
          d="M301.981 530.975C301.981 605.362 241.679 665.664 167.292 665.664H3.63184L301.981 10.7627V530.975Z"
          fill="#00BEFF"
          animatedProps={animatedFillProps}
        />
        <AnimatedPath
          d="M324.653 530.975C324.653 605.362 384.956 665.664 459.343 665.664H623.003L324.653 10.7627V530.975Z"
          fill="#00BEFF"
          animatedProps={animatedFillProps}
        />
      </AnimatedG>
    </Svg>
  );
};

export default SplashScreenIcon;
