---
sidebar_position: 4
---

# Ubiquitous language

This glossary defines the shared vocabulary used across all stakeholders involved in the Browser Dashboard PWA project.
These terms should be used consistently in requirements, code (class names, method names, variables), documentation, and
conversations.

The vocabulary is organized into subdomains and cross-cutting concepts.

## Core dashboard orchestration

| Term                        | Definition                                                                                                           | Example/context                                                                     |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **Dashboard**               | A personalized canvas composed of widget instances arranged according to a layout and associated with a user profile | A user creates a "Work Dashboard" with weather, tasks, and bookmarks widgets        |
| **Widget Instance**         | A concrete placement and configuration of a widget type on a dashboard                                               | "Weather: Madrid" is an instance of the Weather widget type configured for Madrid   |
| **Widget Type**             | A category of functionality available for placement on a dashboard (e.g., Bookmarks, Tasks, Weather, Calendar)       | The system supports four widget types: Bookmarks, Tasks, Weather, and Calendar      |
| **Layout**                  | The arrangement specification for widget instances including grid/region definition, ordering, and sizing rules      | A 3-column grid layout with the Weather widget in the top-left, Tasks in the center |
| **Personalization Profile** | User-scoped settings and presets that define dashboard configurations                                                | A user has "Work" and "Home" profiles with different widget arrangements            |
| **Profile**                 | See Personalization Profile                                                                                          | User switches from "Work" to "Home" profile                                         |
| **Region**                  | A designated area within a layout where widgets can be placed                                                        | The header region, main content region, sidebar region                              |
| **Canvas**                  | See Dashboard                                                                                                        | The user customizes their canvas by adding widgets                                  |

## Bookmarks subdomain

| Term                | Definition                                                               | Example/context                                                       |
|---------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------|
| **Bookmark**        | A saved link with title, URL, and optional icon/thumbnail                | "GitHub Dashboard" → https://github.com/dashboard                     |
| **Folder**          | A named container for bookmarks that can be nested hierarchically        | "Development" folder contains "Documentation" and "Tools" subfolders  |
| **Speed Dial**      | A visual grid displaying selected bookmarks and folders for quick access | User pins favorite sites to speed dial for one-click access           |
| **Root Folder**     | The top-level folder that contains all other folders and bookmarks       | All bookmarks ultimately belong to the root folder or its descendants |
| **Pinned Bookmark** | A bookmark marked for special visibility or quick access                 | User pins "Daily Standup Doc" for easy access from dashboard          |

## Tasks subdomain

| Term               | Definition                                                                   | Example/context                                                        |
|--------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| **Task**           | A work item with title, optional description, status, priority, and due date | "Review PR #123" with status "In-Progress", priority "High", due today |
| **Status**         | The current lifecycle state of a task (e.g., Todo, In-Progress, Done)        | Task moves from "Todo" to "In-Progress" when work begins               |
| **Priority**       | The importance ranking of a task (e.g., Low, Medium, High, Critical)         | Critical tasks appear at the top of the task list                      |
| **Due Date**       | The date (and optionally time) by which a task should be completed           | Task "Submit report" has due date 2025-10-25                           |
| **List / Section** | A lightweight grouping mechanism for organizing tasks                        | "Personal" and "Work" sections separate different task categories      |
| **Reminder**       | An optional notification tied to a task's due date/time                      | User sets reminder 1 hour before task deadline                         |
| **Task Lifecycle** | The progression of states a task goes through: Todo → In-Progress → Done     | System enforces the task lifecycle and allows policy-based reverts     |

## Calendar subdomain

| Term                         | Definition                                                                     | Example/context                                                 |
|------------------------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------|
| **Event**                    | A calendar entry with title, start time, end time, and optional location/notes | "Team Meeting" from 10:00 to 11:00 at Conference Room A         |
| **Start Time**               | The date and time when an event begins                                         | Event starts at 2025-10-21 14:00                                |
| **End Time**                 | The date and time when an event concludes (must be after start time)           | Event ends at 2025-10-21 15:30                                  |
| **View**                     | A display mode for calendar events (Day, Week, Month)                          | User switches to Week view to see all meetings this week        |
| **Reminder**                 | An alert triggered before an event starts                                      | 15-minute reminder before "Doctor Appointment"                  |
| **Conflict**                 | Overlapping events in time (soft awareness in MVP, not enforced)               | System warns when scheduling two events at the same time        |
| **Event Creation from Task** | A one-way operation that creates a calendar event based on task details        | User converts "Prepare presentation" task into a calendar event |

## Weather subdomain

| Term                 | Definition                                                                     | Example/context                                            |
|----------------------|--------------------------------------------------------------------------------|------------------------------------------------------------|
| **Location**         | A geographic reference (city, country code, coordinates) for weather data      | Madrid, ES (40.4168, -3.7038)                              |
| **Weather Snapshot** | Current weather conditions including temperature, status, and update timestamp | "Madrid: 22°C, Partly Cloudy, updated at 14:30"            |
| **Forecast**         | Predicted weather conditions for future time periods (future enhancement)      | 5-day forecast showing expected temperature and conditions |
| **Weather Provider** | External third-party API service that supplies weather data                    | OpenWeatherMap, WeatherAPI                                 |
| **Units**            | Temperature and measurement system (Celsius, Fahrenheit, metric, imperial)     | User preference set to Celsius and metric units            |

## Cross-cutting concepts

| Term                          | Definition                                                                     | Example/context                                                                    |
|-------------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| **User**                      | An individual person who uses the Browser Dashboard PWA                        | John creates his personalized dashboard                                            |
| **User Profile**              | The identity and preferences associated with a user                            | User profile includes theme, locale, and default settings                          |
| **Session**                   | A period of authenticated user interaction with the system                     | User session expires after 24 hours of inactivity                                  |
| **Aggregate**                 | A cluster of domain objects treated as a single unit with a root entity        | Dashboard aggregate includes widget instances and layout                           |
| **Aggregate Root**            | The entry point entity for accessing and modifying an aggregate                | Dashboard is the aggregate root for its widget instances                           |
| **Value Object**              | An immutable domain object defined by its attributes rather than identity      | URL, DateTime, Location are value objects                                          |
| **Domain Event**              | A record of something significant that happened in the domain                  | "WidgetAddedToDashboard", "TaskCompleted"                                          |
| **Bounded Context**           | A explicit boundary within which a domain model is defined and applicable      | Dashboard Context, Bookmarks Context, Tasks Context                                |
| **Context Map**               | A diagram showing relationships between bounded contexts                       | Dashboard Context integrates with Bookmarks, Tasks, Calendar, and Weather contexts |
| **Invariant**                 | A business rule that must always be true within a bounded context              | "End time must be after start time" for calendar events                            |
| **Repository**                | An abstraction for accessing and persisting aggregates                         | TaskRepository provides methods to find and save tasks                             |
| **Command**                   | A request to perform an action that changes system state                       | "AddWidgetToDashboard" command                                                     |
| **Query**                     | A request to retrieve information without changing system state                | "GetDashboardByUserId" query                                                       |
| **Local-First**               | Design approach prioritizing local storage with optional cloud synchronization | User data stored in browser IndexedDB with sync as enhancement                     |
| **Offline Capability**        | Ability to use the PWA without internet connection                             | User can manage tasks offline; changes sync when online                            |
| **PWA (Progressive Web App)** | A web application using modern APIs to provide app-like experience             | Browser Dashboard works like a native app but runs in browser                      |

## Lifecycle states

| Term            | Definition                                       | Example/context                                        |
|-----------------|--------------------------------------------------|--------------------------------------------------------|
| **Todo**        | Initial state of a task that hasn't been started | New task "Write documentation" is in Todo state        |
| **In-Progress** | State indicating active work on a task           | Developer moves task to In-Progress when starting work |
| **Done**        | Final state indicating task completion           | Task "Fix bug #456" moved to Done after testing        |

## Actions / Operations

| Term                 | Definition                                               | Example/context                                                    |
|----------------------|----------------------------------------------------------|--------------------------------------------------------------------|
| **Add Widget**       | Operation to place a new widget instance on a dashboard  | User adds Weather widget to their dashboard                        |
| **Remove Widget**    | Operation to delete a widget instance from a dashboard   | User removes Tasks widget from "Home" profile                      |
| **Reorder Widgets**  | Operation to change the sequence or position of widgets  | User drags Weather widget to top of dashboard                      |
| **Configure Widget** | Operation to modify settings of a widget instance        | User configures Weather widget to show Madrid instead of Barcelona |
| **Switch Profile**   | Operation to change between personalization profiles     | User switches from "Work" to "Home" profile                        |
| **Pin**              | Action to mark a bookmark or item for special visibility | User pins "Documentation" bookmark to speed dial                   |
| **Sync**             | Operation to synchronize local data with cloud storage   | Browser syncs dashboard changes to cloud when connection restored  |

## Notes

- Terms are **case-sensitive** when used in code (follow language conventions: PascalCase for classes, camelCase for
  methods/variables)
- Synonyms should be avoided; choose one term and use it consistently
- When domain language differs from technical implementation, prefer domain terms in business contexts and technical
  terms in code comments
- New terms should be added to this glossary as the domain model evolves

:::tip

This ubiquitous language should be reflected in:

- **Code:** Class names, method names, variable names
- **Documentation:** All requirements, architecture, and design documents
- **Conversations:** Discussions between developers, stakeholders, and domain experts
- **Tests:** BDD scenario descriptions and test names

:::

:::warning

Avoid using ambiguous terms like "item," "thing," "data," or "entity" without qualification. Always use the specific
domain term (Task, Bookmark, Event, etc.)

:::
