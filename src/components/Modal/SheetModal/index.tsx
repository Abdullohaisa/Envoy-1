import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppButton from "@/components/Buttons/Button";
import AppText from "@/components/Texts/Text";
import { Shadow, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

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
  okText = "OK",
  yesText = "Ha",
  noText = "Yo'q",
}: Props) {
  const snapPoints = useMemo(
    () => ["40%", "50%", "60%", "70%", "80%", "90%", "100%"],
    []
  );
  const modalRef = useRef<any>(null);
  const Colors = useThemeColors();

  useEffect(() => {
    if (open) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
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
      backgroundStyle={{
        backgroundColor: "transparent",
        borderRadius: 20,
        overflow: "hidden",
      }}
      index={3}
      enablePanDownToClose
      onDismiss={onDismiss}
      containerStyle={{
        padding: 10,
        borderRadius: 20,
        overflow: "hidden",
      }}
      backdropOpacity={0.5}
      handleIndicatorStyle={{ display: "none" }}
    >
      <View
        style={[
          styles.content,
          {
            backgroundColor: Colors.Boxbackground,
            marginHorizontal: 20,
            paddingTop: 20,
          },
          Shadow.dark,
        ]}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <AppText style={styles.message}>{message}</AppText>
        </View>

        <View style={{ flex: 1 }}>
          {type === "ok" && (
            <AppButton
              onPress={handleOk}
              text={okText}
              variant="silver"
              style={{ backgroundColor: "red", borderRadius: 20 }}
            />
          )}

          {type === "yesno" && (
            <>
              <View style={styles.row}>
                <AppButton
                  android_ripple={{
                    color: Colors.Boxbackground,
                    borderless: false,
                    radius: 200,
                  }}
                  onPress={handleYes}
                  text={yesText}
                />
                <AppButton
                  android_ripple={{
                    color: Colors.Boxbackground,
                    borderless: false,
                    radius: 200,
                  }}
                  variant="silver"
                  onPress={handleNo}
                  text={noText}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </CustomBottomSheetModal>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
    minHeight: screens.height * 0.27,
    borderRadius: 30,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26, // ✨ Matnga nafas beradi
    letterSpacing: 0.3, // ✨ Harflar orasini tiniq qiladi
  },

  row: {
    flex: 1,
    justifyContent: "flex-end",
    gap: 10,
  },
  yesBtn: {
    flex: 1,
  },
  noBtn: {
    flex: 1,
    backgroundColor: "#999",
  },
});
