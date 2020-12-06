import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Searchbar, useTheme } from 'react-native-paper';

import mapConfig from '../../config/map';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const [query, setQuery] = useState('');
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
      <FAB icon="plus" color="black" style={styles.fab} onPress={() => {}} />
    </View>
  );
}
