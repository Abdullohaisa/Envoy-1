// import { StyleSheet, View } from "react-native";
// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { useFonts } from "expo-font";
// import SplashScreenIcon from "@/assets/icon/splash-screen-icon";
// import Animated, {
//   Easing,
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AppRoutes } from "@/constants/routes";

// const index = () => {
//   const router = useRouter();
//   const [animtedDone, setAnimtedDone] = useState(false);
//   const [authReady, setAuthReady] = useState(false);
//   const [nextRoute, setNextRoute] = useState<string | null>(null);
//   const scale = useSharedValue(0);

//   const [fontsLoaded, fontsError] = useFonts({
//     "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
//     "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
//     "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
//     "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
//     "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const storedData = await AsyncStorage.getItem("authData");
//         const parsedData = storedData ? await JSON.parse(storedData) : null;
//         const access = await parsedData?.access;
//         const role = await parsedData?.role;

//         let route = AppRoutes.auth.auth;

//         if (access && role === "Customer")
//           route = AppRoutes.customer.getOrder.index;
//         // route = AppRoutes.driver.orders.index;
//         else if (access && role === "Driver")
//           route = AppRoutes.driver.orders.index;

//         setNextRoute(route);
//       } catch (error) {
//         setNextRoute(AppRoutes.auth.auth);
//       } finally {
//         setAuthReady(true);
//       }
//     };
//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (fontsLoaded || fontsError) {
//       scale.value = withSequence(
//         withTiming(1.1, { duration: 1000, easing: Easing.out(Easing.exp) }),
//         withTiming(0.9, { duration: 1000, easing: Easing.out(Easing.exp) }),
//         withTiming(
//           1,
//           { duration: 1000, easing: Easing.out(Easing.exp) },
//           () => {
//             runOnJS(setAnimtedDone)(true);
//           }
//         )
//       );
//     }
//   }, [fontsLoaded, fontsError]);

//   useEffect(() => {
//     if (animtedDone && authReady && nextRoute) {
//       router.replace(nextRoute);
//     }
//   }, [animtedDone, authReady, nextRoute]);

//   if (!fontsLoaded && !fontsError) return null;

//   return (
//     <View style={styles.container}>
//       <Animated.View style={animatedStyle}>
//         <SplashScreenIcon size={160} />
//       </Animated.View>
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import { StyleSheet, View } from "react-native";
// import { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import { useFonts } from "expo-font";
// import SplashScreenIcon from "@/assets/icon/splash-screen-icon";
// import Animated, {
//   Easing,
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withSequence,
//   withTiming,
// } from "react-native-reanimated";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AppRoutes } from "@/constants/routes";
// import { initLanguage } from "@/locales/_i18n"; // 🌍 tilni yuklash

// const Index = () => {
//   const router = useRouter();
//   const [ready, setReady] = useState(false); // 👈 umumiy holat
//   const [nextRoute, setNextRoute] = useState<string | null>(null);
//   const scale = useSharedValue(0);

//   const [fontsLoaded, fontsError] = useFonts({
//     "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
//     "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
//     "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
//     "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
//     "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scale.value }],
//   }));

//   // 🔑 Auth va tilni yuklash
//   useEffect(() => {
//     const prepareApp = async () => {
//       try {
//         // 1️⃣ Tilni yuklash
//         await initLanguage();

//         // 2️⃣ Authni tekshirish
//         const storedData = await AsyncStorage.getItem("authData");
//         const parsedData = storedData ? JSON.parse(storedData) : null;
//         const access = parsedData?.access;
//         const role = parsedData?.role;

//         let route = AppRoutes.auth.auth;
//         if (access && role === "Customer")
//           route = AppRoutes.customer.getOrder.index;
//         else if (access && role === "Driver")
//           route = AppRoutes.driver.orders.index;

//         setNextRoute(route);
//       } catch (e) {
//         setNextRoute(AppRoutes.auth.auth);
//       } finally {
//         setReady(true);
//       }
//     };

//     prepareApp();
//   }, []);

//   // 🌀 Splash animatsiyasi
//   useEffect(() => {
//     if (fontsLoaded || fontsError) {
//       scale.value = withSequence(
//         withTiming(1.1, { duration: 1000, easing: Easing.out(Easing.exp) }),
//         withTiming(0.9, { duration: 1000, easing: Easing.out(Easing.exp) }),
//         withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) }, () => {
//           runOnJS(setReady)(true);
//         })
//       );
//     }
//   }, [fontsLoaded, fontsError]);

//   // 🚀 Tayyor bo‘lganda sahifaga o‘tish
//   useEffect(() => {
//     if (ready && nextRoute) {
//       router.replace(nextRoute);
//     }
//   }, [ready, nextRoute]);

//   if (!fontsLoaded && !fontsError) return null;

//   return (
//     <View style={styles.container}>
//       <Animated.View style={animatedStyle}>
//         <SplashScreenIcon size={160} />
//       </Animated.View>
//     </View>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StyleSheet, View } from "react-native";
import { useEffect, useReducer } from "react";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppRoutes } from "@/constants/routes";
import SplashScreenIcon from "@/assets/icon/splash-screen-icon";
import { initLanguage } from "@/locales/_i18n";
import { useThemeColors } from "@/theme/useThemeColors";
import { useFetchUserData } from "@/service/user/get-user-info/controller";

type State = {
  ready: boolean;
  nextRoute: string | null;
};

type Action = { type: "READY"; route: string } | { type: "RESET" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "READY":
      return { ...state, ready: true, nextRoute: action.route };
    case "RESET":
      return { ready: false, nextRoute: null };
    default:
      return state;
  }
};

const Splash = () => {
  const router = useRouter();
  const scale = useSharedValue(0.5);
  const Colors = useThemeColors();
  const fetchUserData = useFetchUserData();
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
  });

  const [state, dispatch] = useReducer(reducer, {
    ready: false,
    nextRoute: null,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // 🔹 Parallel yuklanish: til, auth va font
        await Promise.all([
          initLanguage(),
          checkAuthAndSetRoute(),
          fetchUserData(),
        ]);
      } catch (e) {
        dispatch({ type: "READY", route: AppRoutes.auth.auth });
      }
    };

    const checkAuthAndSetRoute = async () => {
      const stored = await AsyncStorage.getItem("authData");
      const data = stored ? JSON.parse(stored) : null;
      const access = data?.access;
      const role = data?.role;
      let route = AppRoutes.auth.auth;

      if (access && role === "Customer")
        route = AppRoutes.customer.getOrder.index;
      // route = AppRoutes.driver.orders.index;
      else if (access && role === "Driver")
        route = AppRoutes.driver.orders.index;

      dispatch({ type: "READY", route });
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      scale.value = withSequence(
        withTiming(1.1, { duration: 900, easing: Easing.ease }),
        withTiming(0.9, { duration: 900, easing: Easing.ease }),
        withTiming(1, { duration: 800, easing: Easing.ease }, () => {
          if (state.ready && state.nextRoute) {
            runOnJS(router.replace)(state.nextRoute);
          }
        })
      );
    }
  }, [fontsLoaded, state.ready]);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.pageBackground }]}
    >
      <Animated.View style={animatedStyle}>
        <SplashScreenIcon size={160} />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
