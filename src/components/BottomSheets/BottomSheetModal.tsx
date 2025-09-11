import { ReactNode, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useThemeColors } from "@/theme/useThemeColors";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

interface CustomBottomSheetProps {
  children: ReactNode;
  ref: React.RefObject<BottomSheetModalMethods | null>;

  // Customizable props
  snapPointsProp?: (string | number)[];
  index?: number;
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  touchBackground?: boolean;

  // Backdrop customization
  backdropAppearIndex?: number;
  backdropDisappearIndex?: number;
  backdropOpacity?: number;
  pressBehavior?: "close" | "collapse" | "none";

  // Styles
  backgroundStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;

  // Gestures
  enableContentPanningGesture?: boolean;

  // Events
  onDismiss?: () => void;
}

export default function CustomBottomSheetModal({
  children,
  ref,
  snapPointsProp = ["50%", "100%"],
  index = 0,
  enablePanDownToClose = true,
  enableDynamicSizing = false,
  touchBackground = false,

  backdropAppearIndex = 0,
  backdropDisappearIndex = -1,
  backdropOpacity = 0.6,
  pressBehavior = "close",

  backgroundStyle,
  indicatorStyle,
  containerStyle,

  enableContentPanningGesture = true,

  onDismiss,
}: CustomBottomSheetProps) {
  const insetsTop = useSafeAreaInsets().top;
  const Colors = useThemeColors();
  const theme = useAtomValue(themeAtom);

  const [finalBackgroundStyle, finalIndicatorStyle] = useMemo(() => {
    return [
      StyleSheet.flatten(backgroundStyle) || [
        styles.backgroundStyle,
        {
          backgroundColor:
            theme === "dark" ? Colors.Boxbackground : Colors.pageBackground,
        },
      ],
      StyleSheet.flatten(indicatorStyle) || [
        styles.indicatorStyle,
        { backgroundColor: Colors.borderColor },
      ],
    ];
  }, [backgroundStyle, indicatorStyle]);

  const renderBackDrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={backdropAppearIndex}
        disappearsOnIndex={backdropDisappearIndex}
        pressBehavior={pressBehavior}
        opacity={backdropOpacity}
        enableTouchThrough={touchBackground}
        enableContentPanningGesture={enableContentPanningGesture}
      />
    ),
    [
      backdropAppearIndex,
      backdropDisappearIndex,
      pressBehavior,
      backdropOpacity,
      touchBackground,
      enableContentPanningGesture,
    ]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPointsProp}
      index={index}
      enableDynamicSizing={enableDynamicSizing}
      style={[{ zIndex: 5, marginTop: insetsTop + 5 }, containerStyle]}
      backdropComponent={renderBackDrop}
      enablePanDownToClose={enablePanDownToClose}
      handleIndicatorStyle={finalIndicatorStyle}
      backgroundStyle={finalBackgroundStyle}
      onDismiss={onDismiss}
    >
      {children}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    borderRadius: 30,
  },
  indicatorStyle: {
    width: 30,
    height: 3,
  },
});
