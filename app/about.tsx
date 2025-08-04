import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const appInfo = [
    { label: 'Version', value: '1.0.0' },
    { label: 'Build', value: '1' },
    { label: 'React Native', value: '0.79.5' },
    { label: 'Expo SDK', value: '53.0.0' },
  ];

  const links = [
    {
      title: 'Privacy Policy',
      subtitle: 'How we handle your data',
      url: 'https://example.com/privacy',
    },
    {
      title: 'Terms of Service',
      subtitle: 'Terms and conditions',
      url: 'https://example.com/terms',
    },
    {
      title: 'Support',
      subtitle: 'Get help with the app',
      url: 'https://example.com/support',
    },
    {
      title: 'GitHub Repository',
      subtitle: 'View source code',
      url: 'https://github.com/example/stuff-happens-mobile',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
      </View>

      <View style={styles.appSection}>
        <View style={styles.appIcon}>
          <MaterialIcons name="inventory" size={48} color="#007AFF" />
        </View>
        <Text style={styles.appName}>Stuff Happens</Text>
        <Text style={styles.appDescription}>
          A mobile app for managing and organizing your stuff with ease.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        {appInfo.map((info) => (
          <View key={info.label} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{info.label}</Text>
            <Text style={styles.infoValue}>{info.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Links & Resources</Text>
        {links.map((link) => (
          <TouchableOpacity
            key={link.title}
            style={styles.linkItem}
            onPress={() => handleLinkPress(link.url)}
          >
            <View style={styles.linkContent}>
              <Text style={styles.linkTitle}>{link.title}</Text>
              <Text style={styles.linkSubtitle}>{link.subtitle}</Text>
            </View>
            <MaterialIcons name="open-in-new" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acknowledgments</Text>
        <Text style={styles.acknowledgmentText}>
          Built with React Native and Expo. Uses Material Icons from Google.
        </Text>
        <Text style={styles.acknowledgmentText}>
          Special thanks to the open source community for making this app possible.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Stuff Happens Mobile</Text>
        <Text style={styles.footerText}>Made with ❤️ for organizing stuff</Text>
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
  appSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
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
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 17,
    color: '#007AFF',
    marginBottom: 2,
  },
  linkSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  acknowledgmentText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  footer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});