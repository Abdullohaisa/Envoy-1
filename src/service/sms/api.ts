import api, { CustomAxiosRequestConfig } from "@/axios/axios.config";
import { SMS_URL } from "./endpoint";

export const sendSms = async (phone: string) => {
  const res = await api.post(SMS_URL, { phone }, {
    skipAuth: true,
  } as CustomAxiosRequestConfig);
  return res.data;
};
