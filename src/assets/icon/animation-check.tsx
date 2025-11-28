import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

interface CheckIconProps {
  size?: number;
  color?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

function AnimtaionCheckIcon({
  size = 24,
  color = "#222",
  ...props
}: CheckIconProps) {
  const circleLength = 2 * Math.PI * 9; // r=9 uchun perimetr
  const checkLength =
    Math.sqrt(Math.pow(3, 2) + Math.pow(3, 2)) +
    Math.sqrt(Math.pow(5, 2) + Math.pow(6, 2)); // taxminiy uzunlik

  const circleProgress = useSharedValue(circleLength);
  const checkProgress = useSharedValue(checkLength);

  const circleAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circleProgress.value,
  }));

  const checkAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: checkProgress.value,
  }));

  React.useEffect(() => {
    circleProgress.value = withTiming(0, { duration: 1000 });
    checkProgress.value = withTiming(0, { duration: 1000 });
  }, []);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <AnimatedCircle
        cx={12}
        cy={12}
        r={9}
        stroke={color}
        strokeWidth={1}
        strokeDasharray={circleLength}
        animatedProps={circleAnimatedProps}
      />
      <AnimatedPath
        d="M8 12l3 3 5-6"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray={checkLength}
        animatedProps={checkAnimatedProps}
      />
    </Svg>
  );
}

export default AnimtaionCheckIcon;
