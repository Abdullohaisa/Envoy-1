import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Radius } from "@/shared/token";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../Texts/Text";
import { openMap } from "@/utils/open-map";

const OrderInfoList = ({ order }: any) => {
  const Colors = useThemeColors();

  const callNumber = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() =>
      Alert.alert("❗ Xatolik", "Telefon orqali bog‘lanib bo‘lmadi")
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        overflow: "hidden",
        marginTop: 5,
        borderRadius: 10,
        marginHorizontal: 5,
      }}
      contentContainerStyle={{
        gap: 10,
        paddingBottom: 50,
      }}
    >
      {/* === Yuk haqida === */}
      <Section title="Yuk ma'lumotlari" Colors={Colors}>
        <Info Colors={Colors} label="Yuk" value={order.cargo.type.value} />
        <Info
          Colors={Colors}
          label="Og‘irligi"
          value={`${order.cargo.weight.value} ${order.cargo.weight.unit}`}
        />
        <Info
          Colors={Colors}
          label="Miqdori"
          value={`${order.cargo.quantity.value} ${order.cargo.quantity.unit}`}
        />
        <Info
          Colors={Colors}
          label="Narx"
          value={`${order.price.value.toLocaleString()} ${order.price.currency}`}
        />
        <Info Colors={Colors} label="Izoh" value={order.comment} />
        <Info
          Colors={Colors}
          label="Yuk mashinasi"
          value={order.truck.toString()}
        />
      </Section>

      {/* === Manzillar === */}
      <Section title="Manzillar" Colors={Colors}>
        {order.addresses.pickup.map((item: any) => (
          <View
            key={`pickup-${item.id}`}
            style={[styles.subBox, { backgroundColor: Colors.Boxbackground06 }]}
          >
            <Info Colors={Colors} label="Jo‘natish" value={item.full_title} />
            <Info Colors={Colors} label="Shahar" value={item.short_title} />
            <Info
              Colors={Colors}
              label="Kutib oluvchi"
              value={item.contact.name}
            />
            <Pressable onPress={() => callNumber(item.contact.phone)}>
              <Info
                Colors={Colors}
                label="Telefon"
                value={item.contact.phone}
                // icon={
                //   <MaterialIcons
                //     name="phone"
                //     size={18}
                //     color={Colors.primary}
                //   />
                // }
              />
            </Pressable>
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
          </View>
        ))}

        {order.addresses.dropoff.map((item: any) => (
          <View
            key={`dropoff-${item.id}`}
            style={[styles.subBox, { backgroundColor: Colors.Boxbackground06 }]}
          >
            <Info Colors={Colors} label="Yetkazish" value={item.full_title} />
            <Info Colors={Colors} label="Shahar" value={item.short_title} />
            <Info Colors={Colors} label="Aloqa" value={item.contact.name} />
            <Pressable onPress={() => callNumber(item.contact.phone)}>
              <Info
                Colors={Colors}
                label="Telefon"
                value={item.contact.phone}
                // icon={
                //   <MaterialIcons
                //     name="phone"
                //     size={18}
                //     color={Colors.primary}
                //   />
                // }
              />
            </Pressable>
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
          </View>
        ))}
      </Section>

      {/* === Haydovchi === */}
      <Section title="Haydovchi" Colors={Colors}>
        <Info Colors={Colors} label="Ismi" value={order.driver.name} />
        <Pressable onPress={() => callNumber(order.driver.phone_number)}>
          <Info
            Colors={Colors}
            label="Telefon"
            value={order.driver.phone_number}
            // icon={
            //   <MaterialIcons name="phone" size={18} color={Colors.primary} />
            // }
          />
        </Pressable>
        <Info
          Colors={Colors}
          label="Reyting"
          value={`${order.driver.rating} ⭐`}
        />
        <Info
          Colors={Colors}
          label="Izoh"
          value={`${order.driver.comment_count}`}
        />
      </Section>

      {/* === Buyurtmachi === */}
      <Section title="Buyurtmachi" Colors={Colors}>
        <Info Colors={Colors} label="Ismi" value={order.owner.name} />
        <Pressable onPress={() => callNumber(order.owner.phone)}>
          <Info Colors={Colors} label="Telefon" value={order.owner.phone} />
        </Pressable>
        <Info
          Colors={Colors}
          label="Reyting"
          value={`${order.driver.rating.score} ⭐`}
        />
        <Info
          Colors={Colors}
          label="Izoh"
          value={`${order.driver.comment_count}`}
        />
      </Section>
    </ScrollView>
  );
};

export default OrderInfoList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    borderWidth: 1,
    borderRadius: Radius.primary * 2.5,
    padding: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    paddingVertical: 8,
  },
  label: { fontWeight: "500" },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    width: "70%",
    justifyContent: "flex-end",
  },
  value: { textAlign: "right" },
  subBox: {
    borderRadius: Radius.primary * 2.5,
    padding: 10,
    marginVertical: 6,
  },
  mapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  mapLink: { fontWeight: "600" },
});

const Info = ({ label, value, Colors, icon }: any) => (
  <View style={[styles.infoRow, { borderColor: Colors.borderColor04 }]}>
    <AppText style={[styles.label, { color: Colors.textPrimary }]}>
      {label}:
    </AppText>
    <View style={styles.valueWrapper}>
      {icon}
      <AppText style={[styles.value, { color: Colors.textSecondary }]}>
        {value ?? "—"}
      </AppText>
    </View>
  </View>
);

const Section = ({ title, Colors, children }: any) => (
  <View
    style={[
      styles.section,
      {
        backgroundColor: Colors.Boxbackground08,
        borderColor: Colors.borderColor04,
      },
    ]}
  >
    <AppText style={[styles.sectionTitle, { color: Colors.textPrimary }]}>
      {title}
    </AppText>
    {children}
  </View>
);
