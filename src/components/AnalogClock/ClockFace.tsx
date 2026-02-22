/**
 * Clock face (circle with numbers 12, 1–11). No third-party clock components.
 */

import React from 'react';
import {View, Text} from 'react-native';
import type {ClockFaceProps} from '../../types';
import {styles} from './AnalogClock.styles';

const CLOCK_NUMBERS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function ClockFace({size}: ClockFaceProps): React.JSX.Element {
  const center = size / 2;
  const radius = center - 28;

  return (
    <View
      style={[
        styles.face,
        {
          width: size,
          height: size,
          borderRadius: center,
          backgroundColor: 'white',
        },
      ]}>
      {CLOCK_NUMBERS.map(n => {
        const angleDeg = n * 30;
        const angleRad = (angleDeg * Math.PI) / 180;
        const x = center + radius * Math.sin(angleRad) - 10;
        const y = center - radius * Math.cos(angleRad) - 10;
        return (
          <Text key={n} style={[styles.number, {left: x, top: y}]}>
            {n}
          </Text>
        );
      })}
    </View>
  );
}
