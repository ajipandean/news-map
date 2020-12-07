import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

export default function AddInfoScreen() {
  const { colors } = useTheme();
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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.image_wrapper}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://style.anu.edu.au/_anu/4/images/placeholders/person.png' }}
        />
      </TouchableOpacity>
      <View style={styles.form}>
        <TextInput
          dense
          mode="outlined"
          style={styles.input}
          placeholder="Enter display name"
        />
        <Button
          mode="contained"
        >
          Save
        </Button>
      </View>
    </View>
  );
}
