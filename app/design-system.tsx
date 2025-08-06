import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens, semanticColors } from '../src/design';
import {
  Header,
  SearchInput,
  FilterBar,
  Counter,
  StatusBadge,
  ItemRow,
  SectionHeader,
} from '../src/components';

export default function DesignSystemScreen() {
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState('');
  const [counterValue, setCounterValue] = useState(5);

  return (
    <View style={styles.container}>
      <Header title="Design System" showBackButton={true} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Colors Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Colors</Text>
            <View style={styles.colorGrid}>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Primary</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.primary).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Neutral</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.neutral).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Gray</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.gray).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Danger</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.danger).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Warning</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.warning).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Info</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.info).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.colorRow}>
                <Text style={styles.colorGroupTitle}>Accent</Text>
                <View style={styles.colorRowItems}>
                  {Object.entries(tokens.colors.accent).map(([key, value]) => (
                    <View key={key} style={styles.colorItem}>
                      <View style={[styles.colorSwatch, { backgroundColor: value }]} />
                      <Text style={styles.colorLabel}>{key}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Typography Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Typography</Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.xl, fontFamily: 'Besley-Bold' },
              ]}
            >
              Header XL - Besley Bold
            </Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.lg, fontFamily: 'Besley-Medium' },
              ]}
            >
              Header Large - Besley Medium
            </Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.md, fontFamily: 'Montserrat-SemiBold' },
              ]}
            >
              Body Medium - Montserrat SemiBold
            </Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.md, fontFamily: 'Montserrat' },
              ]}
            >
              Body Regular - Montserrat Regular
            </Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.sm, fontFamily: 'Montserrat' },
              ]}
            >
              Body Small - Montserrat Regular
            </Text>
            <Text
              style={[
                styles.typeSample,
                { fontSize: tokens.fontSize.xs, fontFamily: 'Montserrat-Light' },
              ]}
            >
              Caption - Montserrat Light
            </Text>
          </View>

          {/* Components Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Components</Text>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Header</Text>
              <View style={styles.componentWrapper}>
                <Header />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Search Input</Text>
              <View style={styles.componentWrapper}>
                <SearchInput
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Look up an item"
                />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Filter Bar</Text>
              <View style={styles.componentWrapper}>
                <FilterBar
                  sortBy="Room"
                  resultCount={24}
                  onSortPress={() => console.log('Sort pressed')}
                />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Counter</Text>
              <View style={[styles.componentWrapper, styles.centerContent]}>
                <Counter
                  value={counterValue}
                  onIncrement={() => setCounterValue((v) => v + 1)}
                  onDecrement={() => setCounterValue((v) => Math.max(0, v - 1))}
                />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Status Badges</Text>
              <View style={[styles.componentWrapper, styles.badgeRow]}>
                <StatusBadge status="in stock" />
                <StatusBadge status="low stock" />
                <StatusBadge status="out of stock" />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Section Header</Text>
              <View style={styles.componentWrapper}>
                <SectionHeader title="Kitchen" icon="kitchen" />
              </View>
            </View>

            <View style={styles.componentSection}>
              <Text style={styles.componentTitle}>Item Row</Text>
              <View style={styles.componentWrapper}>
                <ItemRow
                  name="Paper Towels"
                  location="Under sink"
                  count={3}
                  status="in stock"
                  onIncrement={() => console.log('Increment')}
                  onDecrement={() => console.log('Decrement')}
                  onClick={() => console.log('Clicked')}
                />
                <ItemRow
                  name="Dish Soap"
                  location="Sink cabinet"
                  count={1}
                  status="low stock"
                  onIncrement={() => console.log('Increment')}
                  onDecrement={() => console.log('Decrement')}
                  onClick={() => console.log('Clicked')}
                />
                <ItemRow
                  name="Trash Bags"
                  location="Pantry"
                  count={0}
                  status="out of stock"
                  onIncrement={() => console.log('Increment')}
                  onDecrement={() => console.log('Decrement')}
                  onClick={() => console.log('Clicked')}
                />
              </View>
            </View>
          </View>

          {/* Spacing Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spacing</Text>
            <View style={styles.spacingGrid}>
              {Object.entries(tokens.spacing).map(([key, value]) => (
                <View key={key} style={styles.spacingItem}>
                  <View
                    style={[styles.spacingBox, { width: value as number, height: value as number }]}
                  />
                  <Text style={styles.spacingLabel}>
                    {key}: {value}px
                  </Text>
                </View>
              ))}
            </View>
          </View>
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
  content: {
    padding: tokens.spacing.lg,
  },
  section: {
    marginBottom: tokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: tokens.fontSize.lg,
    fontFamily: 'Besley-SemiBold',
    marginBottom: tokens.spacing.md,
    color: semanticColors.text.primary,
  },
  colorGrid: {
    gap: tokens.spacing.md,
  },
  colorRow: {
    marginBottom: tokens.spacing.md,
  },
  colorGroupTitle: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.secondary,
    marginBottom: tokens.spacing.sm,
  },
  colorRowItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  colorItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: tokens.borderRadius.sm,
    marginBottom: tokens.spacing.xs,
    borderWidth: 1,
    borderColor: semanticColors.border.light,
  },
  colorLabel: {
    fontSize: tokens.fontSize.sm,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
  typeSample: {
    marginBottom: tokens.spacing.sm,
    color: semanticColors.text.primary,
  },
  componentSection: {
    marginBottom: tokens.spacing.lg,
  },
  componentTitle: {
    fontSize: tokens.fontSize.md,
    fontFamily: 'Montserrat-Medium',
    color: semanticColors.text.secondary,
    marginBottom: tokens.spacing.sm,
  },
  componentWrapper: {
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.borderRadius.sm,
    overflow: 'hidden',
  },
  centerContent: {
    padding: tokens.spacing.md,
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  spacingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  spacingItem: {
    alignItems: 'center',
  },
  spacingBox: {
    backgroundColor: semanticColors.button.primary,
    borderRadius: tokens.borderRadius.xs,
    marginBottom: tokens.spacing.xs,
  },
  spacingLabel: {
    fontSize: tokens.fontSize.xs,
    fontFamily: 'Montserrat',
    color: semanticColors.text.secondary,
  },
});
