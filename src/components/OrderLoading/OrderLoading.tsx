import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import AppText from "../Texts/Text";
import { useTranslation } from "react-i18next";

const OrderLoading = memo(({ Colors }: any) => {
  const { t } = useTranslation();
  return (
    <View style={styles.centerBox}>
      <AppText style={{ color: Colors.textSecondary, textAlign: "center" }}>
        {t("loading_data")}
      </AppText>
    </View>
  );
});

export default OrderLoading;

const styles = StyleSheet.create({
  centerBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
