import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ToastAndroid,
  Text,
} from 'react-native';
import {
  FAB, Title, Avatar, useTheme,
} from 'react-native-paper';

import mapConfig from '../../config/map';
import firebase from '../../firebase.config';

export default function ExploreScreen() {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const { navigate } = useNavigation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const list = [];
      try {
        const postsRef = firebase.firestore().collection('posts');
        const querySnapshot = await postsRef.get();
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setPosts([...list]);
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      }
    })();
  });
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
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    callout_inner: {
      width: 250,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.surface,
    },
    post_title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    author: { marginTop: 4 },
    author_email: {
      fontSize: 12,
      color: colors.placeholder,
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
      <MapView {...mapConfig} style={styles.map}>
        {posts.map((post, i) => (
          <MapView.Marker
            key={`item-${i}`}
            coordinate={{
              latitude: post.location.lat,
              longitude: post.location.long,
            }}
          >
            <MapView.Callout tooltip style={styles.callout}>
              <View style={styles.callout_inner}>
                <Text style={styles.post_title}>{post.description}</Text>
                <View style={styles.author}>
                  <Text>{post.user.displayName}</Text>
                  <Text style={styles.author_email}>{post.user.email}</Text>
                </View>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
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
