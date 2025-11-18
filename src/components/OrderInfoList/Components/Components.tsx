import { Alert, Linking, Pressable, StyleSheet, View } from "react-native";
import { StyleOrderInfoList as styles } from "../style";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../../Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { callPhone } from "@/utils/call-phone";
import { Shadow, Spacing } from "@/shared/token";
import Feather from "@expo/vector-icons/Feather";
import { formatDate } from "@/utils/date-formater";
import { useState } from "react";
import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import SheetModal from "@/components/Modal/SheetModal";
import AppButton from "@/components/Buttons/Button";
import RatingStars from "@/components/RatingStars";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const openMap = async (lat?: number, lng?: number) => {
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

export const OrderListCargo = ({ order }: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection title="Yuk" Colors={Colors}>
      {order?.id && (
        <OrderListInfo Colors={Colors} label="Raqam" value={order.id} />
      )}
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

export const OrderListOther = ({ order }: any) => {
  const Colors = useThemeColors();

  console.log(order);

  return (
    <OrderListSection title="Qo'shimcha" Colors={Colors}>
      {order?.time.created && (
        <OrderListInfo
          Colors={Colors}
          label="Yaratilgan vaqt"
          value={formatDate(order?.time.created)}
        />
      )}
      {order?.time.expected_arrival_time && (
        <OrderListInfo
          Colors={Colors}
          label="Yetib borish vaqti"
          value={formatDate(order?.time.expected_arrival_time)}
        />
      )}
      {order?.comment && (
        <OrderListInfo
          Colors={Colors}
          label="Izoh"
          value={order.comment}
          isLocation
        />
      )}
    </OrderListSection>
  );
};

export const OrderListDriver = ({ order, title }: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection title={title}>
      {order?.driver?.name && (
        <OrderListInfo label="Ismi" value={order?.driver?.name} />
      )}
      {order?.driver?.phone && (
        <Pressable onPress={() => callPhone(order?.driver?.phone)}>
          <OrderListInfo label="Telefon raqami" value={order?.driver?.phone} />
        </Pressable>
      )}
      <OrderListInfo label="Reyting" value={order?.driver?.rating?.score} />

      <OrderListInfo
        isLocation
        label="Izohlar"
        value={order?.driver?.comment_count}
      />

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

export const OrderListCustomer = ({ order, title }: any) => {
  const Colors = useThemeColors();

  return (
    <OrderListSection title={title}>
      {order?.owner?.name && (
        <OrderListInfo label="Ismi" value={order?.owner?.name} />
      )}
      {order?.owner?.phone && (
        <Pressable onPress={() => callPhone(order?.driver?.phone)}>
          <OrderListInfo label="Telefon raqami" value={order?.owner?.phone} />
        </Pressable>
      )}
      <OrderListInfo label="Reyting" value={order?.owner?.rating?.score} />
      <OrderListInfo
        isLocation9
        label="Izohlar"
        value={order?.owner?.comment_count}
      />
    </OrderListSection>
  );
};

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
          style={[styles.subBox, { backgroundColor: Colors.pageBackground }]}
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
          style={[styles.subBox, { backgroundColor: Colors.pageBackground }]}
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
          <AppText style={[styles.driverName, { color: Colors.textSecondary }]}>
            {driver?.phone ?? "Telefon raqam topilmadi"}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
};

export const OrderListInfo = ({ label, value, icon, isLocation }: any) => {
  const Colors = useThemeColors();
  if (!value && value !== 0) return null;
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

const OrderListSection = ({ title, children }: any) => {
  const Colors = useThemeColors();
  return (
    <View
      style={[
        styles.section,
        {
          backgroundColor: Colors.Boxbackground,
        },
        Shadow.medium,
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

const DriverChooseModal = ({ modalRef, driver, handleSelectDriver }: any) => {
  const Colors = useThemeColors();
  const [modal, setModal] = useState(false);

  return (
    <CustomBottomSheetModal
      ref={modalRef}
      snapPoints={["55%"]}
      backdropOpacity={0.6}
      backgroundStyle={{ backgroundColor: Colors.Boxbackground }}
    >
      <BottomSheetScrollView style={driverChooseModalStyles.sheetScroll}>
        {driver && (
          <View style={driverChooseModalStyles.modalContent}>
            <View
              style={[
                driverChooseModalStyles.driverCard,
                { backgroundColor: Colors.borderColor },
              ]}
            >
              <View style={driverChooseModalStyles.modalImage}>
                {driver.image ? (
                  <Image
                    source={{ uri: driver.image }}
                    style={driverChooseModalStyles.driverImage}
                  />
                ) : (
                  <MaterialIcons
                    name="account-circle"
                    size={80}
                    color={Colors.textSecondary}
                  />
                )}
              </View>
              <View style={driverChooseModalStyles.driverInfo}>
                <AppText
                  style={[
                    driverChooseModalStyles.modalName,
                    { color: Colors.textPrimary },
                  ]}
                >
                  {driver.name}
                </AppText>
                <AppText
                  style={[
                    driverChooseModalStyles.modalPhone,
                    { color: Colors.textSecondary },
                  ]}
                >
                  {driver.phone}
                </AppText>
              </View>
            </View>

            <View
              style={[
                driverChooseModalStyles.infoCard,
                { backgroundColor: Colors.borderColor },
              ]}
            >
              <View style={driverChooseModalStyles.ratingLeft}>
                <AppText>Reyting</AppText>
                <View style={driverChooseModalStyles.ratingFriends}>
                  <FontAwesome5 name="user-friends" size={14} color="silver" />
                  <AppText style={driverChooseModalStyles.modalRating}>
                    {driver.rating.count}
                  </AppText>
                </View>
              </View>
              <View style={driverChooseModalStyles.ratingRight}>
                <AppText style={driverChooseModalStyles.modalRating}>
                  {driver.rating.score}
                </AppText>
                <RatingStars rating={driver.rating.score} />
              </View>
            </View>

            {/* === COMMENTS CARD === */}
            <View
              style={[
                driverChooseModalStyles.infoCard,
                { backgroundColor: Colors.borderColor },
              ]}
            >
              <AppText>Boshqa Mijozlar fikri</AppText>
              <AppText style={driverChooseModalStyles.modalRating}>
                {driver.comments_count}
              </AppText>
            </View>

            {/* === BUTTONS === */}
            <AppButton
              title="Tanlash"
              onPress={() => setModal(true)}
              variant="primary"
            />

            <Pressable
              onPress={() => callPhone(driver.phone)}
              style={[
                driverChooseModalStyles.phoneButton,
                { backgroundColor: Colors.borderColor },
              ]}
            >
              <FontAwesome6 name="phone" size={25} color={Colors.green} />
            </Pressable>

            <SheetModal
              type="yesno"
              open={modal}
              onDismiss={() => setModal(false)}
              message="Haydovchini tanlamoqchimisiz"
              onYes={handleSelectDriver}
            />
          </View>
        )}
      </BottomSheetScrollView>
    </CustomBottomSheetModal>
  );
};
export default DriverChooseModal;

const driverChooseModalStyles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
    marginTop: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 50,
    paddingTop: 5,
  },
  sheetScroll: {
    padding: 10,
  },
  modalContent: {
    gap: 10,
  },
  driverCard: {
    flexDirection: "row",
    gap: 20,
    borderRadius: 20,
    padding: 5,
  },
  modalImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    overflow: "hidden",
  },
  driverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  driverInfo: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
  },
  modalName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalPhone: {
    fontSize: 14,
    color: "gray",
  },
  infoCard: {
    flexDirection: "row",
    gap: 20,
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingLeft: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  ratingFriends: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  ratingRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  modalRating: {
    fontWeight: "600",
  },
  phoneButton: {
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
