/**
 * Hook to get current time (hours, minutes, seconds) for a given time zone.
 * Updates every second so the clock runs in real time.
 */

import { useState, useEffect } from 'react';
import type { ClockTime } from '../types';

function getTimeInZone(timeZone: string): ClockTime {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const parts = formatter.formatToParts(now);
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const second = Number(parts.find((p) => p.type === 'second')?.value ?? 0);
  return { hours: hour, minutes: minute, seconds: second };
}

export function useTime(timeZone: string): ClockTime {
  const [time, setTime] = useState<ClockTime>(() => getTimeInZone(timeZone));

  useEffect(() => {
    if (!timeZone) {
      return;
    }
    setTime(getTimeInZone(timeZone));
    const id = setInterval(() => {
      setTime(getTimeInZone(timeZone));
    }, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
