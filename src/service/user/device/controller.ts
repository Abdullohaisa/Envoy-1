// // hooks/useDeviceProfile.ts
// import { useEffect, useState } from "react";
// import * as Device from "expo-device";
// import * as Application from "expo-application";
// import * as Notifications from "expo-notifications";
// import * as Location from "expo-location";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import api from "@/axios/axios.config";

// export function useDeviceProfile() {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         // 📱 Qurilma ID olish
//         let deviceId: string | null = null;
//         try {
//           deviceId =
//             Platform.OS === "ios"
//               ? await Application.getIosIdForVendorAsync()
//               : await Application.getAndroidId();
//         } catch {
//           deviceId = null;
//         }

//         // 🔔 Push token olish
//         let pushToken: string | null = null;
//         try {
//           const token = await Notifications.getExpoPushTokenAsync();
//           pushToken = token.data;
//         } catch {
//           pushToken = null;
//         }

//         // 🌍 Tilni olish
//         let language = "uz";
//         try {
//           language = (await AsyncStorage.getItem("language")) || "uz";
//         } catch {
//           language = "uz";
//         }

//         // 🧱 Asosiy ma’lumotlar
//         const baseData: any = {
//           device_id: deviceId,
//           language,
//           push_token: pushToken,
//           brand: Device.brand || null,
//           model: Device.modelName || null,
//           os_version: Device.osVersion || null,
//           version: Application.nativeApplicationVersion || null,
//         };

//         // 🌐 Lokatsiyani olishga harakat qilish
//         let withLocation = { ...baseData };

//         try {
//           const { status } = await Location.requestForegroundPermissionsAsync();
//           if (status === "granted") {
//             const loc = await Location.getCurrentPositionAsync({
//               accuracy: Location.Accuracy.Balanced,
//             });
//             withLocation = {
//               ...baseData,
//               latitude: loc.coords.latitude,
//               longitude: loc.coords.longitude,
//               accuracy: loc.coords.accuracy,
//               timestamp: loc.timestamp,
//             };
//           } else {
//           }
//         } catch (err) {}

//         // 📨 So‘rovni baribir yuboramiz
//         const res = await api.post("/device/fill-device/", withLocation);

//         setProfile(withLocation);
//       } catch (e) {
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   return { profile, loading };
// }

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
      let deviceData: any = {};
      let locationData: any = {};
      let pushToken: string | null = null;

      try {
        // 📱 Qurilma ID olish
        const deviceId =
          Platform.OS === "ios"
            ? await Application.getIosIdForVendorAsync()
            : await Application.getAndroidId();

        // 🌍 Tilni olish
        const language = (await AsyncStorage.getItem("language")) || "uz";

        // 🧱 Asosiy device ma’lumotlar
        deviceData = {
          device_id: deviceId,
          brand: Device.brand || null,
          model: Device.modelName || null,
          os_version: Device.osVersion || null,
          version: Application.nativeApplicationVersion || null,
          language: "1",
        };
      } catch (e) {}

      try {
        // 🔔 Push token olish
        const token = await Notifications.getExpoPushTokenAsync();
        pushToken = token.data;
      } catch (e) {}

      try {
        // 🌐 Lokatsiyani olish
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          locationData = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            accuracy: loc.coords.accuracy,
            timestamp: loc.timestamp,
          };
        }
      } catch (e) {}

      // 🔹 Profilni yaratish
      const payload = {
        device: deviceData,
        location: locationData,
        notification: { push_token: pushToken },
        // activity: {
        //   last_active_at: "A",
        //   last_login_at: "Addqdqdqwr",
        //   last_logout_at: "dA",
        //   created_at: "something",
        //   updated_at: "something",
        // },
      };

      setProfile(payload);
      setLoading(false);

      // 📨 So‘rovni alohida try-catchda yuborish
      try {
        await api.post("/device/fill-device/", payload);
      } catch (e) {}
    })();
  }, []);

  return { profile, loading };
}
