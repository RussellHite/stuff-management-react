import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { tokens, semanticColors } from '../../src/design';
import { Header, SearchInput, FilterBar, SectionHeader, ItemRow } from '../../src/components';

// Mock data for demonstration
const mockData = [
  {
    id: '1',
    room: 'Kitchen',
    items: [
      {
        id: '1-1',
        name: 'Paper Towels',
        location: 'Under sink',
        count: 3,
        status: 'in stock' as const,
      },
      {
        id: '1-2',
        name: 'Dish Soap',
        location: 'Sink cabinet',
        count: 1,
        status: 'low stock' as const,
      },
      {
        id: '1-3',
        name: 'Trash Bags',
        location: 'Pantry',
        count: 0,
        status: 'out of stock' as const,
      },
    ],
  },
  {
    id: '2',
    room: 'Bathroom',
    items: [
      {
        id: '2-1',
        name: 'Toilet Paper',
        location: 'Linen closet',
        count: 12,
        status: 'in stock' as const,
      },
      { id: '2-2', name: 'Shampoo', location: 'Shower', count: 1, status: 'low stock' as const },
      {
        id: '2-3',
        name: 'Toothpaste',
        location: 'Medicine cabinet',
        count: 2,
        status: 'in stock' as const,
      },
    ],
  },
  {
    id: '3',
    room: 'Bedroom',
    items: [
      { id: '3-1', name: 'Tissues', location: 'Nightstand', count: 3, status: 'in stock' as const },
      {
        id: '3-2',
        name: 'Batteries AA',
        location: 'Dresser drawer',
        count: 4,
        status: 'in stock' as const,
      },
    ],
  },
];

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Room');

  // Calculate total items for filter bar
  const totalItems = mockData.reduce((sum, room) => sum + room.items.length, 0);

  const handleItemIncrement = (roomId: string, itemId: string) => {
    console.log('Increment:', roomId, itemId);
  };

  const handleItemDecrement = (roomId: string, itemId: string) => {
    console.log('Decrement:', roomId, itemId);
  };

  const handleItemClick = (item: any) => {
    console.log('Item clicked:', item);
  };

  return (
    <View style={styles.container}>
      <Header title="Stuff" />

      <View style={styles.searchContainer}>
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Look up an item" />
      </View>

      <FilterBar
        sortBy={sortBy}
        resultCount={totalItems}
        onSortPress={() => console.log('Sort pressed')}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockData.map((section) => (
          <View key={section.id}>
            <SectionHeader title={section.room} icon="room" />
            {section.items.map((item) => (
              <ItemRow
                key={item.id}
                name={item.name}
                location={item.location}
                count={item.count}
                status={item.status}
                onIncrement={() => handleItemIncrement(section.id, item.id)}
                onDecrement={() => handleItemDecrement(section.id, item.id)}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.secondary,
  },
  searchContainer: {
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
});
