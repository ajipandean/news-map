import React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';
import {
  Appbar, useTheme, Title, Paragraph, Button,
} from 'react-native-paper';

export default function AccountScreen() {
  const { colors } = useTheme();
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
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.image_wrapper}>
          <Image
            style={styles.image}
            source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3925efb9-68c4-4f09-a69f-ea85117d53e5/d6y6v9l-5056055b-410f-4579-ab3b-26a2568175f8.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMzkyNWVmYjktNjhjNC00ZjA5LWE2OWYtZWE4NTExN2Q1M2U1XC9kNnk2djlsLTUwNTYwNTViLTQxMGYtNDU3OS1hYjNiLTI2YTI1NjgxNzVmOC5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.sxyRBEuplH-pkRNMvVF39wHKye4SYtKK4jnNlRRs_80' }}
          />
        </View>
        <Title>Kousaka Kirino</Title>
        <Paragraph style={styles.email}>kiririn@mail.com</Paragraph>
        <Button
          loading={false}
          mode="contained"
          onPress={() => {}}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
