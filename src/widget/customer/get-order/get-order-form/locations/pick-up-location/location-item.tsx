import UserIcon from "@/assets/icon/user";
import AppText from "@/components/Texts/Text";
import { IThemeColors } from "@/theme/colors.interface";
import { RefObject, memo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { locationStyles as styles } from "../location-picker/style";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Spacing } from "@/shared/token";

const PickLocationItem = memo(
  ({
    location,
    index,
    locationType,
    Colors,
    openSheet,
    removePickup,
    contactSheetRef,
    openContact,
  }: {
    location: any;
    index: number;
    locationType: any;
    Colors: IThemeColors;
    openSheet: any;
    removePickup: any;
    contactSheetRef: RefObject<BottomSheetModalMethods | null>;
    openContact: (index: number) => void;
  }) => {
    const { t } = useTranslation();

    return (
      <View
        key={index}
        style={[
          styles.locationItem,
          {
            borderTopWidth: 1,
            borderColor: Colors.borderColor,
            backgroundColor:
              index % 2 !== 0 ? Colors.borderColor : Colors.Boxbackground,
          },
        ]}
      >
        <Pressable
          android_ripple={{
            color: Colors.primary08,
            borderless: false,
            radius: -0.5,
            foreground: true,
          }}
          onPress={() => openSheet(index)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: Spacing.horizontal,
            paddingVertical: Spacing.horizontal,
          }}
        >
          <View style={styles.locationButton}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: Colors.pageBackground,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppText variant="semiBold">{index + 1}</AppText>
            </View>
            <AppText
              style={{
                color: location.full_title
                  ? Colors.textPrimary
                  : Colors.textSecondary,
                fontSize: 15,
              }}
            >
              {location.full_title
                ? location.full_title
                : locationType === "pickup"
                  ? t("from")
                  : t("to")}
            </AppText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {index !== 0 && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => removePickup(index)}
              >
                <AntDesign name="close" size={18} color="red" />
              </TouchableOpacity>
            )}
          </View>
        </Pressable>

        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor:
              index % 2 === 0 ? Colors.borderColor : Colors.Boxbackground,
          }}
        />

        <Pressable
          android_ripple={{
            color: Colors.primary,
            borderless: false,
            radius: -0.5,
            foreground: true,
          }}
          onPress={() => openContact(index)}
          style={{
            paddingVertical: Spacing.horizontal,
            paddingHorizontal: Spacing.horizontal,
            flexDirection: "row",
            gap: 5,
            borderRadius: 10,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <AppText style={{ color: Colors.primary }}>
            {!location?.contact?.name ? "Kim kutib oladi" : "Kutib oluvchi:"}
          </AppText>

          <View
            style={{ flexDirection: "column", alignItems: "flex-end", gap: 5 }}
          >
            {location?.contact?.name && (
              <AppText
                style={{
                  color: Colors.textSecondary,
                  fontSize: 14,
                }}
              >
                {location?.contact?.name || "Ism"}
              </AppText>
            )}

            {location?.contact?.phone && (
              <AppText style={{ color: Colors.textSecondary, fontSize: 12 }}>
                {location?.contact?.phone || "Telefon raqam"}
              </AppText>
            )}
          </View>
        </Pressable>
      </View>
    );
  }
);

export default PickLocationItem;
