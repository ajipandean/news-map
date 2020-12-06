import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';
import { FAB, Searchbar, useTheme } from 'react-native-paper';

import mapConfig from '../../config/map';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const { navigate } = useNavigation();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    map: { width, height },
    searchbar: {
      position: 'absolute',
      top: 16,
      left: 0,
      margin: 16,
      borderRadius: 100,
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      margin: 16,
      backgroundColor: colors.surface,
    },
  });
  async function handleNavigateToCamera() {
    try {
      const { granted } = await Camera.requestPermissionsAsync();
      if (!granted) throw new Error('No access to camera.');
      navigate('camera');
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  }
  return (
    <View style={styles.container}>
      <MapView {...mapConfig} style={styles.map} />
      <Searchbar
        value={query}
        selectionColor="black"
        onChangeText={(v) => setQuery(v)}
        style={styles.searchbar}
        placeholder="Search for place"
      />
      <FAB
        icon="plus"
        color="black"
        style={styles.fab}
        onPress={handleNavigateToCamera}
      />
    </View>
  );
}
