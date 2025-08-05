import { atom } from "jotai";
import { setNewPasswordRequest } from "./api";
import { NewPasswordType } from "./type";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

const newPasswordState = atom({
  detail: null,
  isLoading: false,
  error: null,
});

export const newPasswordAtom = atom(
  (get) => get(newPasswordState),
  async (_get, set, requestData: NewPasswordType) => {
    set(newPasswordState, { detail: null, isLoading: true, error: null });

    try {
      const { detail } = await setNewPasswordRequest(requestData);
      set(newPasswordState, {
        detail,
        isLoading: false,
        error: null,
      });
      setTimeout(() => {
        router.push(AppRoutes.auth.auth);
      }, 1000);
    } catch (error: any) {
      console.log(requestData);
      set(newPasswordState, {
        detail: null,
        isLoading: false,
        error: error,
      });
    }
  }
);
