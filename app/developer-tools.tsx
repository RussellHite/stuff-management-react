import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../src/design';
import { Header } from '../src/components';

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
    <View style={styles.container}>
      <Header title="Developer Tools" showBackButton={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity key={action.title} style={styles.actionItem} onPress={action.action}>
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
            Developer tools are placeholders and would connect to actual debugging functionality in
            a production app.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: semanticColors.status.lowStock.background,
    marginHorizontal: tokens.spacing.md,
    marginTop: tokens.spacing.md,
    padding: tokens.spacing.md,
    borderRadius: tokens.borderRadius.sm,
    gap: tokens.spacing.sm,
  },
  warningText: {
    flex: 1,
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.status.lowStock.text,
  },
  section: {
    padding: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Besley-Medium',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.background.secondary,
  },
  infoLabel: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.primary,
  },
  infoValue: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.secondary,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.background.secondary,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: semanticColors.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing.sm,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  actionSubtitle: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  consoleContainer: {
    backgroundColor: tokens.colors.gray[900],
    borderRadius: tokens.borderRadius.sm,
    padding: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
  },
  consoleText: {
    fontFamily: 'monospace',
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.primary[500],
    lineHeight: 20,
  },
  clearButton: {
    backgroundColor: semanticColors.button.danger,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.borderRadius.sm,
    alignItems: 'center',
  },
  clearButtonText: {
    color: tokens.colors.white,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    marginBottom: tokens.spacing.md,
  },
  noteText: {
    flex: 1,
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
    lineHeight: 20,
  },
});
