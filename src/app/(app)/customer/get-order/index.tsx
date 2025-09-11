import { Button, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AppRoutes } from "@/constants/routes";
import { useSetAtom } from "jotai";
import { themeAtom } from "@/theme/theme";
import PageHeader from "@/components/Header/PageHeader/PageHeader";

const GetOrder = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Buyurtma berish" />
      <View style={styles.container}>
        <Button
          title="Cargo"
          onPress={() => router.push(AppRoutes.customer.getOrder.cargo)}
        />
        <Button
          title="Locations"
          onPress={() => router.push(AppRoutes.customer.getOrder.locations)}
        />
        <Button
          title="Truck"
          onPress={() => router.push(AppRoutes.customer.getOrder.truck)}
        />
        <Button
          title="Price"
          onPress={() => router.push(AppRoutes.customer.getOrder.price)}
        />
        <Button
          title="Comment"
          onPress={() => router.push(AppRoutes.customer.getOrder.comment)}
        />
        <Button
          title="Time"
          onPress={() => router.push(AppRoutes.customer.getOrder.time)}
        />
      </View>
    </>
  );
};

export default GetOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
});

const order = {
  cargo: {
    type: "Meva", // Yuk turi (meva, sabzavot, qadoqlangan mahsulot va h.k.)
    length: 2.5, // Uzunlik metrda
    width: 1.5, // Kenglik metrda
    height: 1.0, // Balandlik metrda
    volume: 2, // Hajm, m³ (uzunlik*kenklik*balandlik) – bu yerda approx 2 m³
    quantity: 10, // Yuk soni, dona
  },
  time: {
    createdAt: "2025-08-25T10:00:00Z", // Buyurtma yaratilgan vaqt (UTC)
    assignedToDriverAt: "2025-08-25T12:00:00Z", // Buyurtma haydovchiga berilgan vaqt
    pickedUpAt: null, // Yuk olinishi vaqti (hozircha yo‘q)
    deliveredAt: null, // Yetkazilgan vaqt (hozircha yo‘q)
  },
  price: null, // Buyurtma narxi (hozircha hisoblanmagan)
  truck: {
    type: "Kamaz", // Transport turi (Kamaz, Ford, Isuzu va h.k.)
    quantity: 1, // Transport soni
  },
  status: {
    orderStatus: "faol", // Buyurtma holati: faol | berilgan | tugatilgan
    driverStatus: {
      onTheWayToPickup: true, // Haydovchi yukni olishga ketmoqda (hozir yo‘q)
      pickedUp: false, // Haydovchi yukni olib ketdi (hozir yo‘q)
      delivered: false, // Yuk yetkazildi (hozir yo‘q)
    },
  },
  locations: [
    {
      type: "pickup", // Yukni olish manzili
      id: {
        country: "01", // Mamlakat kodi
        region: "0102", // Hudud kodi
        city: "010201", // Shahar kodi
        district: "01020101", // Tuman kodi
      },
      coordinate: {
        lat: 41.1234, // Latitude
        long: 69.5678, // Longitude
      },
      street: "Mustaqillik ko'chasi", // Ko‘cha nomi
      generalAddress: "", // Qo‘shimcha manzil (agar bo‘lsa)
    },
    {
      type: "dropOff", // Yetkazish manzili
      id: {
        country: "01",
        region: "0105",
        city: "010501",
        district: "01050101",
      },
      coordinate: {
        lat: 40.2345,
        long: 70.6789,
      },
      street: "Navoi ko'chasi",
      generalAddress: "",
    },
  ],
  distances: {
    totalDistance: 150, // Umumiy masofa km
    driverToPickup: 20, // Haydovchidan yukni olishgacha masofa
    pickupToDropOff: 130, // Yukni olishdan yetkazishgacha masofa
  },
  comment: "Maxsus yuk, ehtiyotkorlik bilan tashish", // Buyurtmaga oid qo‘shimcha izoh
  owner: {
    name: "Ali Valiyev", // Buyurtmachi ismi
    phone: "+998901234567", // Telefon raqami
    rating: 4.5, // Reyting (1-5 ball)
    comments: [
      {
        rating: 5, // Sharhdagi baho
        comment: "Tez va ehtiyotkor tashish", // Sharh matni
        owner: {
          name: "Karimov Diyor", // Sharh bergan shaxs
          photo: "https://example.com/photo1.jpg", // Shaxsning rasmi
        },
      },
      {
        rating: 4,
        comment: "Vaqtida yetkazdi, lekin biroz sust edi",
        owner: {
          name: "Nodirbek Akmal",
          photo: "https://example.com/photo2.jpg",
        },
      },
    ],
  },
};
