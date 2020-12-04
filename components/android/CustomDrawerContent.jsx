import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Title } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default function CustomDrawerContent(props) {
  const styles = StyleSheet.create({
    header: {
      height: 52,
      paddingHorizontal: 12,
      justifyContent: 'center',
    },
  });
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Title>Peta</Title>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
