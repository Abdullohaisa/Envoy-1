import { Radius, screens } from "@/shared/token";
import { StyleSheet } from "react-native";

export const orderItemStyle = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: screens.width - 10,
  },
  item: {
    width: "100%",
    justifyContent: "flex-start",
    overflow: "hidden",
    paddingVertical: 5,
    paddingHorizontal: screens.width * 0.03,
    paddingBottom: 10,
    borderRadius: 20,
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
    color: "#FFF",
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
    color: "silver",
    fontSize: 12,
  },
  itemLengthBox: {
    justifyContent: "center",
  },
});
