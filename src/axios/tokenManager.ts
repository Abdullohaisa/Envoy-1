// tokenManager.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tokenManager = {
  set: async (token: string | null) => {
    if (token) {
      await AsyncStorage.setItem("access_token", token);
    } else {
      await AsyncStorage.removeItem("access_token");
    }
  },
  get: async () => {
    return await AsyncStorage.getItem("access_token");
  },
};
