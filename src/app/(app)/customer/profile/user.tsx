import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { useThemeColors } from "@/theme/useThemeColors";

const EditCustomerProflePage = () => {
  const Colors = useThemeColors();
  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: Colors.pageBackground,
      }}
    >
      <PageHeader title="Tahrirlash" enableBack />
      <Text>EditCustomerPage</Text>
    </View>
  );
};

export default EditCustomerProflePage;

const styles = StyleSheet.create({});
