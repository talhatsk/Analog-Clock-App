/**
 * Unit tests for AnalogClock component.
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import {AnalogClock} from '../../src/components/AnalogClock';
import type {ClockTime} from '../../src/types';

const mockTime: ClockTime = {hours: 12, minutes: 30, seconds: 45};
const size = 200;

describe('AnalogClock', () => {
  it('renders without crashing', () => {
    const {toJSON} = render(<AnalogClock time={mockTime} size={size} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders clock face with number 12', () => {
    const fixedTime: ClockTime = {hours: 3, minutes: 15, seconds: 0};
    const {getByText} = render(<AnalogClock time={fixedTime} size={200} />);
    expect(getByText('12')).toBeTruthy();
  });
});
