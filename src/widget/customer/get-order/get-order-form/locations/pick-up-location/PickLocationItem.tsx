import UserIcon from "@/assets/icon/user";
import AppText from "@/components/Texts/Text";
import { IThemeColors } from "@/theme/colors.interface";
import { RefObject, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { locationStyles as styles } from "../location-picker/style";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PickLocationItem = memo(
  ({
    location,
    index,
    locationType,
    Colors,
    openSheet,
    removePickup,
  }: {
    location: any;
    index: number;
    locationType: any;
    Colors: IThemeColors;
    openSheet: any;
    removePickup: any;
    openMap: any;
    sheetRef: RefObject<BottomSheetModalMethods | null>;
  }) => {
    const { t } = useTranslation();
    const sheetRef = useRef<BottomSheetModalMethods>(null);
    const insets = useSafeAreaInsets();

    return (
      <TouchableOpacity
        onPress={() => openSheet(index)}
        key={index}
        style={[
          styles.locationItem,
          {
            borderTopWidth: 1,
            borderColor: Colors.borderColor,
            borderRadius: 10,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => sheetRef.current?.present()}
            >
              <UserIcon size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity
              style={{
                marginTop: 5,
                backgroundColor: Colors.borderColor,
                padding: 8,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.borderColor,
              }}
              onPress={() => openSheet(index)} // bosganda sheet ochiladi
            >
              <AppText style={{ color: Colors.textSecondary }}>
                Kim kutib oladi ?
              </AppText>
    
              {location?.contact?.name && (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Ionicons
                    name="person-circle"
                    size={20}
                    color={Colors.textSecondary}
                  />
                  <AppText style={{ color: Colors.textPrimary, fontSize: 14 }}>
                    {location?.contact?.name || "Ism"}
                  </AppText>
                </View>
              )}
    
              {location?.contact?.phone && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  <Ionicons name="call" size={18} color={Colors.textSecondary} />
                  <AppText style={{ color: Colors.textPrimary, fontSize: 13 }}>
                    {location?.contact?.phone || "Telefon raqam"}
                  </AppText>
                </View>
              )}
            </TouchableOpacity> */}

        {/* <ContactSheetContent
              location={location}
              locationType={locationType}
              index={index}
              contactSheetRef={sheetRef}
            /> */}
      </TouchableOpacity>
    );
  }
);
