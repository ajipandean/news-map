import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import {
  View, StyleSheet, TouchableOpacity, ToastAndroid,
} from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const BACK = Camera.Constants.Type.back;
const FRONT = Camera.Constants.Type.front;
const FLASH_ON = Camera.Constants.FlashMode.on;
const FLASH_OFF = Camera.Constants.FlashMode.off;

export default function CameraScreen() {
  const { colors } = useTheme();
  const cameraRef = useRef(null);
  const { navigate } = useNavigation();
  const [cameraType, setCameraType] = useState(BACK);
  const [flashMode, setFlashMode] = useState(FLASH_OFF);
  const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    actions: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
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
  });
  async function handleCapture() {
    try {
      await cameraRef.current.takePictureAsync({
        skipProcessing: true,
        onPictureSaved: (photo) => {
          navigate('create-new-post', { photo });
        },
      });
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
      </Camera>
    </View>
  );
}
