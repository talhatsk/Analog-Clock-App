/**
 * Hour, minute, and second hands. Rotation derived from ClockTime.
 * 12 o'clock = 0°, clockwise positive.
 */

import React from 'react';
import {View} from 'react-native';
import type {ClockHandsProps, ClockTime} from '../../types';
import {styles} from './AnalogClock.styles';

function useHandRotation(time: ClockTime) {
  const secondsAngle = (time.seconds / 60) * 360;
  const minutesAngle = (time.minutes / 60) * 360 + (time.seconds / 60) * 6;
  const hoursAngle = (time.hours % 12) * 30 + (time.minutes / 60) * 30;
  return {secondsAngle, minutesAngle, hoursAngle};
}

export function ClockHands({size, time}: ClockHandsProps): React.JSX.Element {
  const center = size / 2;
  const {secondsAngle, minutesAngle, hoursAngle} = useHandRotation(time);

  const hourH = center * 0.5;
  const minuteH = center * 0.6;
  const secondH = center * 0.65;

  return (
    <View style={styles.handsContainer} pointerEvents="none">
      {/* Hour hand: shorter, thicker — pivot at bottom (clock center) */}
      <View
        style={[
          styles.hand,
          styles.hourHand,
          {
            width: 6,
            height: hourH,
            transform: [
              {translateY: hourH / 2},
              {rotate: `${hoursAngle}deg`},
              {translateY: -hourH / 2},
            ],
          },
        ]}
      />
      {/* Minute hand */}
      <View
        style={[
          styles.hand,
          styles.minuteHand,
          {
            width: 4,
            height: minuteH,
            transform: [
              {translateY: minuteH / 2},
              {rotate: `${minutesAngle}deg`},
              {translateY: -minuteH / 2},
            ],
          },
        ]}
      />
      {/* Second hand: thinnest, longest */}
      <View
        style={[
          styles.hand,
          styles.secondHand,
          {
            width: 2,
            height: secondH,
            transform: [
              {translateY: secondH / 2},
              {rotate: `${secondsAngle}deg`},
              {translateY: -secondH / 2},
            ],
          },
        ]}
      />
    </View>
  );
}
