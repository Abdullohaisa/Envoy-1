import { atom } from "jotai";

// bu oddiy alias bo‘lgani uchun type ishlatamiz
export type TTruck = number | null;

export const getOrderTruckAtom = atom<TTruck>(null);
