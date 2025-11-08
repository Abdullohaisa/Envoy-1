import * as Application from "expo-application";
import { Platform } from "react-native";
import { AUTH_ENDPOINTS } from "./endpoints";
import { AuthPayload } from "./types";
import api, { CustomAxiosRequestConfig } from "@/axios/axios.config";

// login va register
export const authRequest = async (
  profile: AuthPayload,
  status: "login" | "register"
) => {
  // Qurilma ID olish
  const deviceId =
    Platform.OS === "ios"
      ? await Application.getIosIdForVendorAsync()
      : await Application.getAndroidId();

  // login yoki register so‘rov yuborish
  const response = await api.post(
    status === "register" ? AUTH_ENDPOINTS.register : AUTH_ENDPOINTS.login,
    {
      ...profile,
      device_id: deviceId, // shu yerda ham yuboramiz
    },
    {
      skipAuth: true,
    } as CustomAxiosRequestConfig
  );

  return response.data;
};

// logout
export const logoutRequest = async (refreshToken: string) => {
  const deviceId =
    Platform.OS === "ios"
      ? await Application.getIosIdForVendorAsync()
      : await Application.getAndroidId();

  const res = await api.post("/user/logout/", {
    refresh: refreshToken,
    device_id: deviceId, // shu joyda dynamic id berilyapti
  });

  return res.data;
};
