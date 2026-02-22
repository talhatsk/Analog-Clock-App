/**
 * List of time zones under the clock. Search bar filters by zone name or country name.
 */

import React, {useState, useMemo} from 'react';
import {View, Text, TextInput, FlatList, ActivityIndicator} from 'react-native';
import type {TimeZoneSelectorProps} from '../../types';
import {ZoneItem} from './ZoneItem';
import {styles} from './TimeZoneSelector.styles';

export function TimeZoneSelector({
  timeZones,
  selectedTimeZone,
  onSelect,
  loading,
}: TimeZoneSelectorProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredZones = useMemo(() => {
    if (!searchQuery.trim()) {
      return timeZones;
    }
    const q = searchQuery.trim().toLowerCase();
    return timeZones.filter(
      zone =>
        zone.zoneName.toLowerCase().includes(q) ||
        zone.countryCode.toLowerCase().includes(q) ||
        (zone.countryName?.toLowerCase().includes(q) ?? false),
    );
  }, [timeZones, searchQuery]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Loading time zones...</Text>
        <ActivityIndicator size="small" style={styles.loader} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Time zone</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by zone or country..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filteredZones}
        keyExtractor={item => item.zoneName}
        renderItem={({item}) => (
          <ZoneItem
            zone={item}
            isSelected={item.zoneName === selectedTimeZone}
            onPress={() => onSelect(item.zoneName)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={true}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
      />
    </View>
  );
}
