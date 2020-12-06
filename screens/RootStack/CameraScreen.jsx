import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

export default function CameraScreen() {
  const { colors } = useTheme();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
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
      backgroundColor: colors.backdrop,
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
      <Camera style={styles.camera} type={cameraType}>
        <View style={styles.actions}>
          <IconButton
            size={28}
            color={colors.surface}
            icon="flash"
            onPress={() => console.log('Fliped')}
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
            onPress={() => console.log('Fliped')}
          />
        </View>
      </Camera>
    </View>
  );
}
