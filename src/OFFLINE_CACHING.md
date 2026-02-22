# Offline Caching Approach

## Overview

The app uses an **offline-first** strategy for time zone data: on launch we read from SQLite first; we call the TimeZoneDB API only when the cache is empty or the database is missing or corrupted. After a successful API fetch, we write the result back to SQLite so the app works offline on subsequent launches.

We also persist the **last selected time zone** in SQLite so the user’s choice is restored on next open, without needing the network.

## What Is Cached

| Data               | Table         | Purpose                                                                                                                              |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Time zone list     | `time_zones`  | Full list from TimeZoneDB (zone name, country code/name, GMT offset, timestamp). Used by the time zone selector and for offline use. |
| Last selected zone | `preferences` | Single key `last_selected_time_zone` stores the zone name. Restored on launch; device timezone used when nothing is saved.           |

## Data Flow

### Time zone list (selector)

1. **On launch** – `useTimeZones` runs.
2. **Read cache** – `getCachedTimeZones()` reads from `time_zones`. If the table has rows, we use that list and set `dbStatus` to `'stored'`; loading finishes and we do **not** call the API.
3. **Cache empty or DB failed** – If the cache is empty or reading the DB throws (e.g. DB deleted/corrupted), we set `dbStatus` to `'empty'` or `'unavailable'` and then call `fetchTimeZoneList()`.
4. **After API success** – We set the list in state and call `saveTimeZones(list)` to replace the contents of `time_zones` with the new data. Then we set `dbStatus` to `'stored'`.
5. **After API failure** – We set an error and leave the list empty; no cache write.

So: **first successful fetch fills the cache; afterwards the app works offline** until the cache is cleared or the DB is unavailable.

### Last selected time zone

1. **On launch** – `TimeZoneProvider` calls `getLastSelectedTimeZone()`. If a value exists, we set it as `selectedTimeZone`; otherwise we use `Intl.DateTimeFormat().resolvedOptions().timeZone`.
2. **On change** – When the user picks a zone, `setSelectedTimeZone(zone)` updates state and calls `setLastSelectedTimeZone(zone)` to persist in `preferences`. Persistence errors are ignored so the UI stays responsive.

## Database Layer

- **Engine** – `react-native-nitro-sqlite`; DB name from `constants` (`DB_NAME`).
- **Schema** – Defined in `src/db/schema.ts`:
  - `time_zones`: `zone_name` (PK), `country_code`, `country_name`, `gmt_offset`, `timestamp`.
  - `preferences`: `key` (PK), `value`.
- **Access** – All DB work goes through `src/services/database.ts`: `initDatabase`, `getCachedTimeZones`, `saveTimeZones`, `getLastSelectedTimeZone`, `setLastSelectedTimeZone`. The DB is opened once and reused (`ensureDb()`).

When saving the time zone list, we run inside a transaction: `DELETE FROM time_zones` then `INSERT` for each zone, so the cache is replaced atomically.

## DB Status and UI

`useTimeZones` exposes `dbStatus`: `'unknown'` | `'stored'` | `'empty'` | `'unavailable'`. The UI can show an indicator (e.g. “Data from device” when `stored`, or a warning when `empty`/`unavailable`) so the user knows whether they’re seeing cached data or that the cache couldn’t be used.

## Edge Cases

- **DB init fails** – `getCachedTimeZones()` throws → we set `dbStatus: 'unavailable'` and fall back to the API. If the API also fails, the user sees an error.
- **Cache empty (first install)** – We go straight to the API, then write to DB. Next launch uses cache.
- **No network when cache empty** – API fails; list stays empty and error is shown. No partial or stale cache is written.
- **Preference read/write fails** – We still update in-memory state; we only skip or ignore the DB write so the app doesn’t block. On next launch we might fall back to device timezone if the read had failed.

## Summary

| Concern                      | Approach                                                                                |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| Source of truth when offline | SQLite `time_zones` table                                                               |
| When we hit the API          | Only when cache is empty or DB read fails                                               |
| Staleness                    | No TTL; cache is updated only on explicit refetch or when cache was empty on load       |
| Selection persistence        | `preferences.last_selected_time_zone`; restore on launch, device zone as fallback       |
| Visibility                   | `dbStatus` from `useTimeZones` for UI (e.g. “from device” vs “cache empty/unavailable”) |
