import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DeveloperToolsScreen() {
  const insets = useSafeAreaInsets();
  const [debugMode, setDebugMode] = useState(false);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const developerActions = [
    {
      title: 'Toggle Debug Mode',
      subtitle: debugMode ? 'Debug mode is ON' : 'Debug mode is OFF',
      icon: 'bug-report',
      action: () => {
        setDebugMode(!debugMode);
        showAlert('Debug Mode', `Debug mode ${!debugMode ? 'enabled' : 'disabled'}`);
      },
    },
    {
      title: 'Clear AsyncStorage',
      subtitle: 'Reset all stored data',
      icon: 'storage',
      action: () => {
        showAlert('Clear Storage', 'AsyncStorage would be cleared (placeholder)');
      },
    },
    {
      title: 'Simulate Network Error',
      subtitle: 'Test offline behavior',
      icon: 'wifi-off',
      action: () => {
        showAlert('Network Error', 'Network error simulation (placeholder)');
      },
    },
    {
      title: 'Log Device Info',
      subtitle: 'Print device information to console',
      icon: 'phone-android',
      action: () => {
        console.log('Device info logged (placeholder)');
        showAlert('Device Info', 'Device information logged to console');
      },
    },
    {
      title: 'Test Crash Reporting',
      subtitle: 'Trigger a test crash',
      icon: 'warning',
      action: () => {
        showAlert('Crash Test', 'Crash reporting test (placeholder)');
      },
    },
    {
      title: 'Performance Monitor',
      subtitle: 'Show performance metrics',
      icon: 'speed',
      action: () => {
        showAlert('Performance', 'Performance monitoring (placeholder)');
      },
    },
  ];

  const systemInfo = [
    { label: 'Environment', value: __DEV__ ? 'Development' : 'Production' },
    { label: 'Platform', value: require('react-native').Platform.OS },
    { label: 'Debug Mode', value: debugMode ? 'Enabled' : 'Disabled' },
    { label: 'Hermes', value: 'Enabled' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Developer Tools</Text>
      </View>

      <View style={styles.warningBanner}>
        <MaterialIcons name="warning" size={20} color="#FF9500" />
        <Text style={styles.warningText}>
          These tools are for development and testing purposes only.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Information</Text>
        {systemInfo.map((info) => (
          <View key={info.label} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{info.label}</Text>
            <Text style={styles.infoValue}>{info.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developer Actions</Text>
        {developerActions.map((action) => (
          <TouchableOpacity
            key={action.title}
            style={styles.actionItem}
            onPress={action.action}
          >
            <View style={styles.actionIcon}>
              <MaterialIcons name={action.icon as any} size={24} color="#007AFF" />
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Console</Text>
        <View style={styles.consoleContainer}>
          <Text style={styles.consoleText}>
            Console output would appear here in a real implementation.
          </Text>
          <Text style={styles.consoleText}>
            Check your terminal or debugger for actual console logs.
          </Text>
        </View>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Console</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.note}>
        <MaterialIcons name="info" size={16} color="#666" />
        <Text style={styles.noteText}>
          Developer tools are placeholders and would connect to actual debugging functionality in a production app.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#856404',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  infoLabel: {
    fontSize: 17,
    color: '#333',
  },
  infoValue: {
    fontSize: 17,
    color: '#666',
    fontWeight: '500',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  consoleContainer: {
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  consoleText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#00D4AA',
    lineHeight: 20,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});