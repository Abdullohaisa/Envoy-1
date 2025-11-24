import SwipeButton from "@/components/Buttons/SwipeButton";
import { Spacing, screens } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { StyleSheet, View } from "react-native";

const DriverOrderButton = ({
  warningVisible,
  changeDriverStatus,
  loading,
  allDeparted,
}: {
  warningVisible: boolean;
  loading: boolean;
  allDeparted: boolean;
  changeDriverStatus: () => void;
}) => {
  const Colors = useThemeColors();

  if (allDeparted) return;
  return (
    <View
      pointerEvents={warningVisible ? "none" : "auto"}
      style={[
        styles.bottomContainer,
        {
          backgroundColor: Colors.Boxbackground,
          opacity: warningVisible ? 0.1 : 1,
        },
      ]}
    >
      <SwipeButton
        onConfirm={changeDriverStatus}
        isLoading={loading}
        disabled={loading}
        title="Yo'lga chiqish"
      />
    </View>
  );
};

export default DriverOrderButton;

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: screens.height * 0.09,
    width: screens.width,
    padding: Spacing.horizontal,
  },
});
