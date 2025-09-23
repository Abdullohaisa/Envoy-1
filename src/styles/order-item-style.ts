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
    borderRadius: Radius.primary,
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
  },
  row: {
    flexDirection: "row",
    gap: 5,
  },
  orderTypeBox: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    flex: 1,
    borderRadius: 5,
  },
  orderType: {
    fontSize: 12,
    color: "#FFF",
    width: "100%",
    textAlign: "center",
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
    backgroundColor: "#444",
    marginVertical: 5,
  },
  itemLength: {
    color: "silver",
    fontSize: 12,
  },
  itemLengthBox: {
    justifyContent: "center",
  },
});
