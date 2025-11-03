import { Spacing } from "@/shared/token";
import { StyleSheet } from "react-native";

export const locationStyles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 4,
    gap: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
  },
  scrollView: {
    flexGrow: 0,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.horizontal,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationButton: {
    flex: 1,
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
