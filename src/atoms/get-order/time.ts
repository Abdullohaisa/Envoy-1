import { IDate } from "@/types/order";
import { atom } from "jotai";

export const getOrderTime = atom<IDate>({
  expected_arrival_time: { day: null, month: null, year: null },
});
