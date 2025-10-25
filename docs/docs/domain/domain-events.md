---
sidebar_position: 7
title: Domain events
slug: domain-events
---

# Domain events

This catalog lists the domain events used across bounded contexts. It aligns with the Bounded Contexts and Processes &
Workflows documents to ensure consistency.

Conventions:

- Name in past tense (what happened).
- Each event has a single owning (publishing) context.
- Other contexts may consume it to update read models or trigger follow-up actions.

## Dashboard Management (publishes)

- DashboardCreated
    - When a new dashboard is created for a user.
    - Payload: \{ dashboardId, userId, profileId, createdAt \}
- DashboardDeleted
    - Dashboard removed (composition only).
    - Payload: \{ dashboardId, userId, deletedAt \}
- WidgetAddedToDashboard
    - A widget instance was added.
    - Payload: \{ dashboardId, widgetInstanceId, widgetType, addedAt \}
- WidgetRemovedFromDashboard
    - A widget instance was removed.
    - Payload: \{ dashboardId, widgetInstanceId, widgetType, removedAt \}
- WidgetConfigurationChanged
    - A widget instance configuration changed.
    - Payload: \{ dashboardId, widgetInstanceId, widgetType, settings, changedAt \}
- WidgetReordered
    - One or more widget positions changed.
    - Payload: \{ dashboardId, changes: LayoutChange[], changedAt \}
- ProfileSwitched
    - Active profile for the dashboard changed.
    - Payload: \{ userId, profileId, switchedAt \}

Consumes:

- UserRegistered
- PreferencesUpdated
- TaskUpdated
- EventCreated
- BookmarkPinned
- WeatherDataRefreshed

## Bookmarks (publishes)

- FolderCreated
    - Payload: \{ folderId, userId, parentFolderId?, name, createdAt \}
- FolderRenamed
    - Payload: \{ folderId, userId, newName, renamedAt \}
- FolderDeleted
    - Payload: \{ folderId, userId, deletedAt \}
- BookmarkCreated
    - Payload: \{ bookmarkId, userId, folderId, title, url, createdAt \}
- BookmarkUpdated
    - Payload: \{ bookmarkId, userId, changes, updatedAt \}
- BookmarkDeleted
    - Payload: \{ bookmarkId, userId, deletedAt \}
- BookmarkPinned
    - Payload: \{ bookmarkId, userId, pinnedAt \}
- BookmarkUnpinned
    - Payload: \{ bookmarkId, userId, unpinnedAt \}

Consumes:

- UserRegistered
- ProfileSwitched (optional)

## Tasks (publishes)

- TaskCreated
    - Payload: \{ taskId, userId, title, priority, dueDate?, createdAt \}
- TaskUpdated
    - Payload: \{ taskId, userId, changes, updatedAt \}
- TaskDeleted
    - Payload: \{ taskId, userId, deletedAt \}
- TaskStatusChanged
    - Payload: \{ taskId, userId, fromStatus, toStatus, changedAt \}
- TaskCompleted
    - Payload: \{ taskId, userId, completedAt \}
- TaskPriorityChanged
    - Payload: \{ taskId, userId, fromPriority, toPriority, changedAt \}
- EventCreationRequestedFromTask
    - Intent to create a calendar event from a task.
    - Payload: \{ taskId, userId, title, dueDate?, notes? \}

Consumes:

- UserRegistered

## Calendar (publishes)

- EventCreated
    - Payload: \{ eventId, userId, title, startTime, endTime, createdAt \}
- EventUpdated
    - Payload: \{ eventId, userId, changes, updatedAt \}
- EventDeleted
    - Payload: \{ eventId, userId, deletedAt \}
- EventRescheduled
    - Payload: \{ eventId, userId, from: \{start, end\}, to: \{start, end\}, changedAt \}
- ReminderSet
    - Payload: \{ eventId, userId, reminderTime, setAt \}

Consumes:

- UserRegistered
- EventCreationRequestedFromTask

## Weather (publishes)

- WeatherDataRefreshed
    - Payload: \{ userId, location, snapshot: \{ temperature, conditions, units, providerTimestamp \}, refreshedAt \}
- WeatherFetchFailed
    - Payload: \{ userId, location, errorCode, occurredAt \}

Consumes:

- WidgetConfigurationChanged
- ProfileSwitched
- PreferencesUpdated

## Preferences (publishes)

- PreferencesUpdated
    - Payload: \{ userId, changes: \{ theme?, locale?, timezone?, units? \}, updatedAt \}
- ThemeChanged
    - Payload: \{ userId, fromTheme, toTheme, changedAt \}
- LocaleChanged
    - Payload: \{ userId, fromLocale, toLocale, changedAt \}
- TimezoneChanged
    - Payload: \{ userId, fromTz, toTz, changedAt \}

Consumes:

- UserRegistered

## User Identity (publishes)

- UserRegistered
    - Payload: \{ userId, username, registeredAt \}
- UserLoggedIn
    - Payload: \{ userId, loggedInAt \}
- UserLoggedOut
    - Payload: \{ userId, loggedOutAt \}
- UserDeleted
    - Payload: \{ userId, deletedAt \}

Consumes:

- —

## Synchronization

Consumes:

- All domain events above (used for local-first sync, conflict detection, and propagation)

## Notes

- Event payloads are indicative and may be refined during implementation; event names and ownership are stable.
- Dashboard Management consumes supplier events strictly to refresh read models for widgets; it does not own supplier
  data.
- Cross-context intents use “Requested” (e.g., EventCreationRequestedFromTask) to avoid tight coupling.
