import React, { useReducer, useEffect, useMemo } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import RootStackRegister from '../registers/RootStackRegister';
import AuthStackRegister from '../registers/AuthStackRegister';
import AuthContext from '../context/AuthContext';
import firebase from '../firebase.config';

const RootStack = createStackNavigator();

const initialState = {
  isLogout: false,
  token: null,
};

export default function RootStackNavigation() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
        case 'LOGIN':
          return {
            ...prevState,
            isLogout: false,
            token: action.token,
          };
        case 'LOGOUT':
          return {
            ...prevState,
            isLogout: true,
            token: null,
          };
        default:
          return prevState;
      }
    },
    initialState,
  );
  useEffect(() => {
    (async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
      } catch (err) {
        token = null;
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      }
      dispatch({ type: 'RESTORE_TOKEN', token });
    })();
  }, []);
  const authContext = useMemo(
    () => ({
      async register(email, password) {
        try {
          const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
          const { uid } = user;
          await AsyncStorage.setItem('token', uid);
          return true;
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
          return false;
        }
      },
    }),
  );
  return (
    <AuthContext.Provider value={authContext}>
      <RootStack.Navigator>
        {state.token ? (
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
    </AuthContext.Provider>
  );
}
