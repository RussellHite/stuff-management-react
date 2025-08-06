import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../src/design';
import { Header } from '../src/components';

export default function AppSettingsScreen() {
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          title: 'Dark Mode',
          subtitle: 'Use dark theme throughout the app',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          subtitle: 'Receive notifications about your stuff',
          type: 'switch',
          value: notifications,
          onToggle: setNotifications,
        },
      ],
    },
    {
      title: 'Data & Sync',
      items: [
        {
          title: 'Offline Mode',
          subtitle: 'Work without internet connection',
          type: 'switch',
          value: offlineMode,
          onToggle: setOfflineMode,
        },
        {
          title: 'Auto Sync',
          subtitle: 'Automatically sync data when online',
          type: 'switch',
          value: autoSync,
          onToggle: setAutoSync,
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          type: 'action',
          action: () => console.log('Clear cache'),
        },
        {
          title: 'Export Data',
          subtitle: 'Export your data to file',
          type: 'action',
          action: () => console.log('Export data'),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="App Settings" showBackButton={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <View key={index} style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                {item.type === 'switch' && (
                  <Switch
                    value={item.value}
                    onValueChange={item.onToggle}
                    trackColor={{
                      false: semanticColors.border.light,
                      true: semanticColors.text.accent,
                    }}
                    thumbColor={tokens.colors.white}
                  />
                )}
                {item.type === 'action' && (
                  <TouchableOpacity onPress={item.action}>
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color={semanticColors.text.tertiary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}

        <View style={styles.note}>
          <MaterialIcons name="info" size={16} color="#666" />
          <Text style={styles.noteText}>
            Settings are currently for demonstration purposes. Functionality will be implemented in
            future updates.
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.background.secondary,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  settingSubtitle: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
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
