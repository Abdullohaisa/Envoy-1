import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppButton from "@/components/Buttons/Button";
import AppImage from "@/components/Image/Image";
import SheetModal from "@/components/Modal/SheetModal";
import RatingStars from "@/components/RatingStars";
import AppText from "@/components/Texts/Text";
import { useThemeColors } from "@/theme/useThemeColors";
import { callPhone } from "@/utils/call-phone";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

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
                  <AppImage
                    source={driver.image}
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
