/**
 * Shared TypeScript types and interfaces for the Analog Clock app.
 */

/** Time zone entry from API or local DB */
export interface TimeZoneEntry {
  zoneName: string;
  countryCode: string;
  countryName?: string;
  gmtOffset: number;
  timestamp?: number;
}

/** Clock time in hours, minutes, seconds (for hand angles) */
export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export type DbStatus = 'unknown' | 'unavailable' | 'empty' | 'stored';

/** Props for the main AnalogClock component */
export interface AnalogClockProps {
  time: ClockTime;
  size: number;
}

/** Props for TimeZoneSelector (list + search) */
export interface TimeZoneSelectorProps {
  timeZones: TimeZoneEntry[];
  selectedTimeZone: string;
  onSelect: (zoneName: string) => void;
  loading?: boolean;
}

/** Props for a single ZoneItem in the time zone list */
export interface ZoneItemProps {
  zone: TimeZoneEntry;
  isSelected: boolean;
  onPress: () => void;
}

/** Time zone context value (selected zone + setter) */
export interface TimeZoneContextType {
  selectedTimeZone: string;
  setSelectedTimeZone: (zone: string) => void;
}

/** Props for ClockFace */
export interface ClockFaceProps {
  size: number;
}

/** Props for ClockHands */
export interface ClockHandsProps {
  size: number;
  time: ClockTime;
}

/** Raw zone object from TimeZoneDB list-time-zone API response */
export interface TimeZoneDbZone {
  zoneName: string;
  countryCode: string;
  countryName?: string;
  gmtOffset: number;
  timestamp?: number;
}

/** TimeZoneDB API list-time-zone response shape */
export interface TimeZoneDbResponse {
  status: 'OK' | 'FAILED';
  message?: string;
  zones?: TimeZoneDbZone[];
}
