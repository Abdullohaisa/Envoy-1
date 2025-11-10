import { Alert, Pressable, Text, View, StyleSheet } from "react-native";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import CustomBottomSheetModal from "../BottomSheets/BottomSheetModal";
import { useRef, useState } from "react";
import AppButton from "../Buttons/Button";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  OrderListAddress,
  OrderListCargo,
  OrderListRequestDriver,
} from "./Components/Components";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import RatingStars from "../RatingStars";
import AppText from "../Texts/Text";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SheetModal from "../Modal/SheetModal";

const CustomerActiveOrderInfoList = ({ order, requestedDrivers }: any) => {
  const modalRef = useRef<any>(null);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);

  const handleDriverPress = (driver: any) => {
    setSelectedDriver(driver);
    modalRef.current?.present();
  };

  const handleSelectDriver = () => {
    Alert.alert(
      "✅ Haydovchi tanlandi",
      `${selectedDriver.name} bilan bog‘lanishingiz mumkin.`
    );
    modalRef.current?.dismiss();
  };

  return (
    <Animated.ScrollView
      entering={FadeInDown.duration(600)}
      exiting={FadeOutUp.duration(600)}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <OrderListRequestDriver
        drivers={requestedDrivers}
        handleDriverPress={handleDriverPress}
      />
      <OrderListCargo order={order} />
      <OrderListAddress locations={order?.locations} />

      <DriverChooseModal
        modalRef={modalRef}
        driver={selectedDriver}
        handleSelectDriver={handleSelectDriver}
      />
    </Animated.ScrollView>
  );
};

export default CustomerActiveOrderInfoList;

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
      <BottomSheetScrollView style={styles.sheetScroll}>
        {driver && (
          <View style={styles.modalContent}>
            <View
              style={[
                styles.driverCard,
                { backgroundColor: Colors.borderColor },
              ]}
            >
              <View style={styles.modalImage}>
                {driver.image ? (
                  <Image
                    source={{ uri: driver.image }}
                    style={styles.driverImage}
                  />
                ) : (
                  <MaterialIcons
                    name="account-circle"
                    size={80}
                    color={Colors.textSecondary}
                  />
                )}
              </View>
              <View style={styles.driverInfo}>
                <AppText
                  style={[styles.modalName, { color: Colors.textPrimary }]}
                >
                  {driver.name}
                </AppText>
                <AppText
                  style={[styles.modalPhone, { color: Colors.textSecondary }]}
                >
                  {driver.phone_number}
                </AppText>
              </View>
            </View>

            <View
              style={[styles.infoCard, { backgroundColor: Colors.borderColor }]}
            >
              <View style={styles.ratingLeft}>
                <AppText>Reyting</AppText>
                <View style={styles.ratingFriends}>
                  <FontAwesome5 name="user-friends" size={14} color="silver" />
                  <AppText style={styles.modalRating}>
                    {driver.rating.count}
                  </AppText>
                </View>
              </View>
              <View style={styles.ratingRight}>
                <AppText style={styles.modalRating}>
                  {driver.rating.score}
                </AppText>
                <RatingStars rating={driver.rating.score} />
              </View>
            </View>

            {/* === COMMENTS CARD === */}
            <View
              style={[styles.infoCard, { backgroundColor: Colors.borderColor }]}
            >
              <AppText>Boshqa Mijozlar fikri</AppText>
              <AppText style={styles.modalRating}>
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
              style={[
                styles.phoneButton,
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

/* ====================== STYLES ====================== */
const styles = StyleSheet.create({
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
