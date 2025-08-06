import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens, semanticColors } from '../design';

interface StatusBadgeProps {
  status: 'out of stock' | 'low stock' | 'in stock';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColors = () => {
    switch (status) {
      case 'out of stock':
        return semanticColors.status.outOfStock;
      case 'low stock':
        return semanticColors.status.lowStock;
      case 'in stock':
        return semanticColors.status.inStock;
    }
  };

  const colors = getStatusColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.dot, { backgroundColor: colors.text }]} />
      <Text style={[styles.text, { color: colors.text }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.borderRadius.sm,
    gap: tokens.spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: tokens.fontSize.xs,
    fontFamily: 'Montserrat-Medium',
    textTransform: 'capitalize',
  },
});
