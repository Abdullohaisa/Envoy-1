import { atom } from "jotai";

export interface RegisterTempValues {
  username: string;
  phone: string;
  user_image: null;
  role: "Customer" | "Driver" | null;
}

export const registerTempValues = atom<RegisterTempValues>({
  username: "",
  phone: "",
  user_image: null,
  role: null,
});
