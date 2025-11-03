import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColors } from "@/theme/useThemeColors";
import LocationIcon from "@/assets/icon/location";

const LocationPickerSkeletonItem = () => {
  const Colors = useThemeColors();
  return (
    <View style={[styles.skeletonItem]}>
      <View style={{ marginHorizontal: 15, paddingTop: 15 }}>
        <LocationIcon size={20} color={Colors.borderColor} />
      </View>
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderColor: Colors.Boxbackground,
          paddingVertical: 15,
          gap: 5,
        }}
      >
        <View
          style={[
            styles.skeletonTitle,
            { backgroundColor: Colors.borderColor },
          ]}
        />
        <View
          style={[
            styles.skeletonSubtitle,
            { backgroundColor: Colors.Boxbackground },
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
    borderRadius: 6,
    marginBottom: 6,
  },
  skeletonSubtitle: {
    width: "40%",
    height: 12,
    borderRadius: 6,
  },
});
