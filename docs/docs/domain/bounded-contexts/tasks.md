---
sidebar_position: 4
---

# Tasks (Supporting)

## Context summary

- Code: `TSK`
- Mission: Provide lightweight personal task management with statuses, priorities, and due dates.
- Scope: CRUD for tasks; status lifecycle; priorities and due dates; optional lists/sections; supply task data to
  dashboard widget(s); request event creation in Calendar.
- Out of Scope: Complex project management (dependencies, sprints), team collaboration, advanced scheduling.

## Ownership

- Tasks team (primary developer)

## Domain model

- Aggregates
    - TaskList (root, optional): owns Tasks; or flat model with Task as root
    - Task: work item with status, priority, due date, optional description
- Key invariants
    - A task has exactly one status from the defined lifecycle (e.g., Todo, In‑Progress, Done)
    - Priority must be one of the defined values
    - If a due date is set, it must be a valid timestamp
    - Tasks belong to exactly one user (scoped by identity)

## Capabilities

- Commands: CreateTask, UpdateTask, DeleteTask, ChangeTaskStatus, ChangePriority, SetDueDate, ReorderTasks,
  CreateEventFromTask
- Queries: GetAllTasks, GetTasksByStatus, GetTasksByPriority, GetOverdueTasks, SearchTasks
- Policies/Rules: enforce lifecycle transitions; optional list/section grouping and stable ordering; validation for
  priority/due date; idempotent event-creation requests

## Events

- Published: TaskCreated, TaskUpdated, TaskDeleted, TaskStatusChanged, TaskCompleted, TaskPriorityChanged,
  EventCreationRequestedFromTask
- Consumed: UserRegistered (initialize a default list), DashboardCreated (optional widget init)

## Integration and dependencies

- Upstream (Conformist): User Identity (user model)
- Downstream (Customer–Supplier): Dashboard Management (provides task data for widgets)
- Lateral (Partnership): Calendar (accepts EventCreationRequestedFromTask to create events)
- Notes: Tasks remain the source of truth for task data; Calendar owns created events

## Contract and SLA

- Consistency: strong within task updates; eventual for dashboard widgets via events
- Versioning: additive fields in queries; versioned event contracts for lifecycle changes

## Risks and evolution

- Risk: scope creeping toward project management—mitigate by keeping lists lightweight and avoiding dependency graph
- Possible evolution: reminders/notifications policy; templates or recurring tasks if needed later
