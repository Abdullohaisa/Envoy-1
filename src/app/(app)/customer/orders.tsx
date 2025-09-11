import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const orderData = {
  status: "inProgress",
  time: {
    createdAt: "2025-08-25T09:00:00Z",
    shouldStartAt: "2025-08-25T11:00:00Z",
  },
  cargo: {
    type: "Meva",
    length: 2.5,
    width: 1.5,
    height: 1.0,
    volume: 2,
    quantity: 10,
  },
  distances: {
    totalDistance: 150,
    driverToPickup: 20,
    pickupToDropOff: 130,
  },
  trucks: [
    {
      id: "truck-1",
      type: "Kamaz",
      driver: null,
      status: "new",
      time: {
        assignedAt: null,
        expectedArrivalAt: null,
        arrivedAt: null,
        pickedUpAt: null,
        deliveredAt: null,
      },
    },
    {
      id: "truck-2",
      type: "Isuzu",
      driver: { name: "Olimjon" },
      status: "onTheWayToPickup",
      time: {
        assignedAt: "2025-08-25T12:00:00Z",
        expectedArrivalAt: "2025-08-25T12:30:00Z",
        arrivedAt: null,
        pickedUpAt: null,
        deliveredAt: null,
      },
    },
    {
      id: "truck-3",
      type: "MAN",
      driver: { name: "Sardor" },
      status: "pickedUp",
      time: {
        assignedAt: "2025-08-25T11:30:00Z",
        expectedArrivalAt: "2025-08-25T12:00:00Z",
        arrivedAt: "2025-08-25T12:05:00Z",
        pickedUpAt: "2025-08-25T12:20:00Z",
        deliveredAt: null,
      },
    },
    {
      id: "truck-4",
      type: "DAF",
      driver: { name: "Javlon" },
      status: "delivered",
      time: {
        assignedAt: "2025-08-25T10:30:00Z",
        expectedArrivalAt: "2025-08-25T11:00:00Z",
        arrivedAt: "2025-08-25T11:05:00Z",
        pickedUpAt: "2025-08-25T11:15:00Z",
        deliveredAt: "2025-08-25T13:30:00Z",
      },
    },
  ],
};

const truckSteps = ["new", "onTheWayToPickup", "pickedUp", "delivered"];

const Order = () => {
  return (
    <View style={styles.container}>
      {/* Buyurtma umumiy ma'lumot */}
      <View style={styles.orderCard}>
        <Text style={styles.title}>📦 Buyurtma ma'lumotlari</Text>
        <Text style={styles.info}>Holat: {orderData.status}</Text>
        <Text style={styles.info}>Yaratilgan: {orderData.time.createdAt}</Text>
        <Text style={styles.info}>
          Rejalashtirilgan boshlanish: {orderData.time.shouldStartAt}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛒 Yuk</Text>
          <Text style={styles.info}>Turi: {orderData.cargo.type}</Text>
          <Text style={styles.info}>
            O‘lcham: {orderData.cargo.length}m × {orderData.cargo.width}m ×{" "}
            {orderData.cargo.height}m
          </Text>
          <Text style={styles.info}>Hajmi: {orderData.cargo.volume} m³</Text>
          <Text style={styles.info}>Soni: {orderData.cargo.quantity} dona</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Masofa</Text>
          <Text style={styles.info}>
            Umumiy: {orderData.distances.totalDistance} km
          </Text>
          <Text style={styles.info}>
            Haydovchi → Yuklash: {orderData.distances.driverToPickup} km
          </Text>
          <Text style={styles.info}>
            Yuklash → Yetkazish: {orderData.distances.pickupToDropOff} km
          </Text>
        </View>
      </View>

      {/* Yuk mashinalar ro'yxati */}
      <FlatList
        data={orderData.trucks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.truckCard}>
            <Text style={styles.truckTitle}>
              🚚 {item.type} ({item.id})
            </Text>
            <Text style={styles.info}>
              Haydovchi: {item.driver ? item.driver.name : "Biriktirilmagan"}
            </Text>
            <Text style={styles.info}>Status: {item.status}</Text>

            {/* Vaqtlar */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⏱️ Vaqtlar</Text>
              <Text style={styles.info}>
                Tayinlangan: {item.time.assignedAt || "—"}
              </Text>
              <Text style={styles.info}>
                Yetib kelishi kerak: {item.time.expectedArrivalAt || "—"}
              </Text>
              <Text style={styles.info}>
                Yetib kelgan: {item.time.arrivedAt || "—"}
              </Text>
              <Text style={styles.info}>
                Yuk ortilgan: {item.time.pickedUpAt || "—"}
              </Text>
              <Text style={styles.info}>
                Yetkazilgan: {item.time.deliveredAt || "—"}
              </Text>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBar}>
              {truckSteps.map((step, index) => {
                const active = truckSteps.indexOf(item.status) >= index;
                return (
                  <View key={index} style={styles.progressStep}>
                    <View
                      style={[
                        styles.circle,
                        active ? styles.activeCircle : styles.inactiveCircle,
                      ]}
                    />
                    {index < truckSteps.length - 1 && (
                      <View
                        style={[
                          styles.line,
                          active ? styles.activeLine : styles.inactiveLine,
                        ]}
                      />
                    )}
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F4F7FB",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2A2D43",
    marginBottom: 10,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 4,
  },
  info: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  truckCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  truckTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
  },
  activeCircle: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  inactiveCircle: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  line: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  activeLine: {
    backgroundColor: "#4A90E2",
  },
  inactiveLine: {
    backgroundColor: "#ccc",
  },
  stepText: {
    fontSize: 10,
    color: "#444",
    marginTop: 4,
  },
});
