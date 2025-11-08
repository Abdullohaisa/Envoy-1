import { Radius, Spacing, screens } from "@/shared/token";
import { StyleSheet } from "react-native";

export const orderItemStyle = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: screens.width,
    // paddingHorizontal: 5,
  },
  item: {
    width: "100%",
    justifyContent: "flex-start",
    overflow: "hidden",
    paddingVertical: Spacing.horizontal,
    paddingTop: Spacing.horizontal,
    paddingHorizontal: screens.width * 0.03,
    paddingBottom: 10,
    // borderRadius: 10,
    gap: 10,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  infoBox: {
    gap: 3,
    flexDirection: "column",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    gap: 7,
    flexWrap: "wrap",
  },
  orderTypeBox: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  orderType: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  locationItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  locationItemText: {
    fontSize: 14,
    color: "#fff",
  },
  line: {
    width: "100%",
    height: 1,
  },
  itemLength: {
    fontSize: 12,
  },
  itemLengthBox: {
    justifyContent: "center",
  },
});
