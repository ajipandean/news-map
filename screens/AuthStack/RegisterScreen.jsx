import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, StyleSheet, TouchableOpacity, Text, ToastAndroid,
} from 'react-native';
import {
  TextInput, Title, Button, useTheme,
} from 'react-native-paper';

import AuthContext from '../../context/AuthContext';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { register } = useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.surface,
    },
    heading: { textAlign: 'center' },
    form: { padding: 16 },
    input: { marginBottom: 16 },
    button: {
      marginTop: 24,
    },
    helper: { alignItems: 'center' },
    helper_text: {
      fontSize: 12,
      color: colors.placeholder,
    },
  });
  async function handleRegister() {
    setLoading(true);
    try {
      if (confirm !== password) throw new Error('Confirm password doesn\'t match.');
      const isSuccess = await register(email, password);
      if (isSuccess) navigate('add-info');
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Title style={styles.heading}>Register</Title>
      <View style={styles.form}>
        <TextInput
          dense
          mode="outlined"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(v) => setEmail(v)}
        />
        <TextInput
          dense
          secureTextEntry
          mode="outlined"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(v) => setPassword(v)}
        />
        <TextInput
          dense
          secureTextEntry
          mode="outlined"
          placeholder="Confirm password"
          style={styles.input}
          value={confirm}
          onChangeText={(v) => setConfirm(v)}
        />
        <Button
          loading={loading}
          mode="contained"
          onPress={handleRegister}
        >
          Register
        </Button>
      </View>
      <TouchableOpacity
        style={styles.helper}
        onPress={() => navigate('login')}
      >
        <Text style={styles.helper_text}>Already have an account? login instead.</Text>
      </TouchableOpacity>
    </View>
  );
}
