/**
 * Analog clock component: face + hands. Resizes for device/orientation.
 * Updates in real time via useTime(selectedTimeZone).
 */

import React from 'react';
import {View} from 'react-native';
import {ClockFace} from './ClockFace';
import {ClockHands} from './ClockHands';
import type {AnalogClockProps} from '../../types';

export function AnalogClock({time, size}: AnalogClockProps): React.JSX.Element {
  return (
    <View style={{width: size, height: size}}>
      <ClockFace size={size} />
      <ClockHands size={size} time={time} />
    </View>
  );
}

export {ClockFace, ClockHands};
