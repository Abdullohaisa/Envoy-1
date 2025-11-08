import { screens } from "@/shared/token";
import { StyleSheet } from "react-native";

export const styleUser = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarWrapper: {
    width: screens.width,
    height: screens.height * 0.4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: { width: "100%", height: "100%" },
  avatarText: { fontSize: 55 },
  editBox: {
    position: "absolute",
    right: 10,
    bottom: 10,
    flexDirection: "row",
    gap: 4,
    borderRadius: 14,
  },
  editPhoto: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  infoCard: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 81,
    justifyContent: "center",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontWeight: "500", marginBottom: 6 },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  fullscreen: {
    position: "absolute",
    width: screens.width,
    height: screens.height,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  fullscreenImage: { width: "100%", height: "100%", resizeMode: "contain" },
});
