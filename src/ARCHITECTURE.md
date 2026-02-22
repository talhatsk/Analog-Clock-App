# Architecture decisions

- **Feature-based `src/` layout** – UI lives under `components/` and `screens/`, logic under `hooks/`, `services/`, and `context/`. This keeps screens thin and makes reuse and testing straightforward.

- **React hooks for state** – `useTime` drives the clock (per-second updates for a time zone). `useTimeZones` handles “load from DB first, then API if needed” and exposes `dbStatus` for the DB indicator. All state is hook-based; no global store.

- **Context for selection only** – `TimeZoneContext` holds the selected time zone and persists it via the DB. Restore runs once on launch; device timezone is used when nothing is saved. This avoids prop drilling without introducing a full app-state layer.

- **Services for side effects** – `timeZoneApi` does the TimeZoneDB fetch; `database` wraps SQLite (react-native-nitro-sqlite) for the time-zone cache and preferences. Screens and hooks call these; no direct DB/API access in UI components.

- **Offline-first time zones** – On launch we read from SQLite; we hit the API only when the cache is empty or the DB is missing/corrupted, then we write the result back. So the app works offline after the first successful fetch.

- **Analog clock without third-party widgets** – The clock is built from `ClockFace` (numbers, face) and `ClockHands` (hour/minute/second with correct rotation). Time is computed with `Intl` for the chosen time zone and updated every second in `useTime`.

- **Single main screen** – One screen composes the clock, time zone label, DB status, and time zone list. Navigation is out of scope; all behavior stays on `HomeScreen`.
