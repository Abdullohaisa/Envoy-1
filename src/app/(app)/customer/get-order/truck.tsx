import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";

const Truck = () => {
  return (
    <View>
      <PageHeader title="Yuk mashina" enableBack />
      <Text>Truck</Text>
    </View>
  );
};

export default Truck;

const styles = StyleSheet.create({});
