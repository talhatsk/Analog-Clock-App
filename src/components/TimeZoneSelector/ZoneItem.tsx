/**
 * Single time zone list item. Tappable; shows zone name, country code, and UTC offset.
 */

import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import type {ZoneItemProps} from '../../types';
import {styles} from './TimeZoneSelector.styles';

function formatGmtOffset(gmtOffset: number): string {
  const hours = Math.floor(Math.abs(gmtOffset) / 3600);
  const mins = Math.floor((Math.abs(gmtOffset) % 3600) / 60);
  const sign = gmtOffset >= 0 ? '+' : '-';
  return `UTC${sign}${hours}${
    mins > 0 ? ':' + String(mins).padStart(2, '0') : ''
  }`;
}

function ZoneItemComponent({
  zone,
  isSelected,
  onPress,
}: ZoneItemProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.item, isSelected && styles.itemSelected]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        style={[styles.zoneName, isSelected && styles.zoneNameSelected]}
        numberOfLines={1}>
        {zone.zoneName}
      </Text>
      <Text style={styles.meta}>
        {zone.countryName ?? zone.countryCode} ·{' '}
        {formatGmtOffset(zone.gmtOffset)}
      </Text>
    </TouchableOpacity>
  );
}
export const ZoneItem = memo(ZoneItemComponent);
