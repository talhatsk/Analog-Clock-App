/**
 * SQLite database layer using react-native-nitro-sqlite.
 * Caches time zones and persists last selected time zone.
 */

import {open} from 'react-native-nitro-sqlite';
import type {NitroSQLiteConnection} from 'react-native-nitro-sqlite';
import {DB_NAME} from '../constants';
import {
  CREATE_TIME_ZONES_TABLE,
  CREATE_PREFERENCES_TABLE,
  PREFERENCE_LAST_TIME_ZONE,
} from '../db/schema';
import type {TimeZoneEntry} from '../types';

let db: NitroSQLiteConnection | null = null;

async function ensureDb(): Promise<NitroSQLiteConnection> {
  if (db != null) {
    return db;
  }
  await initDatabase();
  if (db == null) {
    throw new Error('Database failed to initialize');
  }
  return db;
}

/**
 * Opens the database and creates tables if they do not exist.
 */
export async function initDatabase(): Promise<void> {
  if (db != null) {
    return;
  }
  db = open({name: DB_NAME});
  await db.executeAsync(CREATE_TIME_ZONES_TABLE);
  await db.executeAsync(CREATE_PREFERENCES_TABLE);
}

/**
 * Reads cached time zones from the DB.
 * Returns null if table is empty.
 */
export async function getCachedTimeZones(): Promise<TimeZoneEntry[] | null> {
  const conn = await ensureDb();
  const {results} = await conn.executeAsync(
    'SELECT zone_name AS zoneName, country_code AS countryCode, country_name AS countryName, gmt_offset AS gmtOffset, timestamp FROM time_zones ORDER BY zone_name',
  );
  if (!results || results.length === 0) {
    return null;
  }
  return results as unknown as TimeZoneEntry[];
}

/**
 * Saves time zone list to the DB (replaces existing cache).
 */
export async function saveTimeZones(zones: TimeZoneEntry[]): Promise<void> {
  const conn = await ensureDb();
  await conn.transaction(async tx => {
    await tx.executeAsync('DELETE FROM time_zones');
    for (const z of zones) {
      await tx.executeAsync(
        'INSERT INTO time_zones (zone_name, country_code, country_name, gmt_offset, timestamp) VALUES (?, ?, ?, ?, ?)',
        [
          z.zoneName,
          z.countryCode,
          z.countryName ?? null,
          z.gmtOffset,
          z.timestamp ?? null,
        ],
      );
    }
  });
}

/**
 * Returns the last selected time zone name, or null.
 */
export async function getLastSelectedTimeZone(): Promise<string | null> {
  try {
    const conn = await ensureDb();
    const {results} = await conn.executeAsync(
      'SELECT value FROM preferences WHERE key = ?',
      [PREFERENCE_LAST_TIME_ZONE],
    );
    if (!results || results.length === 0) {
      return null;
    }
    const row = results[0] as {value: string};
    return row.value ?? null;
  } catch {
    return null;
  }
}

/**
 * Persists the last selected time zone name.
 */
export async function setLastSelectedTimeZone(zoneName: string): Promise<void> {
  const conn = await ensureDb();
  await conn.executeAsync(
    'INSERT OR REPLACE INTO preferences (key, value) VALUES (?, ?)',
    [PREFERENCE_LAST_TIME_ZONE, zoneName],
  );
}
