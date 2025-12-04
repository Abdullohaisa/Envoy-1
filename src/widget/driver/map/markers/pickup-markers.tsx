import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

type Props = {
  pickupLocations: any[];
  markerReady: boolean;
  Colors: any;
};

const SelectedOrderPickupMarkers: React.FC<Props> = ({
  pickupLocations,
  markerReady,
  Colors,
}) => {
  if (!pickupLocations?.length) return null;

  return (
    <>
      {pickupLocations.map((loc, index) => {
        const coord = loc?.coordinates;
        if (!coord) return null;

        const latitude = Number(coord.latitude);
        const longitude = Number(coord.longitude);

        if (!latitude || !longitude) return null;

        return (
          <Marker
            key={index}
            coordinate={{ latitude, longitude }}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={!markerReady}
          >
            <View style={[styles.point, { borderColor: Colors.red }]} />
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

export default memo(SelectedOrderPickupMarkers);
