/**
 * Unit tests for ClockHands component.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { ClockHands } from '../../src/components/AnalogClock';
import type { ClockTime } from '../../src/types';

describe('ClockHands', () => {
  it('renders with given time and size', () => {
    const time: ClockTime = { hours: 12, minutes: 0, seconds: 0 };
    const { toJSON } = render(<ClockHands size={200} time={time} />);
    expect(toJSON()).toBeTruthy();
  });

  it('applies rotation transforms for 12:00:00', () => {
    const time: ClockTime = { hours: 12, minutes: 0, seconds: 0 };
    const { toJSON } = render(<ClockHands size={200} time={time} />);
    const treeStr = JSON.stringify(toJSON());
    expect(treeStr).toContain('0deg');
  });

  it('applies rotation for 3:15:30 (second hand 180deg)', () => {
    const time: ClockTime = { hours: 3, minutes: 15, seconds: 30 };
    const { toJSON } = render(<ClockHands size={200} time={time} />);
    const treeStr = JSON.stringify(toJSON());
    expect(treeStr).toContain('180deg');
  });
});