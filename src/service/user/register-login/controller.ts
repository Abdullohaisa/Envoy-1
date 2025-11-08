// import { atomWithStorage, createJSONStorage } from "jotai/utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { atom } from "jotai";
// import { AxiosError } from "axios";

// import {
//   AuthRequestLogin,
//   AuthRequestRegister,
//   AuthResponse,
//   AuthResponseData,
// } from "./types";
// import { authRequest } from "./api";
// import { tokenManager } from "@/axios/tokenManager";
// import { AppRoutes } from "@/constants/routes";
// import { router } from "expo-router";

// const storage = createJSONStorage<AuthResponseData | null>(() => AsyncStorage);

// export const authStateAtom = atomWithStorage<AuthResponseData | null>(
//   "authData",
//   null,
//   storage
// );

// interface LocalAtom {
//   isLoading: boolean;
//   error: { error: string } | null;
// }

// const localAtom = atom<LocalAtom>({
//   isLoading: false,
//   error: null,
// });

// export const authAtom = atom(
//   (get) => ({
//     data: get(authStateAtom),
//     ...get(localAtom),
//   }),
//   async (
//     _get,
//     set,
//     profile: AuthRequestLogin | AuthRequestRegister,
//     status: "login" | "register"
//   ) => {
//     set(localAtom, {
//       isLoading: true,
//       error: null,
//     });

//     try {
//       const { data } = await authRequest(profile, status); // ✅ await qo‘shildi

//       // set(authStateAtom, data); // bu yerda endi to‘g‘ri AuthResponse bo‘ladi
//       set(localAtom, {
//         isLoading: false,
//         error: null,
//       });

//       // tokenManager.set(data.access);

//       router.replace(
//         data.role === "Customer"
//           ? AppRoutes.customer.getOrder.index
//           : AppRoutes.driver.home
//       );
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         set(localAtom, {
//           isLoading: false,
//           error: error.response?.data.message,
//         });
//       }
//     }
//   }
// );

// export const logoutAtom = atom(null, async (_get, set) => {
//   const language: string | null = await AsyncStorage.getItem("language");
//   await AsyncStorage.clear();
//   if (language) {
//     await AsyncStorage.setItem("language", language);
//   }
//   set(authStateAtom, null);
//   set(localAtom, {
//     isLoading: false,
//     error: null,
//   });
// });

import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";
import { AxiosError } from "axios";
import { router } from "expo-router";
import * as Application from "expo-application";
import { Platform } from "react-native";
import { authRequest, logoutRequest } from "./api";
import { tokenManager } from "@/axios/tokenManager";
import { AuthPayload, AuthResponseData } from "./types";
import { AppRoutes } from "@/constants/routes";

const storage = createJSONStorage<AuthResponseData>(() => AsyncStorage);

export const authAtom = atomWithStorage<AuthResponseData>(
  "authData",
  {
    access: null,
    role: null,
    refresh: null,
  },
  storage
);

export const authTempStateAtom = atom({
  isLoading: false,
  error: null as any,
});

export const authStateAtom = atom(
  async (get) => {
    const auth = (await get(authAtom)) ?? {
      access: null,
      role: null,
      refresh: null,
    };
    const temp = get(authTempStateAtom);
    return { data: auth, ...temp };
  },
  async (_get, set, profile: AuthPayload, status: "login" | "register") => {
    set(authTempStateAtom, { isLoading: true, error: null });

    const deviceId =
      Platform.OS === "ios"
        ? await Application.getIosIdForVendorAsync()
        : await Application.getAndroidId();

    try {
      const res = await authRequest(profile, status);
      const payload = await res;

      set(authAtom, {
        access: payload?.access ?? null,
        refresh: payload?.refresh ?? null,
        role: payload?.role ?? null,
      });

      await tokenManager.set(payload?.access);

      set(authTempStateAtom, {
        isLoading: false,
        error: null,
      });

      if (res.role === "Customer") {
        router.replace("/(app)/customer/orders/");
      } else if (res.role === "Driver") {
        router.replace("/(app)/driver/orders/");
      } else {
        router.replace("/(auth-2)/");
      }
    } catch (error) {
      const errorString = JSON.stringify(
        error instanceof AxiosError ? error.response?.data : error,
        null,
        2
      );

      set(authTempStateAtom, {
        isLoading: false,
        error: error instanceof AxiosError ? error.response?.data : error,
      });
    } finally {
      set(authTempStateAtom, (prev) => ({ ...prev, isLoading: false }));
    }
  }
);

export const logoutAtom = atom(null, async (get, set) => {
  try {
    const authData = await get(authAtom);
    const refreshToken = authData.refresh;

    if (refreshToken) {
      await logoutRequest(refreshToken);
    }

    await tokenManager.set(null);

    const language: string | null = await AsyncStorage.getItem("language");
    await AsyncStorage.clear();
    if (language) {
      await AsyncStorage.setItem("language", language);
    }

    set(authAtom, {
      access: null,
      role: null,
      refresh: null,
    });
    set(authTempStateAtom, { isLoading: false, error: null });
    router.replace(AppRoutes.auth.auth);
  } catch (error) {
    const errorString = JSON.stringify(error, null, 2);
  }
});
