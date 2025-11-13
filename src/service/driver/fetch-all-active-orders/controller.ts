import api from "@/axios/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";

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
  id?: number;
  added_status?: boolean;
  comment?: string;
  created_at?: string;
  updated_at?: string;
  order_status?: "active" | "attached" | "finished";
  cargo?: ICargo;
  locations?: IOrderLocation[];
  owner?: IOwner;
  price?: IPrice;
  status?: IStatus;
  time?: IOrderTime;
  truck?: number;
  driver?: Record<string, any>;
}

// Buyurtmalar to‘plami
export interface ICustomerOrders {
  nearby: IOrder[];
  other: IOrder[];
}

// Yuklanish holati
export interface ICustomerOrdersStateAtom {
  isLoading: boolean;
  error: any;
}

// ====================================================
// 🔹 ATOMLAR
// ====================================================

export const allActiveOrdersAtom = atom<ICustomerOrders>({
  nearby: [],
  other: [],
});

export const allActiveOrdersStateAtom = atom<ICustomerOrdersStateAtom>({
  isLoading: false,
  error: null,
});

export const useFetchAllActiveOrders = () =>
  useAtomCallback(async (_get, set) => {
    set(allActiveOrdersStateAtom, { isLoading: true, error: null });

    try {
      const { data } = await api.post("/order/all-active-orders/");
      set(allActiveOrdersAtom, { nearby: data.nearby, other: data.other });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        set(allActiveOrdersStateAtom, (prev) => ({
          ...prev,
          error: error.response?.data?.message || "Tarmoq xatosi",
        }));
      } else {
        set(allActiveOrdersStateAtom, (prev) => ({
          ...prev,
          error: "Noma'lum xatolik",
        }));
      }
    } finally {
      set(allActiveOrdersStateAtom, (prev) => ({ ...prev, isLoading: false }));
    }
  });
