import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { tokens, semanticColors } from '../design';

interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Look up an item',
}) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={20} color={semanticColors.text.secondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={semanticColors.text.tertiary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.borderRadius.lg,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    ...tokens.shadow.search,
  },
  input: {
    flex: 1,
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat',
    color: semanticColors.text.primary,
  },
});
