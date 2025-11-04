---
sidebar_position: 3
---

# Core Domain Concepts

This section identifies the strategic subdomains (core, supporting, generic) and the key concepts driving the Browser
Dashboard PWA. The scope is intentionally constrained to four widgets: bookmarks, tasks, weather, and calendar.

## Strategic Subdomains

### Core subdomain

**Personal Dashboard Orchestration**: Composition, layout, and personalization of the user’s homepage. It governs how
widgets are configured, arranged, and persisted per user and device profile. This is the differentiator: a cohesive,
streamlined experience rather than the individual widgets themselves.

### Supporting subdomains

- **Bookmarks**: Manage hierarchical links (folders and entries), quick access, and visual speed‑dial.
- **Tasks**: Lightweight personal task management (title, status, due date, priority).
- **Calendar**: Personal events (title, time span, reminders), basic views, optional linkage to tasks.
- **Weather**: Read-only consumption of third‑party weather data for a chosen location.

### Generic subdomains

- **Identity & Access** (local-first): User identification, session, and basic auth if needed.
- **Preferences & Settings**: Theme, locale, time zone, widget defaults.
- **Synchronization & Storage**: Local/offline persistence, cloud sync.
- **Observability & Telemetry**: Logs/metrics for troubleshooting (non-functional).

**Strategic priority**: invest most design rigor in the Core Dashboard Orchestration; keep supporting subdomains simple
and cohesive; rely on generic commodity approaches for cross-cutting needs.

## Core Dashboard Orchestration (Core)

- **Concepts**
    - **Dashboard**: A personalized canvas composed of widget instances.
    - **Widget Instance**: A concrete placement/configuration of a widget type (e.g., “Weather: Madrid”).
    - **Layout**: Grid/region definition, ordering, and sizing rules.
    - **Personalization Profile**: User-scoped settings and presets (e.g., “Work,” “Home” profiles).
- **Capabilities**
    - **Add/remove/reorder** widgets on the dashboard.
    - **Configure widget-level** settings and persist them.
    - **Switch profiles** and restore layouts quickly.
    - **Enforce consistency** and guard-rails (e.g., layout constraints).
- **Invariants**
    - A dashboard belongs to exactly one user profile.
    - A widget instance must reference a valid widget type and configuration schema.
    - Layout positions cannot overlap; ordering is total within a region.

## Supporting Subdomains

### Bookmarks

- **Concepts**
    - Folder: Named container; can be nested.
    - Bookmark: Link with title, URL, optional icon/thumbnail.
    - Speed Dial: Visual grid of selected bookmarks/folders for quick access.
- **Capabilities**
    - Create/edit/delete folders and bookmarks.
    - Reorder items within a folder or speed dial.
    - Mark favorites/pinned for dashboard placement.
- **Invariants**
    - Each bookmark belongs to exactly one folder (root is allowed).
    - URLs must be valid; policy may prevent duplicates per folder.

### Tasks

- **Concepts**
    - **Task**: Title, description (optional), status (e.g., Todo, In‑Progress, Done), priority, due date.
    - **List/Section**: Lightweight grouping (e.g., “Personal”, “Work”).
    - **Reminder**: Optional notification tied to due date/time.
- **Capabilities**
    - **Create/edit/delete tasks**; change status; reorder.
    - **Filter/search** by status, due date, priority.
    - **Optional linkage to calendar** events (one‑way create event from task).
- **Invariants**
    - A task has exactly one status from the defined lifecycle.
    - If a due date is set, it must be in a valid time window.

### Calendar

- **Concepts**
    - **Event**: Title, start time, end time, optional location/notes.
    - **View**: Day/Week/Month simplified views.
    - **Reminder**: Optional alert prior to start.
- **Capabilities**
    - **Create/edit/delete events**; drag‑to‑move in UI (conceptually reorder/retime).
    - Basic conflict awareness (optional; no hard constraint).
    - **Create event from a task** (copy title/due date).
- **Invariants**
    - The `endTime` must be after the `startTime`.
    - Events belong to exactly one calendar (single local calendar in MVP).

### Weather

- **Concepts**
    - **Location**: City/coordinates.
    - **Weather Snapshot**: Temperature, conditions, updatedAt.
    - **Forecast** (optional later): Next N periods.
- **Capabilities**
    - Configure the **default location(s)** per widget instance.
    - **Fetch and cache** current weather from **third‑party API**.
- Invariants
    - A snapshot must include the provider timestamp and units.

## Cross‑Widget Relationships

- **Tasks ↔ Calendar**: “Create Event from Task” (non-blocking, one‑way copy).
- **Bookmarks ↔ Dashboard**: “Pin to Speed Dial” and “Place on Dashboard” shortcuts.
- **Weather ↔ Dashboard**: Read-only card shows a configured location; multiple instances allowed.

## Value Objects and Common Types

- **Identifier**: Strongly typed IDs for aggregates (UserId, DashboardId, WidgetInstanceId, TaskId, EventId, FolderId,
  BookmarkId).
- **Name/Title**: Non-empty, length‑bounded text.
- **URL**: Validated absolute URL.
- **DateTime/TimeSpan**: Timezone-aware types; respect user preferences.
- **Status/Priority**: Enumerations with explicit lifecycle/ordering.
- **Location**: City, country code, coordinates.

## Aggregate Candidates

- **Dashboard** (aggregate root): owns WidgetInstances and Layout.
- **Folder** (aggregate root): owns Bookmarks (tree via parentId).
- **TaskList** (aggregate root): owns Tasks; or Task as root if kept flat.
- **Calendar** (aggregate root): owns Events.
- **Weather** is likely read model only (no aggregate); configuration lives in WidgetInstance.

## Domain Policies (Selected)

- **Layout policy**: prevent overlapping placements; maintain stable ordering.
- **Task lifecycle**: Todo → In‑Progress → Done (allow revert by policy).
- **Event timing**: enforce start < end; optional soft conflicts only.
- **Weather optimization**: Rate limits/caching for weather reads to avoid excessive API calls.

## What’s Core vs. Commodity

- **Core**: Orchestration of a coherent, low‑friction personal dashboard with profile‑based personalization and
  consistent UX.
- **Commodity**: CRUD for bookmarks/tasks/events and external weather integration kept intentionally simple.

This foundation will guide bounded contexts, ubiquitous language, and later process modeling.
