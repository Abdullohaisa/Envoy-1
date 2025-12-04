import api from "@/axios/axios.config";
import { IOrder } from "@/types/order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";

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
      const { data } = await api.post<ICustomerOrders>(
        "/order/all-active-orders/"
      );
      set(allActiveOrdersAtom, { nearby: data.nearby, other: data.other });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        set(allActiveOrdersStateAtom, (prev) => ({
          ...prev,
          error: error.response || "Tarmoq xatosi",
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
