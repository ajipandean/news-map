import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MainBottomTabsRegister from '../registers/MainBottomTabsRegister';

const MainBottomTabs = createMaterialBottomTabNavigator();

export default function MainBottomTabsNavigation() {
  return (
    <MainBottomTabs.Navigator>
      {MainBottomTabsRegister.map((s) => (
        <MainBottomTabs.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            ...s.options,
          }}
        />
      ))}
    </MainBottomTabs.Navigator>
  );
}
