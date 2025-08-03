import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Ruxsat berilmadi");
      return null;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("TOKEN:", token);
  } else {
    alert("Fizik qurilmada sinab ko‘ring");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
}

export default function NotificationTest() {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log("Returned token:", token);
      if (token) setExpoPushToken(token);
    });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Push token:</Text>
      <Text selectable>{expoPushToken || "Token olinmadi"}</Text>
    </View>
  );
}
