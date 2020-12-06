import React, { useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import { Button, IconButton, useTheme } from 'react-native-paper';

import PreviewCarousel from '../../components/android/PreviewCarousel';

const BACK = Camera.Constants.Type.back;
const FRONT = Camera.Constants.Type.front;
const FLASH_ON = Camera.Constants.FlashMode.on;
const FLASH_OFF = Camera.Constants.FlashMode.off;

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const { params } = useRoute();
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [photos, setPhotos] = useState(params.photos);
  const [selected, setSelected] = useState('');
  const [cameraType, setCameraType] = useState(BACK);
  const [flashMode, setFlashMode] = useState(FLASH_OFF);
  const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    section: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
    photos: { flexDirection: 'row' },
    actions: {
      padding: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchable: {
      padding: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      marginHorizontal: 50,
      borderRadius: 100,
    },
    capture: {
      width: 58,
      height: 58,
      borderRadius: 100,
      backgroundColor: colors.surface,
    },
    next: {
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 12,
      backgroundColor: colors.surface,
    },
  });
  async function handleCapture() {
    try {
      await cameraRef.current.takePictureAsync({
        skipProcessing: true,
        onPictureSaved: (photo) => {
          setPhotos([...photos, photo]);
        },
      });
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  }
  function handleRemove(uri) {
    setPhotos(photos.filter((photo) => photo.uri !== uri));
    setSelected(uri);
  }
  function handleRedirect() {
    try {
      if (photos.length === 0) throw new Error('Photos empty.');
      navigate('create-new-post', { photos });
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    }
  }
  return (
    <View style={styles.container}>
      <Camera
        ratio="16:9"
        ref={cameraRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        onMountError={(err) => ToastAndroid.show(err.message, ToastAndroid.LONG)}
      >
        <View style={styles.section}>
          <View style={styles.photos}>
            <PreviewCarousel
              photos={photos}
              dimension={0.4}
              selected={selected}
              handleRemove={handleRemove}
              mode="editable"
              padding={4}
            />
          </View>
          <View style={styles.actions}>
            <IconButton
              animated
              size={28}
              color={colors.surface}
              icon={flashMode === FLASH_OFF ? 'flash-off' : 'flash'}
              onPress={() => setFlashMode(flashMode === FLASH_OFF ? FLASH_ON : FLASH_OFF)}
            />
            <TouchableOpacity
              rippleColor="rgba(0,0,0,0.8)"
              onPress={handleCapture}
              style={styles.touchable}
            >
              <View style={styles.capture} />
            </TouchableOpacity>
            <IconButton
              size={28}
              color={colors.surface}
              icon="camera-party-mode"
              onPress={() => setCameraType(cameraType === BACK ? FRONT : BACK)}
            />
          </View>
        </View>
      </Camera>
      <Button
        mode="contained"
        color={colors.surface}
        icon="arrow-right"
        style={styles.next}
        onPress={handleRedirect}
      >
        Next
      </Button>
      <StatusBar hidden />
    </View>
  );
}
