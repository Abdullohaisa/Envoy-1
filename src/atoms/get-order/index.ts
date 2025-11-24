import { atom } from "jotai";
import { getOrderCargoAtom } from "./cargo";
import { getOrderLocationsAtom } from "./locations";
import { getOrderTruckAtom } from "./truck";
import { getOrderPriceAtom } from "./price";
import { getOrderComment } from "./comment";
import { getOrderTime } from "./time";
import { TCreateOrder } from "@/types/order";

export const getOrderAtom = atom<TCreateOrder>((get) => ({
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
        contact: {
          name: "",
          phone: "",
        },
      },
    ],
    dropoff: [
      {
        id: "",
        full_title: "",
        short_title: "",
        coordinates: { latitude: 0, longitude: 0 },
        contact: {
          name: "",
          phone: "",
        },
      },
    ],
  });
  set(getOrderPriceAtom, { value: null, currency: null });
  set(getOrderComment, null);
  set(getOrderTime, {
    expected_arrival_time: { day: null, month: null, year: null },
  });
});
