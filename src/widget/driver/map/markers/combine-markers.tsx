import { Image } from "expo-image";
import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

type Props = {
  combineOrder: any[];
  markerReady: boolean;
  Colors: any;
  handleMarkerPress: (order: any) => void;
};

const CombineOrderMarkers: React.FC<Props> = ({
  combineOrder,
  markerReady,
  Colors,
  handleMarkerPress,
}) => {
  if (!combineOrder?.length) return null;

  return (
    <>
      {combineOrder.map((order) => {
        const coord = order?.locations?.pickup?.[0]?.coordinates;
        if (!coord) return null;

        const latitude = Number(coord.latitude);
        const longitude = Number(coord.longitude);

        if (!latitude || !longitude) return null;

        return (
          <Marker
            key={order.id}
            coordinate={{ latitude, longitude }}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={!markerReady}
            onPress={() => handleMarkerPress(order)}
          >
            <Image
              source={require("../../../../assets/image//dote.png")}
              style={{ width: 18, height: 18 }}
            />
          </Marker>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  point: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
});

export default memo(CombineOrderMarkers);
