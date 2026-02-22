/**
 * SQLite schema for time zones cache and user preferences.
 */

export const CREATE_TIME_ZONES_TABLE = `
  CREATE TABLE IF NOT EXISTS time_zones (
    zone_name TEXT PRIMARY KEY,
    country_code TEXT NOT NULL,
    country_name TEXT,
    gmt_offset INTEGER NOT NULL,
    timestamp INTEGER
  )
`;

export const CREATE_PREFERENCES_TABLE = `
  CREATE TABLE IF NOT EXISTS preferences (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`;

export const PREFERENCE_LAST_TIME_ZONE = 'last_selected_time_zone';
