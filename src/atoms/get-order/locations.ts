import { atom } from "jotai";

export interface ILocation {
  id: string;
  full_title: string;
  short_title: string;
  coordinates: {
    latitude: number; // kenglik → latitude
    longitude: number; // uzunlik → longitude
  };
  contact: {
    name: string;
    phone: string;
  };
}

export interface ILocations {
  pickup: ILocation[]; // olish → pickup
  dropoff: ILocation[]; // tushirish → dropoff
}

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
