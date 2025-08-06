import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../src/components';
import { semanticColors } from '../../src/design';

export default function AddScreen() {
  return (
    <View style={styles.container}>
      <Header title="Add" />
      <View style={styles.content}>
        <Text style={styles.title}>Add</Text>
        <Text style={styles.subtitle}>Coming Soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.secondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
