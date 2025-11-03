import { atom } from "jotai";

export interface IDate {
  deadline: {
    day: null | number;
    month: null | number;
    year: null | number;
  };
}

export const getOrderTime = atom<IDate>({
  deadline: { day: null, month: null, year: null },
});
