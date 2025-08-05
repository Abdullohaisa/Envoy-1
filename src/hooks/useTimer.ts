// hooks/useTimer.ts

import { useEffect, useRef, useState } from "react";
import {
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function useTimer(start: number = 30) {
  const [count, setCount] = useState(start);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCount(start);
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    scale.value = 0;
    opacity.value = 0;
    scale.value = withSpring(1, { damping: 20 });
    opacity.value = withTiming(1, { duration: 500 });
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    count,
    startTimer,
    scale,
    opacity,
  };
}
