import { t } from "i18next";
import { Alert, Linking } from "react-native";

export const callPhone = async (phone: string) => {
  if (!phone) {
    Alert.alert(t("error"), t("phone_not_found"));
  }

  const url = `tel:${phone}`;

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(t("error"), t("call_failed"));
    }
  } catch (error) {
    Alert.alert(t("error"), t("call_error"));
  }
};
