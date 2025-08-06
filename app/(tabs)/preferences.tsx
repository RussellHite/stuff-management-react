import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { tokens, semanticColors } from '../../src/design';
import { Header } from '../../src/components';

interface AdminMenuItem {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  route: string;
  description: string;
}

const adminMenuItems: AdminMenuItem[] = [
  {
    title: 'Design System',
    icon: 'palette',
    route: '/design-system',
    description: 'View app design components and colors',
  },
  {
    title: 'App Settings',
    icon: 'settings',
    route: '/app-settings',
    description: 'Configure application settings',
  },
  {
    title: 'Authentication',
    icon: 'security',
    route: '/authentication',
    description: 'Login and user authentication',
  },
  {
    title: 'About',
    icon: 'info',
    route: '/about',
    description: 'App information and version details',
  },
  {
    title: 'Developer Tools',
    icon: 'developer-mode',
    route: '/developer-tools',
    description: 'Development and debugging tools',
  },
];

export default function PreferencesScreen() {
  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          {adminMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.route}
              style={[styles.menuItem, index === adminMenuItems.length - 1 && styles.lastMenuItem]}
              onPress={() => handleMenuPress(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon} size={24} color={semanticColors.text.accent} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={semanticColors.text.tertiary} />
            </TouchableOpacity>
          ))}
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
  menuContainer: {
    backgroundColor: tokens.colors.white,
    marginHorizontal: tokens.spacing.md,
    marginTop: tokens.spacing.md,
    borderRadius: tokens.borderRadius.md,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.border.light,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: semanticColors.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing.sm,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-SemiBold',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  menuDescription: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
});
