import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import LocationIcon from "@/assets/icon/location";

const LocationPickerSkeletonItem = () => {
  const Colors = useThemeColors();
  return (
    <View style={[styles.skeletonItem]}>
      <View style={{ marginHorizontal: 15, paddingTop: 15 }}>
        <LocationIcon size={20} color={Colors.borderColor08} />
      </View>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderColor: Colors.Boxbackground06,
          paddingVertical: 15,
          gap: 5,
        }}
      >
        <View
          style={[
            styles.skeletonTitle,
            { backgroundColor: Colors.borderColor08 },
          ]}
        />
        <View
          style={[
            styles.skeletonSubtitle,
            { backgroundColor: Colors.borderColor06 },
          ]}
        />
      </View>
    </View>
  );
};

export default LocationPickerSkeletonItem;

const styles = StyleSheet.create({
  skeletonItem: {
    flexDirection: "row",
    // alignItems: "center",
  },
  skeletonTitle: {
    width: "60%",
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    marginBottom: 6,
  },
  skeletonSubtitle: {
    width: "40%",
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
});
