import React, { ReactNode } from "react";
import { View, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "@/components/Texts/Text";
import AppImage from "@/components/Image/Image";
import { useThemeColors } from "@/theme/useThemeColors";
import { IOrder, ILocations } from "@/types/order";
import { callPhone } from "@/utils/call-phone";
import { openMap } from "@/utils/open-map";
import { formatDate } from "@/utils/date-formater";
import { Shadow, Spacing } from "@/shared/token";
import { StyleOrderInfoList as styles } from "../style";
import { truckData } from "@/data/truck-data";
import { t } from "i18next";
import MapIcon from "@/assets/icon/map";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/theme/theme";

// ========================
// 🔹 OrderListInfo
// ========================
export const OrderListInfo = React.memo(
  ({
    label,
    value,
    icon,
    isLocation,
    onPress,
    isBorderBottomVisible = true,
  }: {
    label: string;
    value: any;
    icon?: ReactNode;
    isLocation?: boolean;
    onPress?: () => void;
    isBorderBottomVisible?: boolean;
  }) => {
    const Colors = useThemeColors();
    if (!value && value !== 0) return null;

    const content = (
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: Colors.primary08,
          borderless: false,
          radius: -0.5,
          foreground: true,
        }}
        style={[
          styles.infoRow,
          {
            borderColor: isLocation ? Colors.Boxbackground : Colors.borderColor,
            borderBottomWidth: isBorderBottomVisible ? 1 : 0,
            paddingHorizontal: 4,
            borderRadius: 2,
            overflow: "hidden",
          },
        ]}
      >
        <AppText style={[styles.label, { color: Colors.textSecondary }]}>
          {label}:
        </AppText>
        <View style={[styles.valueWrapper, { flex: 1 }]}>
          {icon}
          <AppText style={[styles.value, { color: Colors.textPrimary }]}>
            {value}
          </AppText>
        </View>
      </Pressable>
    );

    return content;
  }
);

// ========================
// 🔹 OrderListSection
// ========================
const OrderListSection = React.memo(
  ({ title, children }: { title: string; children: ReactNode }) => {
    const Colors = useThemeColors();

    return (
      <View
        style={[
          styles.section,
          {
            backgroundColor: Colors.Boxbackground,
          },
          Shadow.dark,
        ]}
      >
        <AppText
          variant="semiBold"
          style={[
            styles.sectionTitle,
            {
              color: Colors.textPrimary,
            },
          ]}
        >
          {title}
        </AppText>
        {children}
      </View>
    );
  }
);

// ========================
// 🔹 OrderListCargo
// ========================
export const OrderListCargo = React.memo(({ order }: { order: IOrder }) => {
  const { id, cargo, price, truck } = order;
  return (
    <OrderListSection title="Yuk">
      {id && <OrderListInfo label="Raqam" value={id} />}
      {cargo.type.value && (
        <OrderListInfo label="Yuk" value={cargo.type.value} />
      )}
      {cargo.weight?.value && (
        <OrderListInfo
          label="Og‘irligi"
          value={`${cargo.weight.value} ${cargo.weight.unit ?? ""}`}
        />
      )}
      {cargo.quantity?.value && (
        <OrderListInfo
          label="Miqdori"
          value={`${cargo.quantity.value} ${cargo.quantity.unit ?? ""}`}
        />
      )}
      {price.value && (
        <OrderListInfo
          label="Narx"
          value={`${price.value.toLocaleString()} ${price.currency ?? ""}`}
        />
      )}
      {truck && (
        <OrderListInfo
          label="Yuk mashina"
          value={t(truckData[truck].title)}
          isLocation
        />
      )}
    </OrderListSection>
  );
});

// ========================
// 🔹 OrderListOther
// ========================
export const OrderListOther = React.memo(
  ({ order }: { order: IOrder }) => {
    const { created, expected_arrival_time } = order.time;
    const comment = order.comment;

    return (
      <OrderListSection title="Qo'shimcha">
        {created && (
          <OrderListInfo label="Yaratilgan vaqt" value={formatDate(created)} />
        )}
        {expected_arrival_time && (
          <OrderListInfo
            label="Yetib borish vaqti"
            value={formatDate(expected_arrival_time)}
          />
        )}
        {comment && <OrderListInfo label="Izoh" value={comment} isLocation />}
      </OrderListSection>
    );
  },
  (prev, next) =>
    prev.order.time.created === next.order.time.created &&
    prev.order.time.expected_arrival_time ===
      next.order.time.expected_arrival_time &&
    prev.order.comment === next.order.comment
);

// ========================
// 🔹 OrderListCustomer
// ========================
export const OrderListCustomer = React.memo(
  ({
    order,
    title,
    isVisiblePhone,
  }: {
    order: IOrder;
    title: string;
    isVisiblePhone?: boolean;
  }) => {
    const owner = order.owner;
    return (
      <OrderListSection title={title}>
        {owner.name && <OrderListInfo label="Ismi" value={owner.name} />}
        {owner.phone && isVisiblePhone && (
          <OrderListInfo
            label="Telefon raqami"
            value={owner.phone}
            onPress={() => callPhone(owner.phone)}
          />
        )}
        <OrderListInfo label="Reyting" value={owner.rating.score} />
        <OrderListInfo label="Izohlar" value={owner.comment_count} isLocation />
      </OrderListSection>
    );
  }
);

// ========================
// 🔹 OrderListDriver
// ========================
export const OrderListDriver = React.memo(
  ({ order, title }: { order: IOrder; title: string }) => {
    const driver = order.driver;
    return (
      <OrderListSection title={title}>
        {driver.name && <OrderListInfo label="Ismi" value={driver.name} />}
        {driver.phone && (
          <OrderListInfo
            label="Telefon raqami"
            value={driver.phone}
            onPress={() => callPhone(driver.phone)}
          />
        )}
        <OrderListInfo label="Reyting" value={driver.rating.score} />
        <OrderListInfo
          label="Izohlar"
          value={driver.comment_count}
          isLocation
        />
        {driver.driver_coordinates?.latitude &&
          driver.driver_coordinates?.longitude && (
            <OrderListInfo
              label="Haydovchi joylashuvi"
              value="Xaritada ochish"
              isLocation
              onPress={() =>
                openMap(
                  driver.driver_coordinates.latitude,
                  driver.driver_coordinates.longitude
                )
              }
            />
          )}
      </OrderListSection>
    );
  }
);

// ========================
// 🔹 OrderListDriverCard
// ========================
const OrderListDriverCard = React.memo(
  ({ driver, handleDriverPress, onCall }: any) => {
    const Colors = useThemeColors();
    return (
      <Pressable
        onPress={() => handleDriverPress?.(driver)}
        style={[
          styles.driverCard,
          { backgroundColor: Colors.borderColor, elevation: 10 },
        ]}
      >
        <View style={styles.driverInfo}>
          {driver?.image ? (
            <AppImage source={driver.image} style={styles.driverPhoto} />
          ) : (
            <MaterialIcons
              name="account-circle"
              size={50}
              color={Colors.textSecondary}
            />
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: Spacing.horizontal / 2,
            }}
          >
            <AppText style={[styles.driverName, { color: Colors.textPrimary }]}>
              {driver?.name ?? "Noma'lum haydovchi"}
            </AppText>
            <AppText
              style={[styles.driverName, { color: Colors.textSecondary }]}
            >
              {driver?.phone ?? "Telefon raqam topilmadi"}
            </AppText>
          </View>
        </View>
      </Pressable>
    );
  }
);

// ========================
// 🔹 OrderListRequestDriver
// ========================
export const OrderListRequestDriver = React.memo(
  ({ drivers = [], handleDriverPress }: any) => {
    return (
      <OrderListSection
        title={
          drivers?.length > 0
            ? "So‘rov yuborgan haydovchilar"
            : "So‘rov yuborgan haydovchilar yo'q"
        }
      >
        {drivers?.length > 0 &&
          drivers.map((driver: any) => (
            <OrderListDriverCard
              handleDriverPress={handleDriverPress}
              key={driver?.id ?? Math.random()}
              driver={driver}
              onCall={() => callPhone(driver?.phoneNumber)}
            />
          ))}
      </OrderListSection>
    );
  }
);

// ========================
// 🔹 OrderListAddress
// ========================
export const OrderListAddress = React.memo(
  ({
    locations,
    isVisibleContact,
  }: {
    locations: ILocations;
    isVisibleContact: boolean;
  }) => {
    const Colors = useThemeColors();
    const pickups = locations?.pickup ?? [];
    const dropoffs = locations?.dropoff ?? [];

    const renderLocation = (item: any, type: "pickup" | "dropoff") => (
      <View
        key={`${type}-${item?.id ?? Math.random()}`}
        style={[styles.subBox, { backgroundColor: Colors.pageBackground }]}
      >
        {item?.full_title && (
          <OrderListInfo label="Manzil" value={item.full_title} isLocation />
        )}
        {item?.contact?.name && isVisibleContact && (
          <OrderListInfo label="Kontakt" value={item.contact.name} isLocation />
        )}
        {item?.contact?.phone && isVisibleContact && (
          <OrderListInfo
            label="Telefon"
            value={item.contact.phone}
            isLocation
            onPress={() => callPhone(item.contact.phone)}
          />
        )}
        {item?.coordinates?.latitude && item?.coordinates?.longitude && (
          <OrderListInfo
            label="Xaritada ochish"
            value={<MapIcon color={Colors.primary} size={22} />}
            isLocation
            isBorderBottomVisible={false}
            onPress={() =>
              openMap(item.coordinates.latitude, item.coordinates.longitude)
            }
          />
        )}
      </View>
    );

    return (
      <OrderListSection title="Manzillar">
        {pickups.map((p) => renderLocation(p, "pickup"))}
        {dropoffs.map((d) => renderLocation(d, "dropoff"))}
      </OrderListSection>
    );
  }
);
