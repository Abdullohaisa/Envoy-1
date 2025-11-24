import { TTruck } from "@/types/order";
import { atom } from "jotai";

// bu oddiy alias bo‘lgani uchun type ishlatamiz

export const getOrderTruckAtom = atom<TTruck>(null);
