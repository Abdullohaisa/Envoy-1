import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { AppRoutes } from "@/constants/routes";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { Radius, Spacing } from "@/shared/token";

const GetOrder = () => {
  const router = useRouter();
  const Colors = useThemeColors();

  const buttons = [
    { title: "Yuk", route: AppRoutes.customer.getOrder.cargo },
    { title: "Manzillar", route: AppRoutes.customer.getOrder.locations },
    { title: "Mashina", route: AppRoutes.customer.getOrder.truck },
    { title: "Narx", route: AppRoutes.customer.getOrder.price },
    { title: "Izoh", route: AppRoutes.customer.getOrder.comment },
    { title: "Vaqt", route: AppRoutes.customer.getOrder.time },
  ];

  return (
    <>
      <PageHeader title="Buyurtma berish" />
      <View style={{ flex: 1, padding: 5 }}>
        <ScrollView
          style={{
            backgroundColor: Colors.pageBackground,
            flex: 1,
            borderRadius: Radius.primary,
            overflow: "hidden",
          }}
          contentContainerStyle={[styles.container, {}]}
          showsVerticalScrollIndicator={false}
        >
          {buttons.map((btn) => (
            <Pressable
              key={btn.title}
              style={[styles.button, { backgroundColor: Colors.Boxbackground }]}
              onPress={() => router.push(btn.route)}
            >
              <Text style={[styles.buttonText, { color: Colors.textPrimary }]}>
                {btn.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default GetOrder;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // scrollview ichidagi elementlar ekranni to‘ldiradi
    justifyContent: "space-between", // tugmalarni teng taqsimlaydi
    gap: 5,
  },
  button: {
    flex: 1,
    borderRadius: Radius.primary,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 5,
    minHeight: 80, // minimal balandlik, kerak bo‘lsa
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 18,
  },
});
