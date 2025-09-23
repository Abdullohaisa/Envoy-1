import { View, Pressable } from "react-native";
import { memo } from "react";
import Octicons from "@expo/vector-icons/Octicons";
import { useThemeColors } from "@/theme/useThemeColors";
import AppText from "@/components/Texts/Text";
import { orderItemStyle as styles } from "@/styles/order-item-style";

function ActiveCustomerOrderItem({ index }: { index: number }) {
  const Colors = useThemeColors();

  const infoItems = [
    "Yuk turi: Qurilish",
    "Narx: 5,000,000 so‘m",
    "Mashina: MAN",
  ];

  // Qatorlarga bo‘lib chiqish (statik holat)
  const rows = [["Qurilish", "5,000,000 so‘m"], ["MAN"]];

  return (
    <View style={[styles.box, {}]}>
      <Pressable
        onPress={() => {}}
        android_ripple={{
          color: Colors.borderColor,
          borderless: false,
          radius: 200,
        }}
        style={[
          styles.item,
          {
            backgroundColor: Colors.Boxbackground,
          },
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.itemLengthBox}>
            <AppText style={styles.itemLength}>Raqam - 12345</AppText>
          </View>
          <AppText style={styles.itemLength}>21.09.2025</AppText>
        </View>

        <View
          style={[
            styles.line,
            { backgroundColor: "transparent", marginVertical: 5 },
          ]}
        />

        {/* Manzillar */}
        <View
          style={{
            gap: 3,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          {/* Boshlanish nuqtasi */}
          <View style={styles.locationItem}>
            <Octicons name={"dot"} size={12} color={"#2ecc71"} />
            <AppText
              //   variant="bold"
              style={[styles.locationItemText, { color: "#fff" }]}
            >
              Toshkent
            </AppText>
          </View>

          {/* O‘rtadagi nuqtalar */}
          <View style={[styles.locationItem]}>
            <Octicons name={"dot"} size={12} color={"#ffbd59"} />
            <Octicons name={"dot"} size={12} color={"#ffbd59"} />
          </View>

          {/* Tugash nuqtasi */}
          <View style={styles.locationItem}>
            <AppText
              //   variant="bold"
              style={[styles.locationItemText, { color: "#fff" }]}
            >
              Buxoro
            </AppText>
            <Octicons name={"dot"} size={12} color={"#e74c3c"} />
          </View>
        </View>

        {/* Soralgan va Reyting */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <AppText
            style={{
              color: Colors.primary,
              fontSize: 12,
              borderTopWidth: 1,
              borderColor: "#444",
              paddingTop: 7,
            }}
          >
            Soralgan - 12
          </AppText>
        </View>

        <View style={[styles.line, { marginVertical: 10 }]} />

        {/* Info rows */}
        <View style={styles.infoBox}>
          {rows.map((row, index) => (
            <View key={index} style={styles.row}>
              {row.map((text, idx) => (
                <InfoRow key={idx} text={text} />
              ))}
            </View>
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const InfoRow = ({ text }: { text: string }) => {
  const Colors = useThemeColors();
  return (
    <View style={[styles.orderTypeBox, { backgroundColor: "#222" }]}>
      <AppText style={styles.orderType}>{text}</AppText>
    </View>
  );
};

export default memo(ActiveCustomerOrderItem);

// import { StyleSheet, View, Pressable } from "react-native";
// import { memo } from "react";
// import Octicons from "@expo/vector-icons/Octicons";
// import { useThemeColors } from "@/theme/useThemeColors";
// import AppText from "@/components/Texts/Text";
// import { screens } from "@/shared/token";
// import { orderItemStyle as styles } from "@/styles/order-item-style";
// // import RatingStars from "Components/RatingStars/RatingStars";

// function ActiveCustomerOrderItem() {
//   // Endi order, item, cityData kabi narsalar yo‘q
//   // faqat qotib qolgan textlar bor
//   const Colors = useThemeColors();

//   const infoItems = [
//     "Yuk turi: Qurilish",
//     "Narx: 5,000,000 so‘m",
//     "Mashina: MAN",
//   ];

//   // Qatorlarga bo‘lib chiqish (statik holat)
//   const rows = [["Qurilish", "5,000,000 so‘m"], ["MAN"]];

//   return (
//     <Pressable style={styles.box}>
//       <Pressable
//         onPress={() => {}}
//         android_ripple={{
//           color: Colors.borderColor,
//           borderless: false,
//           radius: 200,
//         }}
//         style={[
//           styles.item,
//           {
//             backgroundColor: Colors.Boxbackground,
//           },
//         ]}
//       >
//         <View style={styles.topSection}>
//           <View style={styles.itemLengthBox}>
//             <AppText style={styles.itemLength}>Raqam - 12345</AppText>
//           </View>
//           <AppText style={styles.itemLength}>21.09.2025</AppText>
//         </View>

//         <View
//           style={[
//             styles.line,
//             { backgroundColor: "transparent", marginVertical: 5 },
//           ]}
//         />

//         {/* Manzillar */}
//         <View
//           style={{
//             gap: 3,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginBottom: 10,
//           }}
//         >
//           {/* Boshlanish nuqtasi */}
//           <View style={styles.locationItem}>
//             <Octicons name={"dot"} size={12} color={"#2ecc71"} />
//             <AppText
//               //   variant="bold"
//               style={[styles.locationItemText, { color: "#fff" }]}
//             >
//               Toshkent
//             </AppText>
//           </View>

//           {/* O‘rtadagi nuqtalar */}
//           <View style={[styles.locationItem]}>
//             <Octicons name={"dot"} size={12} color={"#ffbd59"} />
//             <Octicons name={"dot"} size={12} color={"#ffbd59"} />
//           </View>

//           {/* Tugash nuqtasi */}
//           <View style={styles.locationItem}>
//             <AppText
//               //   variant="bold"
//               style={[styles.locationItemText, { color: "#fff" }]}
//             >
//               Buxoro
//             </AppText>
//             <Octicons name={"dot"} size={12} color={"#e74c3c"} />
//           </View>
//         </View>

//         {/* Soralgan va Reyting */}
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 10,
//           }}
//         >
//           <AppText
//             style={{
//               color: Colors.primary,
//               fontSize: 12,
//               borderTopWidth: 1,
//               borderColor: "#444",
//               paddingTop: 5,
//             }}
//           >
//             Soralgan - 12
//           </AppText>

//           {/* <RatingStars rating={4.5} size={13} /> */}
//         </View>

//         {/* Agar so‘rov yuborilgan bo‘lsa */}
//         <AppText
//           style={{
//             color: Colors.yellow,
//             fontSize: 12,
//             paddingTop: 5,
//           }}
//         >
//           Siz so‘rov yuborgansiz
//         </AppText>

//         <View style={[styles.line, { marginBottom: 10 }]} />

//         {/* Info rows */}
//         <View style={styles.infoBox}>
//           {rows.map((row, index) => (
//             <View key={index} style={styles.row}>
//               {row.map((text, idx) => (
//                 <InfoRow key={idx} text={text} />
//               ))}
//             </View>
//           ))}
//         </View>
//       </Pressable>
//     </Pressable>
//   );
// }

// const InfoRow = ({ text }: { text: string }) => {
//   const Colors = useThemeColors();
//   return (
//     <View
//       style={[styles.orderTypeBox, { backgroundColor: Colors.pageBackground }]}
//     >
//       <AppText style={styles.orderType}>{text}</AppText>
//     </View>
//   );
// };

// export default memo(ActiveCustomerOrderItem);
