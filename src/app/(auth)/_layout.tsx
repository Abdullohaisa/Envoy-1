import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLaout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "ios_from_right",
        gestureEnabled: true,
      }}
    />
  );
};

export default AuthLaout;
