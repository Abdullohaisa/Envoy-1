// tokenManager.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export const tokenManager = {
  set: async (access: string | null) => {
    if (access) {
      await AsyncStorage.setItem("access_token", access);
    } else {
      await AsyncStorage.removeItem("access_token");
    }
  },
  get: async () => {
    return await AsyncStorage.getItem("access_token");
  },
};
