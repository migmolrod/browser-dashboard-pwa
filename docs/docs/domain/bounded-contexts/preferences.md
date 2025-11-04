---
sidebar_position: 8
---

# Preferences (Generic)

## Context Summary

- Mission: Manage cross‑cutting user preferences such as theme, locale, timezone, and defaults.
- Scope: Store/retrieve preferences; provide sensible defaults; notify other contexts on changes.
- Out of Scope: Widget-specific business settings (owned by respective contexts), advanced policy/entitlement
  management.

## Ownership

- Platform/Infrastructure team

## Domain Model

- Aggregates
    - UserPreferences (root): theme, locale, timezone, widget defaults
- Key invariants
    - Preferences belong to exactly one user
    - Locale and timezone values must be valid per supported catalogs

## Capabilities

- Commands: UpdatePreferences, SetTheme, SetLocale, SetTimezone
- Queries: GetPreferencesByUserId
- Policies/Rules: default preference creation on user registration; validation against supported
  themes/locales/timezones

## Events

- Published: PreferencesUpdated, ThemeChanged, LocaleChanged
- Consumed: UserRegistered (create defaults)

## Integration & Dependencies

- Upstream (Shared Kernel/Conformist): User Identity (UserId association)
- Downstream (Customer–Supplier): Dashboard Management and widget contexts consume preference updates
- Notes: Acts as single source of truth for cross‑cutting user settings

## Contract & SLA (optional)

- Consistency: strong for preference mutations; eventual for consumers via events
- Versioning: additive evolution of preference schema; event versioning guarantees backward compatibility

## Risks & Evolution (optional)

- Risk: preference bloat (too many cross‑cutting fields)—mitigate by pushing widget‑specific settings to owning contexts
- Possible evolution: per‑device overrides; preference profiles with opt-in switching
