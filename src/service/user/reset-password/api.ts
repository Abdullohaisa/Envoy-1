import api, { CustomAxiosRequestConfig } from "@/axios/axios.config";
import { NEW_PASSWORD_URL } from "./endpoint";
import { NewPasswordType } from "./type";

export const setNewPasswordRequest = async (data: NewPasswordType) => {
  const res = await api.patch(NEW_PASSWORD_URL, data, {
    skipAuth: true,
  } as CustomAxiosRequestConfig);

  return res.data;
};
