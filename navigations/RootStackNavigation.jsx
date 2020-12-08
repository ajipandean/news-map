import React, { useReducer, useEffect, useMemo } from 'react';
import { ToastAndroid, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

import _ from 'lodash';
import RootStackRegister from '../registers/RootStackRegister';
import AuthStackRegister from '../registers/AuthStackRegister';
import AuthContext from '../context/AuthContext';
import firebase from '../firebase.config';

// Ignore firebase upload warning
LogBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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
      async login(email, password) {
        try {
          const data = await firebase.auth().signInWithEmailAndPassword(email, password);
          const { uid } = data.user;
          await AsyncStorage.setItem('token', uid);
          dispatch({ type: 'LOGIN', token: uid });
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
        }
      },
      async register(email, password) {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          return true;
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
          return false;
        }
      },
      async logout() {
        try {
          await firebase.auth().signOut();
          await AsyncStorage.removeItem('token');
          dispatch({ type: 'LOGOUT', token: null });
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
        }
      },
      async updateProfile(photoURL, displayName) {
        try {
          const user = firebase.auth().currentUser;
          const { uid } = user;
          const response = await fetch(photoURL);
          const blobFile = await response.blob();
          const storageRef = firebase.storage().ref('avatars').child(`${uid}.jpg`);
          await storageRef.put(blobFile);
          const downloadURL = await storageRef.getDownloadURL();
          await user.updateProfile({
            photoURL: downloadURL,
            displayName,
          });
          await AsyncStorage.setItem('token', uid);
          dispatch({ type: 'LOGIN', token: uid });
        } catch (err) {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
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
