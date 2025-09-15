import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import PageHeader from "@/components/Header/PageHeader/PageHeader";
import { Spacing } from "@/shared/token";
import { APIKEY } from "@/constants/locations";
import MapView, { UrlTile, Marker } from "react-native-maps";

const LocationForm = () => {
  const webviewRef = useRef<WebView>(null);

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="Manzil" enableBack />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 41.3387,
          longitude: 69.3412,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* HERE tile layer */}
        <UrlTile
          urlTemplate={`https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${APIKEY}`}
          maximumZ={20}
          flipY={false}
          subdomains={["1", "2", "3", "4"]}
        />

        {/* Marker */}
        <Marker
          coordinate={{ latitude: 41.3387, longitude: 69.3412 }}
          title="Yuk ortiladigan joy"
        />
      </MapView>
    </View>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.horizontal },
});
