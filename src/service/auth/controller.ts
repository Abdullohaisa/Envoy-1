import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { AxiosError } from "axios";

import { AuthRequestLogin, AuthRequestRegister, AuthResponse } from "./types";
import { authRequest } from "./api";
import { tokenManager } from "@/axios/tokenManager";
import { AppRoutes } from "@/constants/routes";
import { router } from "expo-router";

const storage = createJSONStorage<AuthResponse | null>(() => AsyncStorage);

export const authStateAtom = atomWithStorage<AuthResponse | null>(
  "authData",
  null,
  storage
);

interface LocalAtom {
  isLoading: boolean;
  error: { error: string } | null;
}

const localAtom = atom<LocalAtom>({
  isLoading: false,
  error: null,
});

export const authAtom = atom(
  (get) => ({
    data: get(authStateAtom),
    ...get(localAtom),
  }),
  async (
    _get,
    set,
    profile: AuthRequestLogin | AuthRequestRegister,
    status: "login" | "register"
  ) => {
    set(localAtom, {
      isLoading: true,
      error: null,
    });

    try {
      const data = await authRequest(profile, status); // ✅ await qo‘shildi

      set(authStateAtom, data); // bu yerda endi to‘g‘ri AuthResponse bo‘ladi
      set(localAtom, {
        isLoading: false,
        error: null,
      });

      tokenManager.set(data.token); // ✅ `dat

      router.replace(
        data?.role === "Customer"
          ? AppRoutes.customer.home
          : AppRoutes.driver.home
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        set(localAtom, {
          isLoading: false,
          error: error.response?.data,
        });
      }
    }
  }
);

export const logoutAtom = atom(null, async (_get, set) => {
  const language: string | null = await AsyncStorage.getItem("language");
  await AsyncStorage.clear();
  if (language) {
    await AsyncStorage.setItem("language", language);
  }
  set(authStateAtom, null);
  set(localAtom, {
    isLoading: false,
    error: null,
  });
});
