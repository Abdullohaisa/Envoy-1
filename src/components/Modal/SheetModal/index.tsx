// import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
// import AppButton from "@/components/Buttons/Button";
// import AppText from "@/components/Texts/Text";
// import { Shadow, screens } from "@/shared/token";
// import { useThemeColors } from "@/theme/useThemeColors";
// import React, { useEffect, useMemo, useRef } from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";

// interface Props {
//   open: boolean;
//   onDismiss: () => void;
//   type?: "ok" | "yesno";
//   message: string;
//   onOk?: () => void;
//   onYes?: () => void;
//   onNo?: () => void;
//   okText?: string;
//   yesText?: string;
//   noText?: string;
// }

// export default function SheetModal({
//   open,
//   onDismiss,
//   type = "ok",
//   message,
//   onOk,
//   onYes,
//   onNo,
//   okText = "OK",
//   yesText = "Ha",
//   noText = "Yo'q",
// }: Props) {
//   const snapPoints = useMemo(
//     () => ["32%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
//     []
//   );
//   const modalRef = useRef<any>(null);
//   const Colors = useThemeColors();

//   useEffect(() => {
//     if (open) {
//       modalRef.current?.present();
//     } else {
//       modalRef.current?.dismiss();
//     }
//   }, [open]);

//   const handleClose = () => {
//     modalRef.current?.dismiss();
//     onDismiss();
//   };

//   const handleOk = () => {
//     onOk?.();
//     handleClose();
//   };

//   const handleYes = () => {
//     onYes?.();
//     handleClose();
//   };

//   const handleNo = () => {
//     onNo?.();
//     handleClose();
//   };

//   return (
//     <CustomBottomSheetModal
//       ref={modalRef}
//       snapPoints={snapPoints}
//       backgroundStyle={{
//         backgroundColor: "transparent",
//         borderRadius: 20,
//         overflow: "hidden",
//       }}
//       index={0}
//       enablePanDownToClose
//       onDismiss={onDismiss}
//       containerStyle={{
//         padding: 10,
//         borderRadius: 20,
//         overflow: "hidden",
//       }}
//       backdropOpacity={0.5}
//       handleIndicatorStyle={{ display: "none" }}
//     >
//       <View
//         style={[
//           styles.content,
//           {
//             backgroundColor: Colors.Boxbackground,
//             marginHorizontal: 20,
//             paddingTop: 20,
//           },
//           Shadow.dark,
//         ]}
//       >
//         <View
//           style={{
//             justifyContent: "center",
//           }}
//         >
//           <AppText style={styles.message}>{message}</AppText>
//         </View>

//         <View style={{ flex: 1, justifyContent: "flex-end" }}>
//           {type === "ok" && (
//             <AppButton
//               onPress={handleOk}
//               text={okText}
//               variant="silver"
//               style={{ backgroundColor: "red", borderRadius: 20 }}
//             />
//           )}

//           {type === "yesno" && (
//             <>
//               <View style={styles.row}>
//                 <AppButton
//                   android_ripple={{
//                     color: Colors.Boxbackground,
//                     borderless: false,
//                     radius: 200,
//                   }}
//                   onPress={handleYes}
//                   text={yesText}
//                 />
//                 <AppButton
//                   android_ripple={{
//                     color: Colors.Boxbackground,
//                     borderless: false,
//                     radius: 200,
//                   }}
//                   variant="silver"
//                   onPress={handleNo}
//                   text={noText}
//                 />
//               </View>
//             </>
//           )}
//         </View>
//       </View>
//     </CustomBottomSheetModal>
//   );
// }

// const styles = StyleSheet.create({
//   content: {
//     padding: 10,
//     minHeight: screens.height * 0.27,
//     borderRadius: 30,
//   },
//   message: {
//     fontSize: 18,
//     textAlign: "center",
//     lineHeight: 26, // ✨ Matnga nafas beradi
//     letterSpacing: 0.3, // ✨ Harflar orasini tiniq qiladi
//   },

//   row: {
//     flex: 1,
//     justifyContent: "flex-end",
//     gap: 10,
//   },
//   yesBtn: {
//     flex: 1,
//   },
//   noBtn: {
//     flex: 1,
//     backgroundColor: "#999",
//   },
// });

import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppButton from "@/components/Buttons/Button";
import AppText from "@/components/Texts/Text";
import { Shadow, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";

interface Props {
  open: boolean;
  onDismiss: () => void;
  type?: "ok" | "yesno";
  message: string;
  onOk?: () => void;
  onYes?: () => void;
  onNo?: () => void;
  okText?: string;
  yesText?: string;
  noText?: string;
}

export default function SheetModal({
  open,
  onDismiss,
  type = "ok",
  message,
  onOk,
  onYes,
  onNo,
  okText = "Ok",
  yesText = "Ha",
  noText = "Bekor qilish",
}: Props) {
  const snapPoints = useMemo(() => ["40%"], []);
  const modalRef = useRef<any>(null);
  const Colors = useThemeColors();

  useEffect(() => {
    if (open) modalRef.current?.present();
    else modalRef.current?.dismiss();
  }, [open]);

  const handleClose = () => {
    modalRef.current?.dismiss();
    onDismiss();
  };

  const handleOk = () => {
    onOk?.();
    handleClose();
  };
  const handleYes = () => {
    onYes?.();
    handleClose();
  };
  const handleNo = () => {
    onNo?.();
    handleClose();
  };

  return (
    <CustomBottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: "transparent" }}
      handleIndicatorStyle={{ display: "none" }}
      enablePanDownToClose
      backdropOpacity={0.5}
      onDismiss={onDismiss}
    >
      <Animated.View
        entering={FadeInDown.duration(400)}
        exiting={FadeOutUp.duration(300)}
        style={[
          styles.wrapper,
          { backgroundColor: Colors.Boxbackground },
          Shadow.medium,
        ]}
      >
        {/* Message qismi */}
        <Animated.View entering={ZoomIn.delay(100)} exiting={ZoomOut}>
          <AppText style={[styles.message, { color: Colors.textPrimary }]}>
            {message}
          </AppText>
        </Animated.View>

        {/* Tugmalar */}
        <Animated.View
          entering={FadeInDown.delay(200)}
          style={styles.buttonsContainer}
        >
          {type === "ok" && (
            <AppButton
              title={okText}
              onPress={handleOk}
              style={styles.okButton}
              titleStyle={{ fontWeight: "600", fontSize: 16 }}
            />
          )}

          {type === "yesno" && (
            <View style={styles.row}>
              <AppButton
                onPress={handleYes}
                title={yesText}
                titleStyle={{ fontWeight: "600" }}
                style={{ backgroundColor: "red" }}
              />
              <AppButton
                onPress={handleNo}
                title={noText}
                variant="secondary"
                buttonStyle={{ backgroundColor: "red" }}
              />
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.2,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 10,
    height: 55,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    flex: 1,
  },
  yesBtn: {
    flex: 1,
    borderRadius: 16,
  },
  noBtn: {
    flex: 1,
    borderRadius: 16,
  },
  okButton: {
    borderRadius: 16,
    backgroundColor: "#4a90e2",
    width: "100%",
  },
});
