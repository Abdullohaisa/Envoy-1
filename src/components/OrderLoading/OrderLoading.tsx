import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import AppText from "../Texts/Text";

const OrderLoading = memo(({ Colors }: any) => (
  <View style={styles.centerBox}>
    <AppText style={{ color: Colors.textSecondary, textAlign: "center" }}>
      Ma'lumotlar yuklanmoqda...
    </AppText>
  </View>
));

export default OrderLoading;

const styles = StyleSheet.create({
  centerBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
