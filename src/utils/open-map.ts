import * as Linking from "expo-linking";
import { Alert } from "react-native";

export const openMapApp = async (lat: number, lng: number, label?: string) => {
  const yandex = `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=14&text=${encodeURIComponent(label || "")}`;
  const google = `googlemaps://?q=${lat},${lng}`;
  const universal = `https://maps.google.com/?q=${lat},${lng}`;

  try {
    const supported = await Linking.canOpenURL("yandexmaps://");
    if (supported) {
      await Linking.openURL(yandex);
    } else if (await Linking.canOpenURL("googlemaps://")) {
      await Linking.openURL(google);
    } else {
      await Linking.openURL(universal);
      Alert.alert(
        "Diqqat",
        "Xarita ilovasi topilmadi. Iltimos, Yandex yoki Google Maps o‘rnating."
      );
    }
  } catch (error) {
    Alert.alert("Xatolik", "Xaritani ochishda muammo bo‘ldi.");
  }
};
