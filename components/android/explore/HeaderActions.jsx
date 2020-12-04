import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function CreateEventIcon() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginRight: 6,
    },
  });
  return (
    <View style={styles.container}>
      <IconButton
        icon="plus-box-outline"
        size={24}
        color={colors.placeholder}
        onPress={() => {}}
      />
      <IconButton
        icon="magnify"
        size={24}
        color={colors.placeholder}
        onPress={() => {}}
      />
    </View>
  );
}
