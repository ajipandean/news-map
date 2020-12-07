import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import {
  TextInput, Title, Button, useTheme,
} from 'react-native-paper';

export default function LoginScreen() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
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
          loading={false}
          mode="contained"
          onPress={() => navigate('add-info')}
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