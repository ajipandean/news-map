import React from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
  Text,
} from 'react-native';
import { FAB, useTheme, Avatar } from 'react-native-paper';

import mapConfig from '../../config/map';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const { navigate } = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    map: { width, height },
    brand: {
      position: 'absolute',
      top: 16,
      left: 0,
      margin: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      margin: 16,
      backgroundColor: colors.primary,
    },
  });
  async function handleNavigateToCamera() {
    try {
      const locationAccess = await Location.requestPermissionsAsync();
      const cameraAccess = await Camera.requestPermissionsAsync();
      if (!locationAccess.granted) throw new Error('No access to user location.');
      if (!cameraAccess.granted) throw new Error('No access to camera.');
      navigate('camera', { photos: [] });
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  }
  return (
    <View style={styles.container}>
      <MapView {...mapConfig} style={styles.map} />
      <View style={styles.brand}>
        <Text style={styles.title}>Merth Apps</Text>
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleNavigateToCamera}
      />
    </View>
  );
}
