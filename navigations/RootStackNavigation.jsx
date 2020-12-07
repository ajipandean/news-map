import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RootStackRegister from '../registers/RootStackRegister';
import AuthStackRegister from '../registers/AuthStackRegister';

const RootStack = createStackNavigator();

export default function RootStackNavigation() {
  const [login, setLogin] = useState(false);
  return (
    <RootStack.Navigator>
      {login ? (
        <>
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
        </>
      ) : (
        <>
          {AuthStackRegister.map((s) => (
            <RootStack.Screen
              key={s.name}
              name={s.name}
              component={s.component}
              options={{
                ...s.options,
              }}
            />
          ))}
        </>
      )}
    </RootStack.Navigator>
  );
}
