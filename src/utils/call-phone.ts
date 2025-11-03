import { Alert, Linking } from "react-native";

export const callPhone = async (phone: string) => {
  if (!phone) {
    Alert.alert("Xatolik", "Telefon raqami topilmadi.");
    return;
  }

  const url = `tel:${phone}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("Xatolik", "Qo‘ng‘iroqni amalga oshirib bo‘lmadi.");
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Xatolik", "Qo‘ng‘iroq vaqtida xato yuz berdi.");
  }
};
