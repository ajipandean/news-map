import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function CustomMarker() {
  const { fonts, colors } = useTheme();
  const styles = StyleSheet.create({
    tooltip: {
      width: 220,
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 4,
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 140,
      backgroundColor: '#e0e0e0',
      resizeMode: 'cover',
    },
    detail: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    detail_title: {
      ...fonts.medium,
      marginBottom: 4,
    },
    detail_author: {
      marginBottom: 8,
      color: colors.placeholder,
    },
    detail_time: {
      fontSize: 12,
      color: colors.placeholder,
    },
  });
  return (
    <Marker
      coordinate={{
        latitude: 37.78825,
        longitude: -122.4324,
      }}
    >
      <Callout tooltip>
        <View style={styles.tooltip}>
          <View style={styles.image} />
          <View style={styles.detail}>
            <Text style={styles.detail_title}>
              Usai Mencuri, Dua Pemuda Ditangkap Pesta Narkoba
            </Text>
            <Text style={styles.detail_author}>Pandean Mertayasa</Text>
            <Text style={styles.detail_time}>Selasa, 23 April 2020</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
}
