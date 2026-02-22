/**
 * Context for selected time zone. Persists last selected to DB and restores on launch.
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { getLastSelectedTimeZone, setLastSelectedTimeZone } from '../services/database';
import type { TimeZoneContextType } from '../types';

const TimeZoneContext = createContext<TimeZoneContextType | null>(null);

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const [selectedTimeZone, setSelectedTimeZoneState] = useState<string>('');

  useEffect(() => {
    getLastSelectedTimeZone().then((zone) => {
      setSelectedTimeZoneState(
        zone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      );
    });
  }, []);

  const setSelectedTimeZone = useCallback((zone: string) => {
    setSelectedTimeZoneState(zone);
    setLastSelectedTimeZone(zone).catch(() => {
      // Ignore persistence errors (e.g. DB not ready)
    });
  }, []);

  return (
    <TimeZoneContext.Provider value={{ selectedTimeZone, setSelectedTimeZone }}>
      {children}
    </TimeZoneContext.Provider>
  );
}

export function useTimeZoneContext(): TimeZoneContextType {
  const ctx = useContext(TimeZoneContext);
  if (!ctx) {
    throw new Error('useTimeZoneContext must be used within TimeZoneProvider');
  }
  return ctx;
}
