import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
    description: 'View app design components and colors'
  },
  {
    title: 'App Settings',
    icon: 'settings',
    route: '/app-settings',
    description: 'Configure application settings'
  },
  {
    title: 'Authentication',
    icon: 'security',
    route: '/authentication',
    description: 'Login and user authentication'
  },
  {
    title: 'About',
    icon: 'info',
    route: '/about',
    description: 'App information and version details'
  },
  {
    title: 'Developer Tools',
    icon: 'developer-mode',
    route: '/developer-tools',
    description: 'Development and debugging tools'
  }
];

export default function PreferencesScreen() {
  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Preferences</Text>
        <Text style={styles.subtitle}>Admin & Settings</Text>
      </View>
      
      <View style={styles.menuContainer}>
        {adminMenuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.route)}
            activeOpacity={0.7}
          >
            <View style={styles.menuIcon}>
              <MaterialIcons name={item.icon} size={24} color="#007AFF" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
});