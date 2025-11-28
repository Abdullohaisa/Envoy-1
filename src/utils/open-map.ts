// import { Alert, Linking, Platform } from "react-native";

// export const openMap = async (lat?: number, lng?: number) => {
//   if (lat === undefined || lng === undefined) {
//     return Alert.alert("❗ Xatolik", "Manzil koordinatalari topilmadi");
//   }

//   // 1) YANDEX
//   const yandexApp = `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=16`;
//   const yandexWeb = `https://yandex.ru/maps/?pt=${lng},${lat}&z=16`;

//   // 2) GOOGLE MAPS
//   const googleApp = Platform.select({
//     ios: `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=16`,
//     android: `geo:${lat},${lng}?q=${lat},${lng}&z=16`,
//   });
//   const googleWeb = `https://www.google.com/maps?q=${lat},${lng}`;

//   // 3) 2GIS
//   const gisApp = `dgis://2gis.ru/routeSearch/rsType/car/to/${lng},${lat}`;
//   const gisWeb = `https://2gis.com/?m=${lng},${lat},16`;

//   // Priority list: Yandex → Google → 2GIS → Fallback web
//   const priorityApps = [
//     { app: yandexApp, web: yandexWeb },
//     { app: googleApp, web: googleWeb },
//     { app: gisApp, web: gisWeb },
//   ];

//   try {
//     for (const item of priorityApps) {
//       if (!item.app) continue;

//       const supported = await Linking.canOpenURL(item.app);
//       if (supported) {
//         return Linking.openURL(item.app);
//       }
//     }

//     // Agar ilovalar yo‘q bo‘lsa Yandex Web bilan
//     return Linking.openURL(yandexWeb);
//   } catch (e) {
//     Alert.alert("❗ Xatolik", "Xaritani ochishda muammo yuz berdi");
//   }
// };

import { Alert, Linking, Platform } from "react-native";

export type IOpenMapItem = {
  name: string;
  appUrl: string;
  webUrl: string;
  storeUrl: string; // Play Market yoki AppStore
};

export const mapList = (lat: number, lng: number): IOpenMapItem[] => {
  return [
    {
      name: "Yandex Maps",
      appUrl: `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=1`,
      webUrl: `https://yandex.ru/maps/?pt=${lng},${lat}&z=1`,
      storeUrl:
        Platform.OS === "ios"
          ? "https://apps.apple.com/ru/app/yandex-maps/id313877526"
          : "https://play.google.com/store/apps/details?id=ru.yandex.yandexmaps",
    },
    {
      name: "Google Maps",
      appUrl:
        Platform.OS === "ios"
          ? `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=1`
          : `google.navigation:q=${lat},${lng}&mode=d`,
      webUrl: `https://www.google.com/maps?q=${lat},${lng}`,
      storeUrl:
        Platform.OS === "ios"
          ? "https://apps.apple.com/ru/app/google-maps/id585027354"
          : "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
    },
  ];
};

export const openMapApp = async (
  appUrl: string,
  webUrl: string,
  storeUrl: string
) => {
  try {
    // Faqat tanlangan appni ochamiz
    await Linking.openURL(appUrl);
  } catch (e) {
    // Agar ilova yo‘q bo‘lsa → store yoki web fallback
    if (storeUrl) {
      await Linking.openURL(storeUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  }
};
