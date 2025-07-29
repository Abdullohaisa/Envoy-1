import { atom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, ColorSchemeName } from "react-native";

export type THemeMode = "light" | "dark" | "device";

const THEME_STORAGE_KEY = "@envoy_theme";

// Foydalanuvchi tanlagan rejim: light, dark, device
export const themeAtom = atom<THemeMode>("device");

// Ilova ochilganda xotiradan o'qib themeAtom ga o'rnatish uchun
export const loadThemeAtom = atom(null, async (_get, set) => {
  const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "device") {
    set(themeAtom, stored);
  }
});

// User tanlasa themeAtom va storage ikkalasi yangilanadi
export const setThemeAtom = atom(null, async (_get, set, newTheme: THemeMode) => {
  set(themeAtom, newTheme);
  await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
});

// Joriy rejimni aniqlovchi atom (device bo‘lsa sistemani o‘qiydi)
export const themeModeAtom = atom((get) => {
  const mode = get(themeAtom);
  if (mode === "device") {
    const systemColorScheme = Appearance.getColorScheme();
    return systemColorScheme === "dark" ? "dark" : "light";
  }
  return mode;
});
