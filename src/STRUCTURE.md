# Analog Clock – Folder Structure

## Overview

This layout supports: **Analog Clock UI**, **Time Zone Selector** (API + offline), **SQLite persistence**, and clear separation of components, hooks, services, and types.

## Directory Layout

```
src/
├── components/           # Reusable UI (no third-party clock components)
│   ├── AnalogClock/      # Clock face + hands, resizes for device/orientation
│   │   ├── index.tsx
│   │   ├── AnalogClock.styles.ts
│   │   ├── ClockFace.tsx
│   │   └── ClockHands.tsx
│   └── TimeZoneSelector/ # Dropdown/list of time zones
│       ├── index.ts
│       ├── TimeZoneSelector.tsx
│       ├── TimeZoneSelector.styles.ts
│       └── ZoneItem.tsx
├── screens/
│   ├── HomeScreen.tsx    # Main screen: clock + selector
│   └── HomeScreen.styles.ts
├── hooks/                # React hooks for state/logic
│   ├── index.ts
│   ├── useTime.ts        # Real-time clock time for a time zone
│   └── useTimeZones.ts   # Load zones from DB or API, cache in DB
├── services/             # API and persistence
│   ├── index.ts
│   ├── timeZoneApi.ts    # TimeZoneDB API (https://timezonedb.com/api)
│   └── database.ts       # SQLite: cache time zones, last selected zone
├── db/
│   └── schema.ts         # SQLite table definitions
├── context/
│   └── TimeZoneContext.tsx  # Selected time zone + persist/restore
├── types/
│   └── index.ts          # TimeZoneEntry, ClockTime, etc.
├── constants/
│   └── index.ts          # API URL, DB name
├── utils/
│   └── index.ts          # Helpers (date/time, layout)
└── STRUCTURE.md          # This file
```

## Requirements Mapping

| Requirement | Location |
|------------|----------|
| Analog clock (hour/minute/second, real time, resize) | `components/AnalogClock/`, `hooks/useTime.ts` |
| Time zone selector (list, fetch from API) | `components/TimeZoneSelector/`, `services/timeZoneApi.ts` |
| Offline: cache in SQLite, load on launch, fallback to API | `services/database.ts`, `db/schema.ts`, `hooks/useTimeZones.ts` |
| Persist/restore last selected time zone | `services/database.ts`, `context/TimeZoneContext.tsx` |
| Architecture: components, hooks, documentation | Above structure + JSDoc in files |

## Entry Point

- `App.tsx` at project root should wrap the app in `TimeZoneProvider` and render `HomeScreen` (from `src/screens/HomeScreen.tsx`).
