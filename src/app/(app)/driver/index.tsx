import { Button, Text, View } from "react-native";
import React from "react";
import { useSetAtom } from "jotai";
import { logoutAtom } from "@/service/auth/controller";
import { router } from "expo-router";
import { AppRoutes } from "@/constants/routes";

const Driver = () => {
  const setLogout = useSetAtom(logoutAtom);
  const handleLogout = () => {
    try {
      setLogout();
      router.replace(AppRoutes.auth.welcome);
    } catch (error) {}
  };

  return (
    <View>
      <Text>Driver</Text>
      <Button title={"Logout"} onPress={handleLogout} />
    </View>
  );
};

export default Driver;
