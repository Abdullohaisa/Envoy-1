import { Alert, Linking, Pressable, View } from "react-native";
import { StyleOrderInfoList as styles } from "../style";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../../Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { callPhone } from "@/utils/call-phone";
import { Spacing } from "@/shared/token";
import Feather from "@expo/vector-icons/Feather";

// 🗺️ Xarita ochish
// const openMap = async (lat?: number, lng?: number) => {
//   if (!lat || !lng) {
//     return Alert.alert("❗ Xatolik", "Manzil koordinatalari topilmadi");
//   }

//   const yandexApp = `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=12`;
//   const googleApp = `comgooglemaps://?q=${lat},${lng}&zoom=14`;
//   const gisApp = `dgis://2gis.ru/routeSearch/rsType/car/to/${lng},${lat}`;
//   const googleWeb = `https://www.google.com/maps?q=${lat},${lng}`;

//   try {
//     if (await Linking.canOpenURL(yandexApp)) return Linking.openURL(yandexApp);
//     if (await Linking.canOpenURL(googleApp)) return Linking.openURL(googleApp);
//     if (await Linking.canOpenURL(gisApp)) return Linking.openURL(gisApp);
//     return Linking.openURL(googleWeb);
//   } catch {
//     Alert.alert(
//       "❗ Xarita ochib bo‘lmadi",
//       "Iltimos, Google Maps, Yandex Maps yoki 2GIS ilovalaridan birini o‘rnating."
//     );
//   }
// };

const openMap = async (lat?: number, lng?: number) => {
  if (!lat || !lng) {
    return Alert.alert("❗ Xatolik", "Manzil koordinatalari topilmadi");
  }

  const yandexUrl = `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=16`;
  // z=16 → zoom darajasi, kerak bo‘lsa o‘zgartiring

  // Platformga qarab ochish
  try {
    const supported = await Linking.canOpenURL(yandexUrl);
    if (supported) {
      await Linking.openURL(yandexUrl);
    } else {
      // Agar Yandex Maps ilovasi o‘rnatilmagan bo‘lsa, web orqali ochiladi
      const webUrl = `https://yandex.ru/maps/?pt=${lng},${lat}&z=16`;
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    Alert.alert("❗ Xatolik", "Xaritani ochishda muammo yuz berdi");
  }
};

// 🧱 Yuk ma’lumotlari
export const OrderListCargo = ({ order }: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection title="Yuk" Colors={Colors}>
      {order?.cargo?.type?.value && (
        <OrderListInfo
          Colors={Colors}
          label="Yuk"
          value={order.cargo.type.value}
        />
      )}
      {order?.cargo?.weight?.value && (
        <OrderListInfo
          Colors={Colors}
          label="Og‘irligi"
          value={`${order.cargo.weight.value} ${order.cargo.weight.unit ?? ""}`}
        />
      )}
      {order?.cargo?.quantity?.value && (
        <OrderListInfo
          Colors={Colors}
          label="Miqdori"
          value={`${order.cargo.quantity.value} ${order.cargo.quantity.unit ?? ""}`}
        />
      )}
      {order?.price?.value && (
        <OrderListInfo
          Colors={Colors}
          label="Narx"
          value={`${order.price.value.toLocaleString?.()} ${order.price.currency ?? ""}`}
        />
      )}
      {order?.comment && (
        <OrderListInfo Colors={Colors} label="Izoh" value={order.comment} />
      )}
      {order?.truck && (
        <OrderListInfo
          isLocation
          Colors={Colors}
          label="Yuk mashina"
          value={order.truck.toString()}
        />
      )}
    </OrderListSection>
  );
};

export const OrderListUser = ({ order, title }: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection title={title}>
      {order?.driver?.name && (
        <OrderListInfo label="Ismi" value={order?.driver?.name} />
      )}
      {order?.driver?.phone_number && (
        <Pressable onPress={() => callPhone(order?.driver?.phone_number)}>
          <OrderListInfo
            label="Telefon raqami"
            value={order?.driver?.phone_number}
          />
        </Pressable>
      )}
      {order?.driver?.rating.score && (
        <OrderListInfo label="Reyting" value={order?.driver?.rating.score} />
      )}
      {order?.driver?.comment_count && (
        <OrderListInfo label="Izohlar" value={order?.driver?.comment_count} />
      )}
      {order.driver?.driver_coordinates?.latitude &&
        order.driver?.driver_coordinates?.longitude && (
          <Pressable
            onPress={() =>
              openMap(
                order.driver.driver_coordinates.latitude,
                order.driver.driver_coordinates.longitude
              )
            }
          >
            <View style={styles.mapRow}>
              <MaterialIcons
                name="location-pin"
                size={18}
                color={Colors.primary}
              />
              <AppText style={[styles.mapLink, { color: Colors.primary }]}>
                Haydovchingiz joylashuvi
              </AppText>
            </View>
          </Pressable>
        )}
    </OrderListSection>
  );
};

// 🚗 Haydovchilar ro‘yxati
export const OrderListRequestDriver = ({
  drivers = [],
  handleDriverPress,
}: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection
      title={
        drivers?.length > 0
          ? "So‘rov yuborgan haydovchilar"
          : "So‘rov yuborgan haydovchilar yo'q"
      }
      Colors={Colors}
    >
      {drivers?.length > 0 &&
        drivers.map((driver: any) => (
          <OrderListDriverCard
            handleDriverPress={handleDriverPress}
            key={driver?.id ?? Math.random()}
            driver={driver}
            Colors={Colors}
            onCall={() => callPhone(driver?.phoneNumber)}
          />
        ))}
    </OrderListSection>
  );
};

// 📍 Manzillar
export const OrderListAddress = ({ locations }: any) => {
  const Colors = useThemeColors();
  const pickups = locations?.pickup ?? [];
  const dropoffs = locations?.dropoff ?? [];

  return (
    <OrderListSection title="Manzillar">
      <View
        style={{
          marginLeft: Spacing.horizontal,
          marginTop: Spacing.horizontal,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Feather name="upload" size={16} color={Colors.textSecondary} />
        <AppText>Ortish manzillari</AppText>
      </View>
      {pickups.map((item: any) => (
        <View
          key={`pickup-${item?.id ?? Math.random()}`}
          style={[styles.subBox, { backgroundColor: Colors.borderColor }]}
        >
          {item?.short_title && (
            <OrderListInfo
              Colors={Colors}
              label="Manzil"
              value={item.full_title}
              isLocation
            />
          )}
          {item?.contact?.name && (
            <OrderListInfo
              Colors={Colors}
              label="Kutib oluvchi"
              value={item.contact.name}
              isLocation
            />
          )}
          {item?.contact?.phone && (
            <Pressable onPress={() => callPhone(item.contact.phone)}>
              <OrderListInfo
                Colors={Colors}
                label="Telefon"
                value={item.contact.phone}
                isLocation
              />
            </Pressable>
          )}
          {item?.coordinates?.latitude && item?.coordinates?.longitude && (
            <Pressable
              onPress={() =>
                openMap(item.coordinates.latitude, item.coordinates.longitude)
              }
            >
              <View style={styles.mapRow}>
                <MaterialIcons
                  name="location-pin"
                  size={18}
                  color={Colors.primary}
                />
                <AppText style={[styles.mapLink, { color: Colors.primary }]}>
                  Xaritada ochish
                </AppText>
              </View>
            </Pressable>
          )}
        </View>
      ))}
      <View
        style={{
          marginLeft: Spacing.horizontal,
          marginTop: Spacing.horizontal,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Feather name="download" size={16} color={Colors.textSecondary} />
        <AppText>Tushirish manzillari</AppText>
      </View>
      {dropoffs.map((item: any) => (
        <View
          key={`dropoff-${item?.id ?? Math.random()}`}
          style={[styles.subBox, { backgroundColor: Colors.borderColor }]}
        >
          {item?.short_title && (
            <OrderListInfo
              Colors={Colors}
              label="Manzil"
              value={item.full_title}
              isLocation
            />
          )}
          {item?.contact?.name && (
            <OrderListInfo
              Colors={Colors}
              label="Aloqa"
              value={item.contact.name}
              isLocation
            />
          )}
          {item?.contact?.phone && (
            <Pressable onPress={() => callPhone(item.contact.phone)}>
              <OrderListInfo
                Colors={Colors}
                label="Telefon"
                value={item.contact.phone}
                isLocation
              />
            </Pressable>
          )}
          {item?.coordinates?.latitude && item?.coordinates?.longitude && (
            <Pressable
              onPress={() =>
                openMap(item.coordinates.latitude, item.coordinates.longitude)
              }
            >
              <View style={styles.mapRow}>
                <MaterialIcons
                  name="location-pin"
                  size={18}
                  color={Colors.primary}
                />
                <AppText style={[styles.mapLink, { color: Colors.primary }]}>
                  Xaritada ochish
                </AppText>
              </View>
            </Pressable>
          )}
        </View>
      ))}
    </OrderListSection>
  );
};

// 👤 Haydovchi kartasi
const OrderListDriverCard = ({ driver, handleDriverPress, onCall }: any) => {
  const Colors = useThemeColors();
  return (
    <Pressable
      onPress={() => handleDriverPress?.(driver)}
      style={[
        styles.driverCard,
        {
          backgroundColor: Colors.borderColor,
          elevation: 10,
        },
      ]}
    >
      <View style={styles.driverInfo}>
        {driver?.image ? (
          <Image source={{ uri: driver.image }} style={styles.driverPhoto} />
        ) : (
          <MaterialIcons
            name="account-circle"
            size={50}
            color={Colors.textSecondary}
          />
        )}
        <View style={{ flex: 1 }}>
          <AppText style={[styles.driverName, { color: Colors.textPrimary }]}>
            {driver?.name ?? "Noma'lum haydovchi"}
          </AppText>
        </View>
        {driver?.phoneNumber && (
          <Pressable onPress={onCall}>
            <MaterialIcons name="call" size={22} color={Colors.primary} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

// 🔹 Info satri
export const OrderListInfo = ({ label, value, icon, isLocation }: any) => {
  const Colors = useThemeColors();
  if (!value) return null;
  return (
    <View
      style={[
        styles.infoRow,
        {
          borderColor: isLocation ? Colors.Boxbackground : Colors.borderColor,
          paddingHorizontal: 4,
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
    </View>
  );
};

// 🔹 Sektsiya
const OrderListSection = ({ title, children }: any) => {
  const Colors = useThemeColors();
  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: Colors.Boxbackground,
        },
      ]}
    >
      <AppText
        variant="semiBold"
        style={[styles.sectionTitle, { color: Colors.textPrimary }]}
      >
        {title}
      </AppText>
      {children}
    </View>
  );
};
