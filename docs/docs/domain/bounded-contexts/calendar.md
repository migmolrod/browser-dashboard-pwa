---
sidebar_position: 5
---

# Calendar (Supporting)

## Context summary

- Code: `CAL`
- Mission: Manage personal calendar events with basic views and reminders.
- Scope: CRUD for events; enforce timing rules; reminders; Day/Week/Month query views; accept event creation requests
  from Tasks; supply calendar data to dashboard widget(s).
- Out of Scope: External calendar integrations (Google/Outlook), complex recurrence rules, team/shared calendars.

## Ownership

- Calendar team (primary developer)

## Domain model

- Aggregates
    - Calendar (root): owns Events (single calendar in MVP)
    - Event: title, start/end time, optional location/notes/reminders
- Key invariants
    - End time must be after start time
    - Events belong to exactly one calendar
    - Reminder time must be before event start time

## Capabilities

- Commands: CreateEvent, UpdateEvent, DeleteEvent, RescheduleEvent, SetReminder
- Queries: GetEventsForDateRange, GetEventsForDay, GetEventsForWeek, GetEventsForMonth, GetUpcomingEvents
- Policies/Rules: validate temporal constraints; maintain non-overlapping reminder timing; lightweight conflict
  awareness (soft)

## Events

- Published: EventCreated, EventUpdated, EventDeleted, EventRescheduled, ReminderSet
- Consumed: UserRegistered (initialize default calendar), EventCreationRequestedFromTask (create event from a task),
  DashboardCreated (optional widget init)

## Integration and dependencies

- Upstream (Conformist): User Identity (user model)
- Downstream (Customer–Supplier): Dashboard Management (provides calendar data for widgets)
- Lateral (Partnership): Tasks (consumes EventCreationRequestedFromTask to create events)
- Notes: Calendar owns event lifecycle; does not manage task state

## Contract and SLA

- Consistency: strong within event updates; eventual for dashboard consumers via events
- Versioning: additive changes to query shapes; versioned event schemas for temporal fields

## Risks and evolution

- Risk: recurrence and shared calendars expanding scope—defer to a future “Recurrence/Sharing” module if needed
- Possible evolution: snooze/dismiss reminder actions; ICS import/export behind an ACL later
