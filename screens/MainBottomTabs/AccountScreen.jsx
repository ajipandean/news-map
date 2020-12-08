import React, { useEffect, useState, useContext } from 'react';
import {
  View, Image, StyleSheet, ToastAndroid,
} from 'react-native';
import {
  Appbar, useTheme, Title, Paragraph, Button,
} from 'react-native-paper';

import firebase from '../../firebase.config';
import AuthContext from '../../context/AuthContext';

export default function AccountScreen() {
  const { colors } = useTheme();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (user) {
        setUser(u);
      }
    });
    return () => unsubscribe();
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.surface,
    },
    appbar: { backgroundColor: colors.surface },
    image_wrapper: {
      width: 120,
      height: 120,
      borderRadius: 100,
      overflow: 'hidden',
      marginVertical: 16,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    content: { alignItems: 'center' },
    email: {
      color: colors.placeholder,
      marginBottom: 16,
    },
  });
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {user ? (
        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.Content title="Profile" />
          </Appbar.Header>
          <View style={styles.content}>
            <View style={styles.image_wrapper}>
              <Image
                style={styles.image}
                source={{ uri: user.photoURL || 'https://style.anu.edu.au/_anu/4/images/placeholders/person.png' }}
              />
            </View>
            <Title>{user.displayName}</Title>
            <Paragraph style={styles.email}>{user.email}</Paragraph>
            <Button
              loading={loading}
              mode="contained"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </View>
        </View>
      ) : (
        <View style={[styles.container, {
          alignItems: 'center',
          justifyContent: 'center',
        }]}
        >
          <Title>User not logged in.</Title>
        </View>
      )}
    </>
  );
}
