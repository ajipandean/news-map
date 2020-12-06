import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Text,
} from 'react-native';
import { FAB, Divider, useTheme } from 'react-native-paper';

export default function CreateScreen() {
  const { params } = useRoute();
  const { colors } = useTheme();
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
      borderRadius: 8,
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
      bottom: 0,
      right: 0,
      margin: 16,
      backgroundColor: colors.primary,
    },
  });
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, paddingBottom: 56 }}>
        <View style={styles.padded}>
          <Image
            style={styles.image}
            source={{ uri: params.photo.uri }}
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
      </ScrollView>
      <FAB
        icon="send"
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
}
