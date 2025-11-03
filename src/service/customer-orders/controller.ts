import api from "@/axios/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

// ====================================================
// 🔹 INTERFEYSLAR
// ====================================================

// Buyurtmadagi qiymat va birlik (masalan, uzunlik, vazn)
export interface IValueUnit<T = number | string | null> {
  value: T;
  unit: string | null;
}

// Yuk ma’lumotlari
export interface ICargo {
  height: IValueUnit;
  length: IValueUnit;
  quantity: IValueUnit;
  type: IValueUnit<string>;
  volume: IValueUnit;
  weight: IValueUnit;
  width: IValueUnit;
}

// Har bir manzil nuqtasi
export interface ILocationPoint {
  id: string;
  full_title: string;
  short_title: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Buyurtmadagi joylashuvlar
export interface IOrderLocation {
  pickup: ILocationPoint[];
  dropoff: ILocationPoint[];
}

// Buyurtma egasi
export interface IOwner {
  name: string;
  phone: string;
  comment_count: number | null;
  rating: {
    count: number;
    score: number;
  };
}

// Narx
export interface IPrice {
  currency: string;
  value: number;
}

// Holat
export interface IStatus {
  driver: {
    delivered: boolean;
    departed: boolean;
    picked_up: boolean;
  };
}

// Vaqt ma’lumotlari
export interface IOrderTime {
  assigned: string | null;
  created: string;
  delivered: string | null;
  loaded: string | null;
  deadline: {
    day: number;
    month: number;
    year: number;
  };
}

// Asosiy buyurtma interfeysi
export interface IOrder {
  id: number;
  added_status: boolean;
  comment: string;
  created_at: string;
  updated_at: string;
  order_status: "active" | "attached" | "finished";
  cargo: ICargo;
  locations: IOrderLocation[];
  owner: IOwner;
  price: IPrice;
  status: IStatus;
  time: IOrderTime;
  truck: number;
  driver: Record<string, any>;
}

// Buyurtmalar to‘plami
export interface ICustomerOrders {
  active: IOrder[];
  attached: IOrder[];
  finished: IOrder[];
}

// Yuklanish holati
export interface IFetchState {
  isLoading: boolean;
  error: string | null;
}

// ====================================================
// 🔹 ATOMLAR
// ====================================================

const storage = createJSONStorage<ICustomerOrders>(() => AsyncStorage);

const customerOrdersState = atomWithStorage<ICustomerOrders>(
  "customerOrders",
  {
    active: [],
    attached: [],
    finished: [],
  },
  storage
);

const fetchState = atom<IFetchState>({
  isLoading: false,
  error: null,
});

export const customerOrdersAtom = atom(
  async (get) => {
    const orders = await get(customerOrdersState);
    const state = get(fetchState);

    return { orders, state };
  },
  async (_get, set) => {
    set(fetchState, {
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await api.get("order/customer-order/");
      console.log(data);
      set(customerOrdersState, {
        active: data.active,
        attached: data.attached,
        finished: data.finished,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(fetchState, (prev) => ({
          ...prev,
          error: error.response?.data?.message ?? "Server xatosi",
        }));
      } else {
        set(fetchState, (prev) => ({
          ...prev,
          error: "Noma’lum xato yuz berdi",
        }));
      }
      console.log(error);
    } finally {
      set(fetchState, (prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }
);
