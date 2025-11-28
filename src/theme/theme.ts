import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type THemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "@envoy_theme";

const storage = createJSONStorage<THemeMode>(() => AsyncStorage);

// Foydalanuvchi tanlagan rejim: light yoki dark
export const themeAtom = atomWithStorage<THemeMode>(
  THEME_STORAGE_KEY,
  "dark",
  storage
);

// Foydalanuvchi tanlagan rejimni themeAtom ga va storage ga yozish
export const setThemeAtom = atom(
  (get) => get(themeAtom),
  async (_get, set, newTheme: THemeMode) => {
    set(themeAtom, newTheme);
  }
);

// Joriy rejimni o'qish (faqat themeAtom dagi qiymatga qaraladi)
export const themeModeAtom = atom((get) => get(themeAtom));
