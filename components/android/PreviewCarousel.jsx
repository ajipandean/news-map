import React from 'react';
import {
  View, FlatList, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const WIDTH = 140;
const HEIGHT = 220;

export default function PreviewCarousel({
  photos, dimension, selected, handleRemove,
}) {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      position: 'relative',
      marginHorizontal: 4,
      borderRadius: 4,
      overflow: 'hidden',
    },
    image: {
      width: WIDTH * dimension,
      height: HEIGHT * dimension,
      resizeMode: 'cover',
    },
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 2,
    },
  });
  return (
    <>
      <FlatList
        horizontal
        data={photos}
        extraData={selected}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        keyExtractor={(item, index) => `photos-${index}`}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <Image
              style={styles.image}
              source={{ uri: item.uri }}
            />
            <TouchableOpacity
              style={styles.close}
              onPress={() => handleRemove(item.uri)}
            >
              <MaterialCommunityIcons
                size={18}
                color={colors.surface}
                name="close-circle-outline"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
}
