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
          {type === "ok" && <AppButton title={okText} onPress={handleOk} />}

          {type === "yesno" && (
            <View style={styles.row}>
              <AppButton
                onPress={handleYes}
                title={yesText}
                buttonStyle={{ flex: 1 }}
              />
              <AppButton
                onPress={handleNo}
                title={noText}
                variant="secondary"
                buttonStyle={{ flex: 1 }}
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
