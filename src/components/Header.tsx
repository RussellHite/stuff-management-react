import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../design';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + tokens.spacing.sm }]}>
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={semanticColors.text.primary} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: semanticColors.background.header,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32,
  },
  backButton: {
    marginRight: tokens.spacing.sm,
    padding: tokens.spacing.xs,
  },
  title: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Besley-Medium',
    color: semanticColors.text.primary,
    lineHeight: 24,
  },
});
