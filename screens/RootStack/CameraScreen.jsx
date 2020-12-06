import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const BACK = Camera.Constants.Type.back;
const FRONT = Camera.Constants.Type.front;
const FLASH_ON = Camera.Constants.FlashMode.on;
const FLASH_OFF = Camera.Constants.FlashMode.off;

export default function CameraScreen() {
  const { colors } = useTheme();
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
    capture: {
      width: 65,
      height: 65,
      borderRadius: 100,
      marginHorizontal: 50,
      borderColor: colors.surface,
      borderWidth: 3,
      backgroundColor: 'transparent',
    },
  });
  return (
    <View style={styles.container}>
      <Camera
        ratio="16:9"
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
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
            onPress={() => console.log('Captured')}
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
