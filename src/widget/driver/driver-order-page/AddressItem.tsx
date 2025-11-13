// import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
// import AppText from "@/components/Texts/Text";
// import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
// import { useRef } from "react";
// import { Pressable, StyleSheet, View } from "react-native";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { mask } from "react-native-mask-text";
// import { callPhone } from "@/utils/call-phone";
// import { openMap } from "@/components/OrderInfoList/Components/Components";
// import { useThemeColors } from "@/theme/useThemeColors";
// import { DRIVER_ORDER } from "@/app/(app)/driver/driver-order";

// const DriverOrderAddressItem = ({
//   loc,
//   index,
// }: {
//   loc: any;
//   index: number;
// }) => {
//   const Colors = useThemeColors();
//   const sheetRef = useRef<BottomSheetModalMethods>(null);

//   return (
//     <Pressable
//       onPress={() => sheetRef.current?.present()}
//       style={[
//         styles.addressBlock,
//         {
//           borderColor: Colors.borderColor,
//         },
//       ]}
//     >
//       <View>
//         <AppText style={[styles.addressTitle, { color: Colors.textPrimary }]}>
//           {index + 1} {""} {loc.full_title}
//         </AppText>
//       </View>

//       <CustomBottomSheetModal
//         ref={sheetRef}
//         snapPoints={["40%"]}
//         handleStyle={{ backgroundColor: Colors.Boxbackground }}
//       >
//         <View
//           style={{
//             flex: 1,
//             paddingHorizontal: 20,
//             paddingVertical: 10,
//             backgroundColor: Colors.Boxbackground,
//           }}
//         >
//           {/* Sarlavha */}
//           <View
//             style={{
//               borderBottomWidth: 1,
//               borderColor: Colors.borderColor,
//               paddingVertical: 12,
//               marginBottom: 12,
//             }}
//           >
//             <AppText
//               variant="semiBold"
//               style={{
//                 fontSize: 17,
//                 color: Colors.textPrimary,
//                 textAlign: "center",
//               }}
//             >
//               {loc.full_title}
//             </AppText>
//           </View>

//           {/* Kontakt ma’lumot */}
//           <View
//             style={{
//               marginBottom: 20,
//               alignItems: "center",
//               backgroundColor: Colors.Boxbackground,
//               paddingVertical: 14,
//               borderRadius: 18,
//               shadowColor: "#000",
//               shadowOpacity: 0.08,
//               shadowRadius: 3,
//               elevation: 2,
//             }}
//           >
//             <AppText
//               style={{
//                 fontSize: 15,
//                 color: Colors.textSecondary,
//                 marginBottom: 6,
//                 letterSpacing: 0.2,
//               }}
//             >
//               Kutib oluvchi:
//             </AppText>

//             <AppText
//               variant="semiBold"
//               style={{
//                 fontSize: 17,
//                 color: Colors.textPrimary,
//                 marginBottom: 4,
//               }}
//             >
//               {loc.contact.name}
//             </AppText>

//             <AppText
//               style={{
//                 fontSize: 15,
//                 color: Colors.primary,
//                 fontWeight: "600",
//                 letterSpacing: 0.3,
//               }}
//             >
//               {mask(loc.contact.phone, "+999 99 999-99-99")}
//             </AppText>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               gap: 12,
//               marginTop: 10,
//             }}
//           >
//             <Pressable
//               onPress={() => callPhone(loc.contact.phone)}
//               style={{
//                 flex: 1,
//                 backgroundColor: Colors.green04,
//                 borderRadius: 14,
//                 paddingVertical: 14,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "row",
//                 gap: 8,
//               }}
//             >
//               <FontAwesome5 name="phone-alt" size={18} color="#fff" />
//               <AppText
//                 variant="semiBold"
//                 style={{
//                   color: Colors.textPrimary,
//                   fontSize: 15,
//                 }}
//               >
//                 Qo‘ng‘iroq
//               </AppText>
//             </Pressable>

//             <Pressable
//               onPress={() =>
//                 openMap(loc.coordinates.latitude, loc.coordinates.longitude)
//               }
//               style={{
//                 flex: 1,
//                 backgroundColor: Colors.primary08,
//                 borderRadius: 14,
//                 paddingVertical: 14,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "row",
//                 gap: 8,
//               }}
//             >
//               <MaterialIcons name="navigation" size={22} color="#fff" />
//               <AppText
//                 variant="semiBold"
//                 style={{
//                   color: Colors.textPrimary,
//                   fontSize: 15,
//                 }}
//               >
//                 Navigator
//               </AppText>
//             </Pressable>
//           </View>
//         </View>
//       </CustomBottomSheetModal>
//     </Pressable>
//   );
// };

// export default DriverOrderAddressItem;

// const styles = StyleSheet.create({
//   addressBlock: {
//     paddingTop: 10,
//     borderTopWidth: 1,
//   },
//   addressTitle: { fontSize: 15 },
//   contact: { fontSize: 13, marginTop: 2 },
//   navigatorButton: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     borderRadius: 20,
//   },
// });

import CustomBottomSheetModal from "@/components/BottomSheets/BottomSheetModal";
import AppText from "@/components/Texts/Text";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { mask } from "react-native-mask-text";
import { callPhone } from "@/utils/call-phone";
import { openMap } from "@/components/OrderInfoList/Components/Components";
import { useThemeColors } from "@/theme/useThemeColors";
import { DRIVER_ORDER } from "@/app/(app)/driver/driver-order";

const DriverOrderAddressItem = ({
  loc,
  index,
  type, // "pickup" yoki "dropoff"
}: {
  loc: any;
  index: number;
  type: "pickup" | "dropoff";
}) => {
  const Colors = useThemeColors();
  const sheetRef = useRef<BottomSheetModalMethods>(null);

  // Manzil holatini olish
  const driverStatus = DRIVER_ORDER.status.driver_status[type][index];
  let statusText = "";
  let statusColor = Colors.Boxbackground; // default fon

  if (driverStatus.departed && !driverStatus.arrived) {
    statusText = "Yo‘lga chiqdingiz";
    statusColor = Colors.primary08;
  } else if (driverStatus.arrived) {
    statusText = "Yetib bordingiz";
    statusColor = Colors.green04;
  }

  return (
    <Pressable
      onPress={() => sheetRef.current?.present()}
      style={[
        styles.addressBlock,
        {
          borderColor: Colors.borderColor,
          backgroundColor: statusColor + "22", // engil fon
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderRadius: 12,
          justifyContent: "center",
        },
      ]}
    >
      {/* Manzil sarlavhasi */}
      <AppText
        variant="medium"
        style={[styles.addressTitle, { color: Colors.textPrimary }]}
      >
        {index + 1}. {loc.full_title}
      </AppText>

      {/* Status */}
      {statusText.length !== 0 && (
        <AppText
          style={{
            // marginTop: 6,
            fontSize: 13,
            color:
              statusText === "Yo‘lga chiqdingiz"
                ? Colors.primary
                : statusText === "Yetib bordingiz"
                  ? Colors.green04
                  : Colors.textSecondary,
          }}
        >
          {statusText}
        </AppText>
      )}

      {/* BottomSheet tafsilotlari */}
      <CustomBottomSheetModal
        ref={sheetRef}
        snapPoints={["40%"]}
        handleStyle={{ backgroundColor: Colors.Boxbackground }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: Colors.Boxbackground,
          }}
        >
          {/* Sarlavha */}
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: Colors.borderColor,
              paddingVertical: 12,
              marginBottom: 12,
            }}
          >
            <AppText
              variant="semiBold"
              style={{
                fontSize: 17,
                color: Colors.textPrimary,
                textAlign: "center",
              }}
            >
              {loc.full_title}
            </AppText>
          </View>

          {/* Kontakt ma’lumot */}
          <View
            style={{
              marginBottom: 20,
              alignItems: "center",
              backgroundColor: Colors.Boxbackground,
              paddingVertical: 14,
              borderRadius: 18,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <AppText
              style={{
                fontSize: 15,
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
                fontSize: 17,
                color: Colors.textPrimary,
                marginBottom: 4,
              }}
            >
              {loc.contact.name}
            </AppText>

            <AppText
              style={{
                fontSize: 15,
                color: Colors.primary,
                fontWeight: "600",
                letterSpacing: 0.3,
              }}
            >
              {mask(loc.contact.phone, "+999 99 999-99-99")}
            </AppText>
          </View>

          {/* Tugmalar */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => callPhone(loc.contact.phone)}
              style={{
                flex: 1,
                backgroundColor: Colors.green04,
                borderRadius: 14,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <FontAwesome5 name="phone-alt" size={18} color="#fff" />
              <AppText
                variant="semiBold"
                style={{
                  color: Colors.textPrimary,
                  fontSize: 15,
                }}
              >
                Qo‘ng‘iroq
              </AppText>
            </Pressable>

            <Pressable
              onPress={() =>
                openMap(loc.coordinates.latitude, loc.coordinates.longitude)
              }
              style={{
                flex: 1,
                backgroundColor: Colors.primary08,
                borderRadius: 14,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <MaterialIcons name="navigation" size={22} color="#fff" />
              <AppText
                variant="semiBold"
                style={{
                  color: Colors.textPrimary,
                  fontSize: 15,
                }}
              >
                Navigator
              </AppText>
            </Pressable>
          </View>
        </View>
      </CustomBottomSheetModal>
    </Pressable>
  );
};

export default DriverOrderAddressItem;

const styles = StyleSheet.create({
  addressBlock: {
    // marginVertical: 5,
    borderTopWidth: 1,
  },
  addressTitle: { fontSize: 15 },
});
