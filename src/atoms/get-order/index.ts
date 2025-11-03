import { atom } from "jotai";
import { TCargo, getOrderCargoAtom } from "./cargo";
import { ILocations, getOrderLocationsAtom } from "./locations";
import { TTruck, getOrderTruckAtom } from "./truck";
import { IPrice, getOrderPriceAtom } from "./price";
import { TComment, getOrderComment } from "./comment";
import { IDate, getOrderTime } from "./time";

export type TGetOrderState = {
  cargo: TCargo;
  truck: TTruck;
  locations: ILocations;
  price: IPrice;
  comment: TComment;
  time: IDate;
};

export const getOrderAtom = atom<TGetOrderState>((get) => ({
  cargo: get(getOrderCargoAtom),
  truck: get(getOrderTruckAtom),
  locations: get(getOrderLocationsAtom),
  price: get(getOrderPriceAtom),
  comment: get(getOrderComment),
  time: get(getOrderTime),
}));

export const resetOrderAtom = atom(null, (get, set) => {
  set(getOrderCargoAtom, { type: { value: "", unit: null } });
  set(getOrderTruckAtom, null);
  set(getOrderLocationsAtom, {
    pickup: [
      {
        id: "",
        full_title: "",
        short_title: "",
        coordinates: { latitude: 0, longitude: 0 },
      },
    ],
    dropoff: [
      {
        id: "",
        full_title: "",
        short_title: "",
        coordinates: { latitude: 0, longitude: 0 },
      },
    ],
  });
  set(getOrderPriceAtom, { value: null, currency: null });
  set(getOrderComment, null);
  set(getOrderTime, { deadline: { day: null, month: null, year: null } });
});
