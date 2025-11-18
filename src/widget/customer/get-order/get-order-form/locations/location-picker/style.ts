import { Spacing } from "@/shared/token";
import { StyleSheet } from "react-native";

export const locationStyles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
  locationItem: {
    flexDirection: "column",
    alignItems: "center",
    padding: Spacing.horizontal,
  },
  locationButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 16,
    lineHeight: 25,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
});
