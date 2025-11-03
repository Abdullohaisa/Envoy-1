import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "appLanguage";

// 🌍 Tarjimalarni dynamic import qilish
const languageResources: Record<string, () => Promise<any>> = {
  uzbekistan: () => import("./uzbekistan.json"),
  kazakhstan: () => import("./kazakhstan.json"),
  kyrgyzstan: () => import("./kyrgyzstan.json"),
  tajikistan: () => import("./tajikistan.json"),
  turkmenistan: () => import("./turkmenistan.json"),
  russia: () => import("./russia.json"),
  turkey: () => import("./turkey.json"),
  english: () => import("./english.json"),
  china: () => import("./china.json"),
  belarus: () => import("./belarus.json"),
};

// 🧩 i18n boshlang‘ich sozlamalari
export const initLanguage = async () => {
  const savedLang = (await AsyncStorage.getItem(LANGUAGE_KEY)) || "uzbekistan";
  const resource = await languageResources[savedLang]();

  await i18n.use(initReactI18next).init({
    resources: { [savedLang]: { translation: resource.default } },
    lng: savedLang,
    fallbackLng: "english",
    interpolation: { escapeValue: false },
    compatibilityJSON: "v4",
  });
};

// 🌀 Tilni o‘zgartirish
export const setLanguage = async (lang: string) => {
  const resource = await languageResources[lang]();
  i18n.addResources(lang, "translation", resource.default);
  i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
};

export default i18n;
