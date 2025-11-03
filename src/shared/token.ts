import { Dimensions, Platform } from "react-native";

export const screens = Dimensions.get("window");

export const Spacing = {
  horizontal: screens.width * 0.03,
};

export const Radius = {
  primary: 5,
  input: 20,
};

export const Fonts = {
  regular: "Inter-Regular",
  medium: "Inter-Medium",
  semiBold: "Inter-SemiBold",
  bold: "Inter-Bold",
  italic: "Inter-Italic",
};

const currencies = ["UZS", "USD", "RUBL"];

export const Shadow = {
  light: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
  dark: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: {
      elevation: 10,
    },
  }),
};

export const ORDERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  cargo: {
    weight: { value: 10 + i, unit: "ton" },
    quantity: { value: 100 + i * 5, unit: "dona" },
    type: {
      value: [
        "Olma",
        "Pomidor",
        "Banan",
        "Apelsin",
        "Guruch",
        "Sut",
        "Yog‘",
        "Kartoshka",
        "Piyoz",
        "Un",
      ][i],
      unit: null,
    },
    height: null,
    length: null,
    width: null,
    volume: null,
  },

  truck: i + 1,

  locations: {
    pickup: [
      {
        id: `here:cm:namedplace:${23835488 + i}`,
        full_title: `Toshkent, Chilonzor, ${10 + i}-tuman`,
        short_title: "Toshkent",
        coordinates: { lat: 41.2856 + i * 0.01, lng: 69.2033 + i * 0.01 },
        contact: {
          name: `Javlonbek ${i + 1}`,
          phone: `+99890${1000000 + i}`,
        },
      },
    ],
    dropoff: [
      {
        id: `here:cm:namedplace:${77777777 + i}`,
        full_title: [
          "Samarqand",
          "Buxoro",
          "Namangan",
          "Andijon",
          "Navoiy",
          "Farg‘ona",
          "Jizzax",
          "Qarshi",
          "Nukus",
          "Guliston",
        ][i],
        short_title: [
          "Samarqand",
          "Buxoro",
          "Namangan",
          "Andijon",
          "Navoiy",
          "Farg‘ona",
          "Jizzax",
          "Qarshi",
          "Nukus",
          "Guliston",
        ][i],
        coordinates: { lat: 39.6542 + i * 0.02, lng: 66.9597 + i * 0.02 },
        contact: {
          name: `Sherzod ${i + 1}`,
          phone: `+99893${550000 + i}`,
        },
      },
    ],
  },

  driver: {
    name: `Olim ${i + 1}`,
    phone_number: `+99890${3923636 + i}`,
    photo: null,
    driver_coordinates: { lat: 39.6542 + i * 0.02, lng: 66.9597 + i * 0.02 },
    rating: {
      score: 4.2 + (i % 3) * 0.1,
      count: 10 + i,
    },
    comment_count: 10 + i,
  },

  owner: {
    name: `Ali ${i + 1}`,
    phone: `+99890${1234567 + i}`,
    rating: {
      score: 4.2 + (i % 3) * 0.1,
      count: 10 + i,
    },
    comment_count: 10 + i,
  },

  time: {
    created: `2025-08-${25 + i}T10:00:00Z`,
    assigned: "",
    loaded: "",
    delivered: "",
    deadline: null,
  },

  status: {
    order_status:
      i % 4 === 0 ? "yakunlangan" : i % 3 === 0 ? "jarayonda" : "faol",
    driver: {
      departed: i % 2 === 0,
      picked_up: i % 3 !== 0,
      delivered: i % 4 === 0,
    },
  },

  distances: {
    total: 100 + i * 15,
  },

  price: {
    value: 1200000 + i * 100000,
    currency: currencies[i % currencies.length],
  },

  note: `Maxsus yuk ${i + 1}, ehtiyotkorlik bilan`,
}));
