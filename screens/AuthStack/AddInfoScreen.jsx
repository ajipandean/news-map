import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View, StyleSheet, Image, TouchableOpacity, Platform, ToastAndroid,
} from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

import AuthContext from '../../context/AuthContext';
import firebase from '../../firebase.config';

export default function AddInfoScreen() {
  const { colors } = useTheme();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.surface,
    },
    image_wrapper: {
      alignSelf: 'center',
    },
    avatar: {
      width: 120,
      height: 120,
      resizeMode: 'cover',
      borderRadius: 100,
    },
    form: { padding: 16 },
    input: { marginBottom: 16 },
  });
  async function requestPermissions() {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') throw new Error('No access to media gallery.');
        return true;
      }
      return false;
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
      return false;
    }
  }
  async function handleImagePicker() {
    try {
      const granted = await requestPermissions();
      if (granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [1, 1],
        });
        if (!result.cancelled) setImage(result.uri);
      }
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  }
  async function handleUpdateProfile() {
    setLoading(true);
    try {
      if (!name) throw new Error('Name cannot be empty.');
      await updateProfile(image, name);
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.image_wrapper}
        onPress={handleImagePicker}
      >
        <Image
          style={styles.avatar}
          source={{ uri: image || 'https://style.anu.edu.au/_anu/4/images/placeholders/person.png' }}
        />
      </TouchableOpacity>
      <View style={styles.form}>
        <TextInput
          dense
          mode="outlined"
          value={name}
          onChangeText={(v) => setName(v)}
          style={styles.input}
          placeholder="Enter display name"
        />
        <Button
          loading={loading}
          mode="contained"
          onPress={handleUpdateProfile}
        >
          Save
        </Button>
      </View>
    </View>
  );
}
