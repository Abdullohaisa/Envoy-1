import { StyleSheet, View } from "react-native";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import CustomerActiveOrderInfoList from "@/components/OrderInfoList/CustomerActiveOrderInfoList";
import SheetModal from "@/components/Modal/SheetModal";
import { useState } from "react";

const cargo = {
  cargo: {
    weight: { value: 10, unit: "tonna" },
    quantity: { value: 100, unit: "quti" },
    type: { value: "Apple", unit: null },
  },
  truck: 1,
  locations: {
    pickup: [
      {
        id: "here:cm:namedplace:23835488",
        full_title: "Tashkent, Chilonzor, 10-district",
        short_title: "Tashkent",
        coordinates: { latitude: 41.2856, longitude: 69.2033 },
        contact: { name: "Javlonbek", phone: "+998901112233" },
      },
      {
        id: "here:cm:namedplace:99999999",
        full_title: "Chirchiq, Uzbekistan",
        short_title: "Chirchiq",
        coordinates: { latitude: 41.4689, longitude: 69.5822 },
        contact: { name: "Umid aka", phone: "+998909998877" },
      },
    ],
    dropoff: [
      {
        id: "here:cm:namedplace:77777777",
        full_title: "Samarkand, Uzbekistan",
        short_title: "Samarkand",
        coordinates: { latitude: 39.6542, longitude: 66.9597 },
        contact: { name: "Sherzod", phone: "+998935551122" },
      },
    ],
  },
  driver: {
    name: "Olimjon",
    phone_number: "+998903923636",
    photo: null,
    driver_coordinates: { latitude: 39.6542, longitude: 66.9597 },
    rating: {
      score: 4.5,
      count: 10,
    },
    comment_count: "38",
  },
  owner: {
    name: "Ali Valiyev",
    phone: "+998901234567",
    rating: {
      score: 4.5,
      count: 10,
    },
    comment_count: "38",
  },
  time: {
    created: "2025-08-25T10:00:00Z",
    assigned: null,
    loaded: null,
    delivered: null,
    specified_date: null,
  },
  status: {
    order_status: "active",
    driver: { departed: false, picked_up: false, delivered: false },
  },
  distances: { total: null },
  price: { value: 1200000, currency: "UZS" },
  comment: "Special cargo, handle with care",
};

interface DriverRequest {
  id: number;
  name: string;
  phone_number: string;
  image: string | null;
  rating: {
    score: number; // "number" o'rniga "score" – ball bahosi
    count: number; // baholaganlar soni
  };
  comments_count: number; // "comment" o'rniga aniqroq nom
}

const requestedDrivers: DriverRequest[] = [
  {
    id: 1,
    name: "Olimjon Qodirov",
    phone_number: "+998901234567",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: {
      score: 4.8,
      count: 25,
    },
    comments_count: 18,
  },
  {
    id: 2,
    name: "Jamshid Karimov",
    phone_number: "+998933452211",
    image: null,
    rating: {
      score: 4.3,
      count: 10,
    },
    comments_count: 7,
  },
  {
    id: 3,
    name: "Rustam Aliyev",
    phone_number: "+998909887766",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: {
      score: 5.0,
      count: 42,
    },
    comments_count: 33,
  },
  {
    id: 4,
    name: "Sardorbek Tursunov",
    phone_number: "+998907654321",
    image: null,
    rating: {
      score: 4.1,
      count: 9,
    },
    comments_count: 5,
  },
  {
    id: 5,
    name: "Azizbek Rahmonov",
    phone_number: "+998934561289",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: {
      score: 4.6,
      count: 17,
    },
    comments_count: 11,
  },
];

const ActiveOrder = () => {
  const Colors = useThemeColors();
  const [open, setOpen] = useState(false);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <PageHeader
        title="Yuk ma'lumotlari"
        enableBack
        rightIcon={
          <MaterialIcons name="delete-outline" size={24} color="red" />
        }
        onRightPress={() => setOpen(true)}
      />

      <CustomerActiveOrderInfoList
        order={cargo}
        requestedDrivers={requestedDrivers}
      />

      <SheetModal
        open={open}
        onDismiss={() => {
          setOpen(false);
        }}
        message="Buyurtmani o'chirmoqchimisiz"
        type="yesno"
      />
    </View>
  );
};

export default ActiveOrder;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
