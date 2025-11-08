import api from "@/axios/axios.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { atom } from "jotai";
import { useAtomCallback } from "jotai/utils";

// --- Interface lar ---
export interface UserData {
  username: string | null;
  phone: string | null;
  role: string | null;
  image: string | null;
}

export interface UserState {
  isLoading: boolean;
  error: string | null;
}

// --- Atomlar ---
export const userDataAtom = atom<UserData>({
  username: null,
  phone: null,
  role: null,
  image: null,
});

export const userDataStateAtom = atom<UserState>({
  isLoading: false,
  error: null,
});

// --- Callback asosidagi fetch funksiyasi ---
export const useFetchUserData = () =>
  useAtomCallback(async (get, set) => {
    set(userDataStateAtom, { isLoading: true, error: null });

    try {
      // API dan malumot olish
      const { data } = await api.get<UserData>("/user/get-personal-data/");
      set(userDataAtom, data);
      await AsyncStorage.setItem("userData", JSON.stringify(data));
    } catch (error: any) {
      // Xatolik holati
      if (error instanceof AxiosError) {
        set(userDataStateAtom, (prev) => ({
          ...prev,
          error: error.response?.data?.message || "Tarmoq xatosi",
        }));
      } else {
        set(userDataStateAtom, (prev) => ({
          ...prev,
          error: "Noma'lum xatolik",
        }));
      }

      // Agar internet bo‘lmasa — cache dan o‘qish
      const cached = await AsyncStorage.getItem("userData");
      if (cached) {
        const parsed = JSON.parse(cached);
        set(userDataAtom, parsed);
      }
    } finally {
      // Yuklanish tugashi
      set(userDataStateAtom, (prev) => ({ ...prev, isLoading: false }));
    }
  });
