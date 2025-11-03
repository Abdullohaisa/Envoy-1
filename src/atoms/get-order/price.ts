import { atom } from "jotai";

export interface IPrice {
  value: number | null;
  currency: string | null;
}

export const getOrderPriceAtom = atom<IPrice>({
  value: null,
  currency: null,
});
