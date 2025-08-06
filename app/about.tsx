import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../src/design';
import { Header } from '../src/components';

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
    <View style={styles.container}>
      <Header title="About" showBackButton={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
  appSection: {
    padding: tokens.spacing.xl,
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: semanticColors.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.md,
  },
  appName: {
    fontSize: tokens.fontSize.lg,
    fontFamily: 'Besley-Bold',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.sm,
  },
  appDescription: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
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
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.background.secondary,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.accent,
    marginBottom: tokens.spacing.xs,
  },
  linkSubtitle: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  acknowledgmentText: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
    lineHeight: 22,
    marginBottom: tokens.spacing.sm,
  },
  footer: {
    padding: tokens.spacing.lg,
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  footerText: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
    marginBottom: tokens.spacing.sm,
  },
});
