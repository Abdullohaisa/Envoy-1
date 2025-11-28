import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

type CombineOrderMarkersProps = {
  combineOrder: any[];
  markerReady: boolean;
  Colors: any;
  handleMarkerPress: (order: any) => void;
};

const CombineOrderMarkers: React.FC<CombineOrderMarkersProps> = ({
  combineOrder,
  markerReady,
  Colors,
  handleMarkerPress,
}) => {
  return (
    <>
      {combineOrder.map((order) => {
        const pickupCoord = order?.locations?.pickup?.[0]?.coordinates;
        if (!pickupCoord) return null;

        return (
          <Marker
            key={order.id}
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: pickupCoord.latitude,
              longitude: pickupCoord.longitude,
            }}
            onPress={() => handleMarkerPress(order)}
            tracksViewChanges={!markerReady}
          >
            <View
              style={[
                { width: 12, height: 12, borderRadius: 6 },
                {
                  backgroundColor: "#fff",
                  borderColor: Colors.primary,
                  borderWidth: 1,
                },
              ]}
            />
          </Marker>
        );
      })}
    </>
  );
};

export default CombineOrderMarkers;
