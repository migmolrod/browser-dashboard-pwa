---
sidebar_position: 2
---

# Dashboard management (Core)

## Context summary

- Code: `DAS`
- Mission: Orchestrate dashboard composition, layout, and personalization—the system’s core differentiator.
- Scope: Dashboard lifecycle; widget instance placement/configuration; layout rules; personalization profiles;
  coordination with widget contexts for data.
- Out of Scope: Widget-specific business logic; authentication/authorization.

## Ownership

- Dashboard team (primary developer).

## Domain model

### Aggregates

- Dashboard (root): owns widget instances and layout configuration.
- WidgetInstance: configuration and placement of a widget on a dashboard.
- Layout: grid/region definitions and sizing/rules.

### Key invariants

- A dashboard belongs to exactly one user.
- A widget instance must reference a valid widget type and configuration schema.
- Layout positions cannot overlap.
- Each profile must have a unique name per user.

## Capabilities

- Commands: CreateDashboard, DeleteDashboard, AddWidget, RemoveWidget, ConfigureWidget, ReorderWidgets, SwitchProfile.
- Queries: GetDashboardByUserId, GetWidgetInstanceById, GetAllProfilesForUser.
- Policies/Rules: enforce layout constraints; apply and persist profile settings; validate widget types/config schemas.

## Events

- Published: DashboardCreated, DashboardDeleted, WidgetAddedToDashboard, WidgetRemovedFromDashboard,
  WidgetConfigurationChanged, WidgetReordered, ProfileSwitched.
- Consumed: UserRegistered, PreferencesUpdated, TaskUpdated, EventCreated, BookmarkPinned, WeatherDataRefreshed.

## Integration and dependencies

- Upstream (Conformist): User Identity (user model).
- Upstream (Customer–Supplier): Preferences (themes, defaults).
- Downstream (Customer–Supplier): Bookmarks, Tasks, Calendar, Weather (supply data for widgets).
- Notes: Widget contexts provide data; Dashboard composes and personalizes views.

## Contract and SLA

- Consistency: strong for layout updates; eventual for widget data refreshes.
- Versioning: additive event versioning; backward-compatible query responses.

## Risks and evolution

- Potential split: “Dashboard Composition” vs “Layout Engine” if complexity grows.
- Risk: tight coupling to widget schemas—mitigate via schema validation and versioned contracts.
