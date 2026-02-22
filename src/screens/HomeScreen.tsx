/**
 * Main screen: Analog clock + time zone selector.
 * Handles orientation for clock size.
 */

import React from 'react';
import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AnalogClock} from '../components/AnalogClock';
import {TimeZoneSelector} from '../components/TimeZoneSelector';
import {useTime} from '../hooks/useTime';
import {useTimeZones} from '../hooks/useTimeZones';
import {useTimeZoneContext} from '../context/TimeZoneContext';
import type {DbStatus} from '../types';
import {styles} from './HomeScreen.styles';

function DbStatusIndicator({status}: {status: DbStatus}) {
  const dotColor =
    status === 'unavailable'
      ? '#e53935'
      : status === 'stored'
      ? '#43a047'
      : '#9e9e9e';
  return (
    <View style={styles.dbStatusRow}>
      <Text style={styles.dbStatusText}>Database Status:</Text>
      <View style={[styles.dbStatusDot, {backgroundColor: dotColor}]} />
    </View>
  );
}

export function HomeScreen(): React.JSX.Element {
  const inset = useSafeAreaInsets();
  const {width, height} = useWindowDimensions();
  const {selectedTimeZone, setSelectedTimeZone} = useTimeZoneContext();
  const {timeZones, loading, error, dbStatus, refetch} = useTimeZones();
  const time = useTime(
    selectedTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const clockSize = Math.min(width, height) * 0.5;
  const displayTimeZone =
    selectedTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <View style={styles.clockRow}>
        <View>
          <Text style={styles.timeZoneLabel} numberOfLines={2}>
            {displayTimeZone}
          </Text>
          {dbStatus !== 'unknown' ? (
            <DbStatusIndicator status={dbStatus} />
          ) : null}
        </View>
        <View style={styles.clockWrapper}>
          <AnalogClock time={time} size={clockSize} />
        </View>
      </View>
      {error ? (
        <View style={styles.errorRow}>
          <Text style={styles.error}>{error.message}</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.refetchText}>Refetch</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <TimeZoneSelector
        timeZones={timeZones}
        selectedTimeZone={selectedTimeZone}
        onSelect={setSelectedTimeZone}
        loading={loading}
      />
    </View>
  );
}
