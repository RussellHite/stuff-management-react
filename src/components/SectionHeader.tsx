import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tokens, semanticColors } from '../design';

interface SectionHeaderProps {
  title: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <View style={styles.container}>
      {icon && <MaterialIcons name={icon} size={20} color={semanticColors.text.primary} />}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    backgroundColor: semanticColors.background.secondary,
    gap: tokens.spacing.sm,
  },
  title: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Besley-Medium',
    color: semanticColors.text.primary,
  },
});
