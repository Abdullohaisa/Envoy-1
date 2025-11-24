import api from "@/axios/axios.config";
import { IOrder } from "@/types/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";

// Buyurtmalar to‘plami
export interface ICustomerOrders {
  requested: IOrder[];
  finished: IOrder[];
  accepted: IOrder;
}

// Yuklanish holati
export interface ICustomerOrdersStateAtom {
  isLoading: boolean;
  error: any;
}

// ====================================================
// 🔹 ATOMLAR
// ====================================================

export const driverOrdersAtom = atom<ICustomerOrders>({
  requested: [],
  finished: [],
  accepted: {} as IOrder,
});

export const driverOrdersStateAtom = atom<ICustomerOrdersStateAtom>({
  isLoading: false,
  error: null,
});

export const useFetchDriverOrders = () =>
  useAtomCallback(async (_get, set) => {
    set(driverOrdersStateAtom, { isLoading: true, error: null });

    try {
      const { data } = await api.get<ICustomerOrders>("/driver/orders/");
      set(driverOrdersAtom, {
        requested: data.requested,
        finished: data.finished,
        accepted: data.accepted,
      });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        set(driverOrdersStateAtom, (prev) => ({
          ...prev,
          error: error.response?.data?.message || "Tarmoq xatosi",
        }));
      } else {
        set(driverOrdersStateAtom, (prev) => ({
          ...prev,
          error: "Noma'lum xatolik",
        }));
      }
    } finally {
      set(driverOrdersStateAtom, (prev) => ({ ...prev, isLoading: false }));
    }
  });
