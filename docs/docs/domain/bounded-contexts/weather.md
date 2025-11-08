---
sidebar_position: 6
---

# Weather (Supporting)

## Context Summary

- Code: `WEA`
- Mission: Fetch and present current weather for configured locations.
- Scope: Retrieve from third‑party provider; cache snapshots; handle per‑widget location/config; supply data to
  dashboard widget(s).
- Out of Scope: Historical data, detailed forecasts, weather alerts, provider account management.

## Ownership

- Weather team (primary developer)

## Domain Model

- Aggregates
    - (Read‑model oriented) No true aggregate; configuration typically lives in Dashboard’s WidgetInstance
    - WeatherSnapshot (value object): temperature, conditions, units, provider timestamp, location
- Key invariants
    - WeatherSnapshot must include provider timestamp and units
    - Location must be valid (city and/or coordinates)

## Capabilities

- Commands: RefreshWeatherData, ConfigureWeatherLocation
- Queries: GetCurrentWeather, GetWeatherByLocation
- Policies/Rules: rate‑limit and cache responses; respect user units from Preferences; validate location config

## Events

- Published: WeatherDataRefreshed, WeatherFetchFailed
- Consumed: WidgetConfigurationChanged (update location), DashboardCreated (optional widget init), PreferencesUpdated (
  units)

## Integration & Dependencies

- Upstream (Conformist): Preferences (units, locale)
- Downstream (Customer–Supplier): Dashboard Management (provides data for widgets)
- External (ACL): Weather Provider API (e.g., OpenWeatherMap) behind an anti‑corruption layer
- Notes: Translates provider payloads into WeatherSnapshot to isolate external model

## Contract & SLA (optional)

- Consistency: eventual; consumers tolerate slightly stale cached data
- Versioning: internal adapter shields provider API changes; events/queries evolve additively

## Risks & Evolution (optional)

- Risk: provider limits/outages—mitigate with caching, backoff, and degraded UI
- Possible evolution: multi‑day forecasts and alerts as separate read models if needed later
