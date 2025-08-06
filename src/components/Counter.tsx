import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tokens, semanticColors } from '../design';

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, (disabled || value === 0) && styles.buttonDisabled]}
        onPress={onDecrement}
        disabled={disabled || value === 0}
      >
        <MaterialIcons
          name="remove"
          size={20}
          color={
            disabled || value === 0 ? semanticColors.button.disabled : semanticColors.text.primary
          }
        />
      </TouchableOpacity>

      <Text style={styles.value}>{value}</Text>

      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onIncrement}
        disabled={disabled}
      >
        <MaterialIcons
          name="add"
          size={20}
          color={disabled ? semanticColors.button.disabled : semanticColors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: semanticColors.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  value: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.primary,
    minWidth: 24,
    textAlign: 'center',
  },
});
