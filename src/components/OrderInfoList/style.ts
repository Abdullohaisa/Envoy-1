import { StyleSheet } from "react-native";

export const StyleOrderInfoList = StyleSheet.create({
  container: { flex: 1, backgroundColor: "red" },
  section: {
    borderRadius: 20,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 5,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    paddingVertical: 8,
  },
  label: { fontWeight: "400", fontSize: 16 },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  value: { textAlign: "right", fontSize: 16 },
  subBox: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 6,
    elevation: 10,
  },
  mapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  mapLink: { fontWeight: "600" },
  driverCard: {
    borderRadius: 20,
    padding: 5,
    marginVertical: 4,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 17,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "600",
  },
  driverRating: {
    fontSize: 14,
    marginTop: 2,
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  commentCount: {
    marginTop: 6,
    fontSize: 13,
  },

  modalContent: {
    gap: 10,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignSelf: "center",
    overflow: "hidden",
  },
  modalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  modalPhone: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  modalRating: {
    fontSize: 15,
    textAlign: "center",
  },
  modalComment: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
});
