import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {
  FAB, Button, Divider, useTheme,
} from 'react-native-paper';

import firebase from '../../firebase.config';
import PreviewCarousel from '../../components/android/PreviewCarousel';

export default function CreateScreen() {
  const { params } = useRoute();
  const { navigate } = useNavigation();
  const { colors } = useTheme();
  const [user, setUser] = useState({});
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (user) {
        setUser(u);
      }
    });
    return () => unsubscribe();
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
  async function handleSaveData() {
    setLoading(true);
    try {
      // upload image - done
      const photos = params.photos.map((i) => i.uri);
      // parse location lat long - done
      const { coords } = await Location.getCurrentPositionAsync();
      // construct posts object
      const post = {
        photos,
        description,
        user: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        location: {
          lat: coords.latitude,
          long: coords.longitude,
        },
      };
      // save to firestore
      await firebase.firestore().collection('posts').add(post);
      navigate('main-bottom-tabs', { screen: 'explore' });
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
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
            photos={params.photos}
            dimension={1}
            padding={12}
          />
          <FAB
            small
            icon="pencil"
            style={styles.fab}
            color={colors.primary}
            onPress={() => navigate('camera', { photos: params.photos })}
          />
        </View>
        <Divider />
        <View style={styles.padded}>
          <TextInput
            multiline
            value={description}
            onChangeText={(v) => setDescription(v)}
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
            loading={loading}
            mode="contained"
            onPress={handleSaveData}
          >
            Save
          </Button>
        </View>
      </ScrollView>
      <StatusBar hidden={false} />
    </View>
  );
}
