import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Searchbar, useTheme } from 'react-native-paper';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
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
      <Searchbar
        value={query}
        selectionColor={colors.placeholder}
        onChangeText={(v) => setQuery(v)}
        style={styles.searchbar}
        placeholder="Search for place"
      />
      <FAB icon="plus" color="black" style={styles.fab} onPress={() => {}} />
    </View>
  );
}
