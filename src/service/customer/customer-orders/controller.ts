import api from "@/axios/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";

export interface IValueUnit<T = number | string | null> {
  value: T;
  unit: string | null;
}

export interface ICargo {
  height: IValueUnit;
  length: IValueUnit;
  quantity: IValueUnit;
  type: IValueUnit<string>;
  volume: IValueUnit;
  weight: IValueUnit;
  width: IValueUnit;
}

export interface ILocationPoint {
  id: string;
  full_title: string;
  short_title: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    name: string;
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
  expected_arrival_time: {
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
export interface ICustomerOrdersStateAtom {
  isLoading: boolean;
  error: any;
}

// ====================================================
// 🔹 ATOMLAR
// ====================================================

export const customerOrdersAtom = atom<ICustomerOrders>({
  active: [],
  attached: [],
  finished: [],
});

export const customerOrdersStateAtom = atom<ICustomerOrdersStateAtom>({
  isLoading: false,
  error: null,
});

export const useFetchCustomerOrders = () =>
  useAtomCallback(async (_get, set) => {
    set(customerOrdersStateAtom, {
      isLoading: true,
      error: null,
    });

    try {
      const { data } = await api.get("/order/customer-order/");
      set(customerOrdersAtom, {
        active: data.active,
        attached: data.attached,
        finished: data.finished,
      });
      await AsyncStorage.setItem("customerOrders", JSON.stringify(data));
    } catch (error: any) {
      if (error instanceof AxiosError) {
        set(customerOrdersStateAtom, (prev) => ({
          ...prev,
          error: error.response?.data?.message || "Tarmoq xatosi",
        }));
      } else {
        set(customerOrdersStateAtom, (prev) => ({
          ...prev,
          error: "Noma'lum xatolik",
        }));
      }

      const cached = await AsyncStorage.getItem("customerOrders");
      if (cached) {
        const parsed = await JSON.parse(cached);
        set(customerOrdersAtom, parsed);
      }
    } finally {
      set(customerOrdersStateAtom, (prev) => ({ ...prev, isLoading: false }));
    }
  });
