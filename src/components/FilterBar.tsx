import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tokens, semanticColors } from '../design';

interface FilterBarProps {
  sortBy: string;
  resultCount: number;
  onSortPress?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ sortBy, resultCount, onSortPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.sortLabel}>Sort by: </Text>
        <Text style={styles.sortValue}>{sortBy}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.resultCount}>{resultCount} results</Text>
        <TouchableOpacity onPress={onSortPress} style={styles.menuButton}>
          <MaterialIcons name="menu" size={20} color={semanticColors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  sortValue: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.primary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
  resultCount: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  menuButton: {
    padding: tokens.spacing.xs,
  },
});
