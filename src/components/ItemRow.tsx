import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tokens, semanticColors } from '../design';
import { Counter } from './Counter';
import { StatusBadge } from './StatusBadge';

interface ItemRowProps {
  name: string;
  location: string;
  count: number;
  status?: 'out of stock' | 'low stock' | 'in stock';
  onIncrement: () => void;
  onDecrement: () => void;
  onClick: () => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({
  name,
  location,
  count,
  status,
  onIncrement,
  onDecrement,
  onClick,
}) => {
  const handlePress = (e: any) => {
    // Prevent the row click when interacting with counter
    e.stopPropagation();
    onClick();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationRow}>
          <MaterialIcons name="location-on" size={14} color={semanticColors.text.secondary} />
          <Text style={styles.location}>{location}</Text>
        </View>
        {status && status !== 'in stock' && (
          <View style={styles.badgeContainer}>
            <StatusBadge status={status} />
          </View>
        )}
      </View>
      <View onStartShouldSetResponder={() => true}>
        <Counter value={count} onIncrement={onIncrement} onDecrement={onDecrement} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    backgroundColor: tokens.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.border.light,
  },
  leftContent: {
    flex: 1,
    marginRight: tokens.spacing.md,
  },
  name: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
  },
  location: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  badgeContainer: {
    marginTop: tokens.spacing.xs,
    alignSelf: 'flex-start',
  },
});
