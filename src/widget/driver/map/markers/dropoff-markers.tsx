import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";

type SelectedOrderDropoffMarkersProps = {
  dropoffLocations: any[];
  markerReady: boolean;
  Colors: any;
};

const SelectedOrderDropoffMarkers: React.FC<
  SelectedOrderDropoffMarkersProps
> = ({ dropoffLocations, markerReady, Colors }) => {
  return (
    <>
      {dropoffLocations.map(
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
                    borderColor: Colors.green,
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

export default SelectedOrderDropoffMarkers;
