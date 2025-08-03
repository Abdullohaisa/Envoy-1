

import axios, { AxiosRequestConfig } from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenManager } from "./tokenManager";
import { handleApiError } from "./errorHandler";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_PREFIX,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await tokenManager.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?.skipAuth) {
      await AsyncStorage.removeItem("authData");
      await AsyncStorage.removeItem("access_token");
      router.replace("/(auth)/");
    }

    handleApiError(error);
    return Promise.reject(error);
  }
);

export default api;
