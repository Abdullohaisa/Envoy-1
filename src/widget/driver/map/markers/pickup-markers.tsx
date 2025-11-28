import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

type SelectedOrderPickupMarkersProps = {
  pickupLocations: any[];
  markerReady: boolean;
  Colors: any;
};

const SelectedOrderPickupMarkers: React.FC<SelectedOrderPickupMarkersProps> = ({
  pickupLocations,
  markerReady,
  Colors,
}) => {
  return (
    <>
      {pickupLocations.map(
        (loc, index) =>
          loc?.coordinates && (
            <Marker
              key={index}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={{
                latitude: loc.coordinates.latitude,
                longitude: loc.coordinates.longitude,
              }}
              tracksViewChanges={!markerReady}
            >
              <View
                style={[
                  { width: 12, height: 12, borderRadius: 6 },
                  {
                    backgroundColor: "#fff",
                    borderColor: Colors.red,
                    borderWidth: 1,
                  },
                ]}
              />
            </Marker>
          )
      )}
    </>
  );
};

export default SelectedOrderPickupMarkers;
