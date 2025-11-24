import { IPrice } from "@/types/order";
import { atom } from "jotai";

export const getOrderPriceAtom = atom<IPrice>({
  value: null,
  currency: null,
});
