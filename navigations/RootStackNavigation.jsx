import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import appStackRegister from '../registers/appStackRegister';

const RootStack = createStackNavigator();

export default function RootStackNavigation() {
  return (
    <RootStack.Navigator
      mode="modal"
      headerMode="float"
      initialRouteName="main-drawer"
      screenOptions={{ headerShown: false }}
    >
      {appStackRegister.map((s) => (
        <RootStack.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={s.options}
        />
      ))}
    </RootStack.Navigator>
  );
}
