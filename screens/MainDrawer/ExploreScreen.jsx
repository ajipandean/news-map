import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, useWindowDimensions } from 'react-native';

import CustomMarker from '../../components/android/explore/CustomMarker';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    map: {
      width,
      height,
    },
  });
  return (
    <>
      <MapView
        showTraffics
        loadingEnabled
        rotateEnabled={false}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <CustomMarker />
      </MapView>
    </>
  );
}
