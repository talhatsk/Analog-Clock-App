/**
 * Hook to load time zones on app launch.
 * Loads cached list from DB first. If empty or loading from DB fails (e.g. DB deleted or corrupted),
 * fetches from the online API and stores again into the DB.
 */

import {useState, useEffect, useCallback} from 'react';
import {fetchTimeZoneList} from '../services/timeZoneApi';
import {getCachedTimeZones, saveTimeZones} from '../services/database';
import type {DbStatus, TimeZoneEntry} from '../types';

export function useTimeZones(): {
  timeZones: TimeZoneEntry[];
  loading: boolean;
  error: Error | null;
  dbStatus: DbStatus;
  refetch: () => Promise<void>;
} {
  const [timeZones, setTimeZones] = useState<TimeZoneEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dbStatus, setDbStatus] = useState<DbStatus>('unknown');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let cached: TimeZoneEntry[] | null = null;
      let dbAvailable = true;
      try {
        cached = await getCachedTimeZones();
      } catch {
        dbAvailable = false;
        setDbStatus('unavailable');
        cached = null;
      }
      if (cached != null && cached.length > 0) {
        setDbStatus('stored');
        setTimeZones(cached);
        setLoading(false);
        return;
      }
      if (dbAvailable) {
        setDbStatus('empty');
      }
      const list = await fetchTimeZoneList();
      setTimeZones(list);
      await saveTimeZones(list);
      setDbStatus('stored');
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setTimeZones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    timeZones,
    loading,
    error,
    dbStatus,
    refetch: load,
  };
}
