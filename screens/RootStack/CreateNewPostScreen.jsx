import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import {
  FAB, Button, Divider, useTheme,
} from 'react-native-paper';

import PreviewCarousel from '../../components/android/PreviewCarousel';

export default function CreateScreen() {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [photos, setPhotos] = useState(params.photos);
  const [selected, setSelected] = useState('');
  useEffect(() => {
    (async () => {
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
    })();
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: colors.surface,
    },
    padded: {
      padding: 16,
    },
    image: {
      borderRadius: 4,
      width: 140,
      height: 220,
      resizeMode: 'cover',
    },
    input: { fontSize: 16 },
    helper: {
      fontSize: 12,
      color: colors.placeholder,
    },
    fab: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      margin: 16,
      backgroundColor: colors.surface,
    },
  });
  function handleRemove(uri) {
    setPhotos(photos.filter((photo) => photo.uri !== uri));
    setSelected(uri);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, paddingBottom: 56 }}>
        <View style={{
          position: 'relative',
          paddingVertical: 16,
        }}
        >
          <PreviewCarousel
            photos={photos}
            dimension={1}
            padding={12}
          />
          <FAB
            small
            icon="image-plus"
            style={styles.fab}
            color={colors.primary}
            onPress={() => navigate('camera', photos)}
          />
        </View>
        <Divider />
        <View style={styles.padded}>
          <TextInput
            multiline
            style={styles.input}
            placeholder="What's happening?"
          />
        </View>
        <Divider />
        <View style={styles.padded}>
          <Text style={styles.helper}>
            The location of this post will be adjusted automatically.
          </Text>
        </View>
        <Divider />
        <View style={styles.padded}>
          <Button
            mode="contained"
            onPress={() => {}}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
