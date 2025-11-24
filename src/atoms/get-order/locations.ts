import { ILocations } from "@/types/order";
import { atom } from "jotai";

interface IGetOrderLocationStatus {
  locationType: "pickup" | "dropoff";
  index: number;
}

export const getOrderLocationsAtom = atom<ILocations>({
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

export const getOrderLocationStatusAtom = atom<IGetOrderLocationStatus>({
  locationType: "pickup",
  index: 0,
});
