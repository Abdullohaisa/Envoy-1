import { atom } from "jotai";

export interface RegisterTempValues {
  username: string;
  phone_email: string;
  user_image: null;
  role: string;
}

export const registerTempValues = atom<RegisterTempValues>({
  username: "",
  phone_email: "",
  user_image: null,
  role: "",
});
