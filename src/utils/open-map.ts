import { Alert, Linking } from "react-native";

export const openMap = async (lat?: number, lng?: number) => {
  if (!lat || !lng) {
    return Alert.alert("❗ Xatolik", "Manzil koordinatalari topilmadi");
  }

  const yandexUrl = `yandexmaps://maps.yandex.ru/?pt=${lng},${lat}&z=16`;
  // z=16 → zoom darajasi, kerak bo‘lsa o‘zgartiring

  // Platformga qarab ochish
  try {
    const supported = await Linking.canOpenURL(yandexUrl);
    if (supported) {
      await Linking.openURL(yandexUrl);
    } else {
      // Agar Yandex Maps ilovasi o‘rnatilmagan bo‘lsa, web orqali ochiladi
      const webUrl = `https://yandex.ru/maps/?pt=${lng},${lat}&z=16`;
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    Alert.alert("❗ Xatolik", "Xaritani ochishda muammo yuz berdi");
  }
};
