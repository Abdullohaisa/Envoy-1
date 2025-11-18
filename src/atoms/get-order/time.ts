import { atom } from "jotai";

export interface IDate {
  expected_arrival_time: {
    day: null | number;
    month: null | number;
    year: null | number;
  };
}

export const getOrderTime = atom<IDate>({
  expected_arrival_time: { day: null, month: null, year: null },
});
