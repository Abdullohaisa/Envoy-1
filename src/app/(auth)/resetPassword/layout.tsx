import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ResetLayout = () => {
  return <Stack screenOptions={{ animation: "fade_from_bottom" }} />;
};

export default ResetLayout;
