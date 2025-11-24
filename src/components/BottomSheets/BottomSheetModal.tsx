import React, { ReactNode, useCallback, useMemo, forwardRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "@/theme/useThemeColors";

type Props = BottomSheetModalProps & {
  children: ReactNode;
  backdropAppearIndex?: number;
  backdropDisappearIndex?: number;
  backdropOpacity?: number;
  pressBehavior?: "close" | "collapse" | "none";
  insetsTopEnabled?: boolean;
};

const CustomBottomSheetModal = forwardRef<BottomSheetModalMethods, Props>(
  (
    {
      children,
      backdropAppearIndex = 0,
      backdropDisappearIndex = -1,
      backdropOpacity = 0.6,
      pressBehavior = "close",
      insetsTopEnabled,
      ...props
    },
    ref
  ) => {
    const Colors = useThemeColors();
    const renderBackDrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={backdropAppearIndex}
          disappearsOnIndex={backdropDisappearIndex}
          pressBehavior={pressBehavior}
          opacity={backdropOpacity}
        />
      ),
      [
        backdropAppearIndex,
        backdropDisappearIndex,
        pressBehavior,
        backdropOpacity,
      ]
    );

    const insetsTop = useSafeAreaInsets().top;

    return (
      <BottomSheetModal
        enableDynamicSizing={false}
        ref={ref}
        backdropComponent={renderBackDrop}
        backgroundStyle={{
          backgroundColor: Colors.pageBackground,
          borderRadius: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.textSecondary,
          borderRadius: 40,
        }}
        {...props}
      >
        {children}
      </BottomSheetModal>
    );
  }
);

export default CustomBottomSheetModal;
