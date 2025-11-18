import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const PickLocationHeader = memo(({ locationType, addPickup }: any) => {
  const Colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          // padding: 10,
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        {locationType === "pickup" ? (
          <>
            <AppText variant="semiBold" style={{ fontSize: 16 }}>
              {t("dropoff_locations")}
            </AppText>
          </>
        ) : (
          <>
            <AppText variant="semiBold" style={{ fontSize: 16 }}>
              {t("pickup_locations")}
            </AppText>
          </>
        )}
      </View>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", padding: 8 }}
        onPress={addPickup}
      >
        <AntDesign name="plus" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
});

export default PickLocationHeader;
