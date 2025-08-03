import axios from "axios";

import api, { CustomAxiosRequestConfig } from "@/axios/axios.config";
import { AuthRequestLogin, AuthRequestRegister, AuthResponse } from "./types";
import { AUTH_ENDPOINTS } from "./endpoints";

export const authRequest = async (
  profle: AuthRequestLogin | AuthRequestRegister,
  status: "login" | "register"
) => {
  const response = await api.post<AuthResponse>(
    status === "register" ? AUTH_ENDPOINTS.register : AUTH_ENDPOINTS.login,
    profle,
    {
      skipAuth: true,
    } as CustomAxiosRequestConfig
  );
  return response.data;
};
