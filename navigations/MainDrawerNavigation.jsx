import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import mainDrawerRegister from '../registers/mainDrawerRegister';
import CustomDrawerContent from '../components/android/CustomDrawerContent';

const MainDrawer = createDrawerNavigator();

export default function MainDrawerNavigation() {
  return (
    <MainDrawer.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: true }}
      drawerType="slide"
      drawerStyle={{
        marginVertical: 0,
        paddingVertical: 0,
        borderColor: '#e0e0e0',
        borderRightWidth: 1,
      }}
      overlayColor={1}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        labelStyle: { fontWeight: 'bold' },
        itemStyle: { marginVertical: 0 },
      }}
    >
      {mainDrawerRegister.map((s) => (
        <MainDrawer.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            ...s.options,
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={s.icon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </MainDrawer.Navigator>
  );
}
