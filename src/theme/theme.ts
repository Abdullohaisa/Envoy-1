import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type THemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "@envoy_theme";

// Foydalanuvchi tanlagan rejim: light yoki dark
export const themeAtom = atom<THemeMode>("dark");

// Ilova ochilganda xotiradan o'qib themeAtom ga o'rnatish uchun
export const loadThemeAtom = atom(null, async (_get, set) => {
  const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    set(themeAtom, stored);
  }
});

// Foydalanuvchi tanlagan rejimni themeAtom ga va storage ga yozish
export const setThemeAtom = atom(
  null,
  async (_get, set, newTheme: THemeMode) => {
    set(themeAtom, newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }
);

// Joriy rejimni o'qish (faqat themeAtom dagi qiymatga qaraladi)
export const themeModeAtom = atom((get) => get(themeAtom));
