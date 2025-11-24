import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppText from "@/components/Texts/Text";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { mask } from "react-native-mask-text";
import { callPhone } from "@/utils/call-phone";
import { useThemeColors } from "@/theme/useThemeColors";
import { DRIVER_ORDER, Spacing } from "@/shared/token";
import FlagsIcon from "@/assets/icon/flags";
import OilIcon from "@/assets/icon/oil";
import NavigationIcon from "@/assets/icon/navigation";
import { useAtomValue } from "jotai";
import { driverOrdersAtom } from "@/service/driver/driver-orders/controller";
import { formatDate, formatTimeDiff } from "@/utils/date-formater";
import { openMap } from "@/utils/open-map";

const DriverOrderAddressItem = ({
  loc,
  index,
  type, // "pickup" yoki "dropoff"
  lastIndex,
  times,
}: {
  loc: any;
  index: number;
  type: "pickup" | "dropoff";
  lastIndex: number;
  times: any;
}) => {
  const Colors = useThemeColors();
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const { accepted: order } = useAtomValue(driverOrdersAtom);
  // Manzil holatini olish
  const driverStatus = order.status.driver_status[type][index];
  let statusText = "";
  let statusColor = Colors.Boxbackground; // default fon
  let iconColor = Colors.textSecondary,
    iconBack = Colors.borderColor;
  const departed = driverStatus.departed && !driverStatus.arrived;
  const arrived = driverStatus.arrived;
  const [isSheetOpen, setIssheetOpen] = useState(false);

  if (departed) {
    statusText = "Yo‘lga chiqdingiz";
    statusColor = Colors.borderColor;
    iconBack = Colors.Boxbackground;
  } else if (arrived) {
    statusText = "Yakunlandi";
    iconColor = Colors.textSecondary;
    iconBack = Colors.borderColor;
  }
  const yurilgan_vaqt = formatTimeDiff(
    times[index]?.departed,
    times[index]?.arrived
  );

  useEffect(() => {
    const isBackPress = () => {
      if (isSheetOpen && sheetRef?.current) {
        sheetRef?.current.dismiss();
        setIssheetOpen(false);
        return true;
      }
      // BackHandler.exitApp();
      return false;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      isBackPress
    );

    return () => subscription.remove();
  }, [isSheetOpen]);

  return (
    <Pressable
      android_ripple={{
        color: Colors.primary + "44",
        borderless: false,
        radius: -0.5,
        foreground: !departed ? true : false,
      }}
      onPress={() => {
        !departed && sheetRef.current?.present();
      }}
      style={[
        styles.addressBlock,
        {
          borderColor: Colors.borderColor,
          paddingVertical: 12,
          justifyContent: "center",
          borderTopWidth: 1,
          overflow: "hidden",
        },
      ]}
    >
      <LocationTitle
        type={type}
        index={index}
        lastIndex={lastIndex}
        iconBack={iconBack}
        iconColor={iconColor}
        loc={loc}
      />

      {statusText.length !== 0 && (
        <AppText
          style={{
            marginTop: 6,
            fontSize: 13,
            color:
              statusText === "Yo‘lga chiqdingiz"
                ? Colors.yellow
                : statusText === "Yakunlandi"
                  ? Colors.green
                  : Colors.textSecondary,
          }}
        >
          {statusText}
        </AppText>
      )}

      {departed && (
        <View>
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 1,
              borderColor: Colors.Boxbackground,
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              <AppText
                style={{
                  fontSize: 12,
                  color: Colors.textSecondary,
                  marginBottom: 6,
                  letterSpacing: 0.2,
                }}
              >
                Kutib oluvchi:
              </AppText>

              <AppText
                variant="semiBold"
                style={{
                  fontSize: 15,
                  color: Colors.textPrimary,
                }}
              >
                {loc.contact.name}
              </AppText>

              <AppText
                style={{
                  fontSize: 13,
                  color: Colors.textPrimary,
                }}
              >
                {mask(loc.contact.phone, "+999 99 999-99-99")}
              </AppText>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Pressable
                android_ripple={{
                  color: Colors.green,
                  borderless: false,
                  radius: -0.5,
                  foreground: true,
                }}
                onPress={() => callPhone(loc.contact.phone)}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: Colors.green02,
                  },
                ]}
              >
                <FontAwesome5 name="phone-alt" size={22} color="#fff" />
              </Pressable>
              <Pressable
                onPress={() =>
                  openMap(loc.coordinates.latitude, loc.coordinates.longitude)
                }
                android_ripple={{
                  color: Colors.primary,
                  borderless: false,
                  radius: -0.5,
                  foreground: true,
                }}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: Colors.primary02,
                  },
                ]}
              >
                <NavigationIcon
                  size={40}
                  color={Colors.primary}
                  secondaryColor={Colors.primary04}
                />
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <CustomBottomSheetModal
        ref={sheetRef}
        snapPoints={["50%"]}
        backgroundStyle={{ backgroundColor: Colors.Boxbackground }}
        onChange={(index) => {
          if (index === -1) setIssheetOpen(false);
          else setIssheetOpen(true);
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <LocationTitle
            type={type}
            index={index}
            lastIndex={lastIndex}
            iconBack={iconBack}
            iconColor={iconColor}
            loc={loc}
          />

          {times[index]?.departed && (
            <View
              style={{
                borderColor: Colors.borderColor,
                borderTopWidth: 1,
                marginTop: Spacing.horizontal,
                paddingTop: Spacing.horizontal,
                gap: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppText style={{ color: Colors.textSecondary }}>
                  Yo'lga chiqish vaqti:{" "}
                </AppText>
                <AppText style={{ color: Colors.textPrimary }}>
                  {formatDate(times[index]?.departed || "")}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppText style={{ color: Colors.textSecondary }}>
                  Yetib borish vaqt:{" "}
                </AppText>
                <AppText style={{ color: Colors.textPrimary }}>
                  {formatDate(times[index]?.arrived || "")}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppText style={{ color: Colors.textSecondary }}>
                  Yurilgan vaqt:{" "}
                </AppText>
                <AppText style={{ color: Colors.textPrimary }}>
                  {yurilgan_vaqt}
                </AppText>
              </View>
            </View>
          )}

          <View>
            <View
              style={{
                marginTop: 10,
                borderTopWidth: 1,
                borderColor: Colors.borderColor,
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <View>
                <AppText
                  style={{
                    fontSize: 12,
                    color: Colors.textSecondary,
                    marginBottom: 6,
                    letterSpacing: 0.2,
                  }}
                >
                  Kutib oluvchi:
                </AppText>

                <AppText
                  variant="semiBold"
                  style={{
                    fontSize: 15,
                    color: Colors.textPrimary,
                  }}
                >
                  {loc.contact.name}
                </AppText>

                <AppText
                  style={{
                    fontSize: 13,
                    color: Colors.textPrimary,
                  }}
                >
                  {mask(loc.contact.phone, "+999 99 999-99-99")}
                </AppText>
              </View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Pressable
                  android_ripple={{
                    color: Colors.green,
                    borderless: false,
                    radius: -0.5,
                    foreground: true,
                  }}
                  onPress={() => callPhone(loc.contact.phone)}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: Colors.green02,
                    },
                  ]}
                >
                  <FontAwesome5 name="phone-alt" size={22} color="#fff" />
                </Pressable>
                <Pressable
                  onPress={() =>
                    openMap(loc.coordinates.latitude, loc.coordinates.longitude)
                  }
                  android_ripple={{
                    color: Colors.primary,
                    borderless: false,
                    radius: -0.5,
                    foreground: true,
                  }}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: Colors.primary02,
                    },
                  ]}
                >
                  <NavigationIcon
                    size={40}
                    color={Colors.primary}
                    secondaryColor={Colors.primary04}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </CustomBottomSheetModal>
    </Pressable>
  );
};

export default DriverOrderAddressItem;

const LocationTitle = ({
  type,
  index,
  iconBack,
  iconColor,
  lastIndex,
  loc,
}: {
  type: string;
  iconBack: string;
  iconColor: string;
  lastIndex: number;
  index: number;
  loc: any;
}) => {
  const Colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        gap: Spacing.horizontal,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: iconBack,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {type !== "dropoff" &&
          (index === 0 ? (
            <OilIcon size={20} color={iconColor} />
          ) : (
            <AppText style={{ color: iconColor }}>{index + 1}</AppText>
          ))}
        {type !== "pickup" &&
          (index === lastIndex ? (
            <FlagsIcon size={12} color={iconColor} />
          ) : (
            <AppText style={{ color: iconColor }}>{index + 1}</AppText>
          ))}
      </View>

      <AppText
        variant="medium"
        style={[
          styles.addressTitle,
          { color: Colors.textPrimary, width: "100%" },
        ]}
      >
        {loc.full_title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  addressBlock: {
    paddingHorizontal: Spacing.horizontal,
  },
  addressTitle: { fontSize: 15 },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
