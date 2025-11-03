import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillChangeFrame" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onKeyboardShow = (e: any) => {
      setKeyboardHeight(e.endCoordinates.height);
    };

    const onKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    const showListener = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideListener = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardHeight;
}
