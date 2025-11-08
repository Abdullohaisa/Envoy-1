import api from "@/axios/axios.config";
import { atom } from "jotai";
import { LOCATION_PICKER_API } from "./endpoint";
import axios, { AxiosError } from "axios";
import { useFetchCustomerOrders } from "../customer-orders/controller";

// 📌 Oldin tuzgan interface
export interface LocationSuggestion {
  location: {
    label: string;
    highlights?: Array<{
      start: number;
      end: number;
    }>;
  };
  distance: number;
  id: string;
  localityType: string;
  mapView: {
    east: number;
    north: number;
    south: number;
    west: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  resultType: string;
  title: string;
  titleHighlights?: Array<{
    start: number;
    end: number;
  }>;
}

// 📌 State uchun interface
interface LocationPickerState {
  locations: LocationSuggestion[];
  isLoading: boolean;
  error: any;
}

// 📌 Atom initial state
export const locationPickerState = atom<LocationPickerState>({
  locations: [],
  isLoading: false,
  error: null,
});

// 📌 Atom uchun action
export const locationPickerAtom = atom(
  (get) => get(locationPickerState),
  async (_get, set, { text }: { text: string }) => {
    set(locationPickerState, {
      locations: [],
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await axios.get(LOCATION_PICKER_API({ text }));
      set(locationPickerState, {
        locations: (data.items as LocationSuggestion[]) || [],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(locationPickerState, {
          locations: [],
          isLoading: false,
          error: error,
        });
      }
    }
  }
);

// 📌 Tozalash uchun atom
export const clearLocationPickerAtom = atom(
  (get) => get(locationPickerState),
  (_get, set) => {
    set(locationPickerState, {
      locations: [],
      isLoading: false,
      error: null,
    });
  }
);

const makeOrderStateAtom = atom({
  isLoading: false,
  error: null,
  makeOrder: false,
});

export const makeOrderAtom = atom(
  (get) => get(makeOrderStateAtom),
  async (_get, set, order: any) => {
    set(makeOrderStateAtom, {
      isLoading: true,
      error: null,
      makeOrder: false,
    });

    try {
      const res = await api.post("/order/make-order/", order);

      set(makeOrderStateAtom, {
        isLoading: false,
        error: null,
        makeOrder: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set(makeOrderStateAtom, {
          isLoading: false,
          error: error.response?.data.message,
          makeOrder: true,
        });
      }
    }
  }
);

export const resetMakeOrderAtom = atom(null, (_get, set) => {
  set(makeOrderStateAtom, {
    isLoading: false,
    error: null,
    makeOrder: false,
  });
});
