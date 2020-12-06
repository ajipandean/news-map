import React from 'react';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MainBottomTabsRegister from '../registers/MainBottomTabsRegister';

const MainBottomTabs = createMaterialBottomTabNavigator();

export default function MainBottomTabsNavigation() {
  const { colors } = useTheme();
  return (
    <MainBottomTabs.Navigator
      shifting={false}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.surface,
      }}
    >
      {MainBottomTabsRegister.map((s) => (
        <MainBottomTabs.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            ...s.options,
            tabBarIcon: ({ focused, color }) => (
              <MaterialCommunityIcons
                name={focused ? s.icon.active : s.icon.inactive}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </MainBottomTabs.Navigator>
  );
}
