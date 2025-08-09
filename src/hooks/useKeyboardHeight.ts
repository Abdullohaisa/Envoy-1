// import { useEffect, useState } from "react";
// import { Keyboard, KeyboardEvent, Platform } from "react-native";

// export const useKeyboardHeight = () => {
//   const [keyboardHeight, setKeyboardHeight] = useState(0);

//   useEffect(() => {
//     const onKeyboardShow = (e: KeyboardEvent) => {
//       setKeyboardHeight(e.endCoordinates.height);
//     };

//     const onKeyboardHide = () => {
//       setKeyboardHeight(0);
//     };

//     const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
//     const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

//     const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
//     const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

//     return () => {
//       showSub.remove();
//       hideSub.remove();
//     };
//   }, []);

//   return keyboardHeight;
// };

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
