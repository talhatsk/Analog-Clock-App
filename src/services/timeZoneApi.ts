/**
 * Fetches time zone list from TimeZoneDB API.
 * https://timezonedb.com/api
 * Endpoint: http://api.timezonedb.com/v2.1/list-time-zone
 */

import {TIMEZONE_LIST_URL, TIMEZONE_API_KEY} from '../constants';
import type {TimeZoneEntry, TimeZoneDbResponse} from '../types';

/**
 * Fetches the list of time zones from TimeZoneDB API.
 * Requires a valid API key in constants (get one at https://timezonedb.com/api).
 */
export async function fetchTimeZoneList(): Promise<TimeZoneEntry[]> {
  const apiKey = TIMEZONE_API_KEY;
  if (!apiKey) {
    throw new Error(
      'TimeZoneDB API key is missing. Add TIMEZONE_API_KEY in src/constants/index.ts (get a free key at https://timezonedb.com/api)',
    );
  }

  const url = `${TIMEZONE_LIST_URL}?key=${encodeURIComponent(
    apiKey,
  )}&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `TimeZoneDB request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: TimeZoneDbResponse = await response.json();

  if (data.status !== 'OK') {
    throw new Error(data.message ?? 'TimeZoneDB returned an error');
  }

  const zones = data.zones ?? [];
  return zones.map(
    (z): TimeZoneEntry => ({
      zoneName: z.zoneName,
      countryCode: z.countryCode,
      countryName: z.countryName,
      gmtOffset: z.gmtOffset,
      timestamp: z.timestamp,
    }),
  );
}
