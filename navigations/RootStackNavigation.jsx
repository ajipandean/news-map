import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RootStackRegister from '../registers/RootStackRegister';

const RootStack = createStackNavigator();

export default function RootStackNavigation() {
  return (
    <RootStack.Navigator>
      {RootStackRegister.map((s) => (
        <RootStack.Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            ...s.options,
          }}
        />
      ))}
    </RootStack.Navigator>
  );
}
