// hooks/useDeviceProfile.ts
import { useEffect, useState } from "react";
import * as Device from "expo-device";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/axios/axios.config";

export function useDeviceProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // 📱 Qurilma ID olish
        let deviceId: string | null = null;
        try {
          deviceId =
            Platform.OS === "ios"
              ? await Application.getIosIdForVendorAsync()
              : await Application.getAndroidId();
        } catch {
          deviceId = null;
        }

        // 🔔 Push token olish
        let pushToken: string | null = null;
        try {
          const token = await Notifications.getExpoPushTokenAsync();
          pushToken = token.data;
        } catch {
          pushToken = null;
        }

        // 🌍 Tilni olish
        let language = "uz";
        try {
          language = (await AsyncStorage.getItem("language")) || "uz";
        } catch {
          language = "uz";
        }

        // 🧱 Asosiy ma’lumotlar
        const baseData: any = {
          device_id: deviceId,
          language,
          push_token: pushToken,
          brand: Device.brand || null,
          model: Device.modelName || null,
          os_version: Device.osVersion || null,
          version: Application.nativeApplicationVersion || null,
        };

        // 🌐 Lokatsiyani olishga harakat qilish
        let withLocation = { ...baseData };

        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === "granted") {
            const loc = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced,
            });
            withLocation = {
              ...baseData,
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              accuracy: loc.coords.accuracy,
              timestamp: loc.timestamp,
            };
          } else {
          }
        } catch (err) {}

        // 📨 So‘rovni baribir yuboramiz
        const res = await api.post("/device/fill-device/", withLocation);

        console.log(withLocation);

        setProfile(withLocation);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { profile, loading };
}
