import api from "@/axios/axios.config";
import { atom } from "jotai";
import { LOCATION_PICKER_API } from "./endpoint";
import { AxiosError } from "axios";

interface locationPickerState {
  locations: object[];
  isLoading: boolean;
  error: any;
}

export const locationPickerState = atom<locationPickerState>({
  locations: [],
  isLoading: false,
  error: null,
});

export const locationPickerAtom = atom(
  (get) => get(locationPickerState),
  async (_get, set, { text }: { text: string }) => {
    set(locationPickerState, {
      locations: [],
      isLoading: true,
      error: null,
    });
    try {
      const { data } = await api(LOCATION_PICKER_API({ text }));
      set(locationPickerState, {
        locations: data.items || [],
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
