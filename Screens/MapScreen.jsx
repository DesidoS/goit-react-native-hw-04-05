import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const Map = ({ route }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
        mapType="standard"
        // minZoomLevel={20}
        // onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 30,
  },
});
