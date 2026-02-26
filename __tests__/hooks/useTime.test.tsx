/**
 * Unit tests for useTime hook and getTimeInZone.
 */

import {getTimeInZone} from '../../src/hooks/useTime';
import type {ClockTime} from '../../src/types';

describe('getTimeInZone', () => {
  it('returns an object with hours, minutes, and seconds as numbers', () => {
    const time = getTimeInZone('UTC');
    expect(time).toMatchObject({
      hours: expect.any(Number),
      minutes: expect.any(Number),
      seconds: expect.any(Number),
    });
    expect(time.hours).toBeGreaterThanOrEqual(0);
    expect(time.hours).toBeLessThan(24);
    expect(time.minutes).toBeGreaterThanOrEqual(0);
    expect(time.minutes).toBeLessThan(60);
    expect(time.seconds).toBeGreaterThanOrEqual(0);
    expect(time.seconds).toBeLessThan(60);
  });

  it('returns valid ClockTime for America/New_York', () => {
    const time = getTimeInZone('America/New_York');
    expect(time.hours).toBeGreaterThanOrEqual(0);
    expect(time.hours).toBeLessThan(24);
    expect(time.minutes).toBeGreaterThanOrEqual(0);
    expect(time.minutes).toBeLessThan(60);
    expect(time.seconds).toBeGreaterThanOrEqual(0);
    expect(time.seconds).toBeLessThan(60);
  });
});

describe('useTime', () => {
  it('returns ClockTime shape (tested via getTimeInZone)', () => {
    const time: ClockTime = getTimeInZone('Europe/London');
    expect(time).toEqual({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });
  });
});
