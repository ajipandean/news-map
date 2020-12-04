import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import mainDrawerRegister from '../registers/mainDrawerRegister';

const MainDrawer = createDrawerNavigator();

export default function MainDrawerNavigation() {
  return (
    <MainDrawer.Navigator>
      {mainDrawerRegister.map((s) => (
        <MainDrawer.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={s.options}
        />
      ))}
    </MainDrawer.Navigator>
  );
}
