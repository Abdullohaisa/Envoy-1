import AppText from "@/components/Texts/Text";
import { IThemeColors } from "@/theme/colors.interface";
import { themeAtom } from "@/theme/theme";
import { safeNavigate } from "@/utils/safe-navigation";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import { Pressable, StyleSheet, View } from "react-native";

const MapActionButtons = ({
  Colors,
  order,
}: {
  Colors: IThemeColors;
  order: any;
}) => {
  const theme = useAtomValue(themeAtom);
  const inOrder = () => {
    safeNavigate(() =>
      router.push({
        pathname: "(app)/driver/orders/" + order.id,
        params: { order_id: JSON.stringify(order.id) },
      })
    );
  };
  return (
    <View style={styles.actionRow}>
      <Pressable
        style={[styles.buttonPrimary, { backgroundColor: Colors.primary }]}
      >
        <AppText variant="semiBold" style={styles.buttonText}>
          So‘rov yuborish
        </AppText>
      </Pressable>
      <Pressable
        onPress={inOrder}
        style={[
          styles.buttonSecondary,
          { backgroundColor: Colors.borderColor + "77" },
        ]}
      >
        <AppText style={styles.buttonSecondaryText}>Tafsilotlari</AppText>
      </Pressable>
    </View>
  );
};

export default MapActionButtons;

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  buttonPrimary: {
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonSecondary: {
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: { fontSize: 16, color: "#fff" },
  buttonSecondaryText: { fontSize: 16 },
});
