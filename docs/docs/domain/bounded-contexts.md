sidebar_position: 5
title: Bounded Contexts
---

# Bounded Contexts

This section defines the bounded contexts identified in the Browser Dashboard PWA system. Each bounded context
represents a distinct area of the domain with its own models, vocabulary, and boundaries. These contexts align with our
strategic subdomain classification (core, supporting, generic).

## Overview

The Browser Dashboard PWA is divided into the following bounded contexts:

1. **Dashboard Management Context** (Core)
2. **Bookmarks Context** (Supporting)
3. **Tasks Context** (Supporting)
4. **Calendar Context** (Supporting)
5. **Weather Context** (Supporting)
6. **User Identity Context** (Generic)
7. **Preferences Context** (Generic)
8. **Synchronization Context** (Generic)

## Context Definitions

### 1. Dashboard Management Context (Core)

**Purpose**: Orchestrate the composition, layout, and personalization of user dashboards. This is the core
differentiator of the system.

**Ownership**: Dashboard team (in this case, the primary developer)

**Responsibilities**:

- Manage dashboard lifecycle (create, update, delete)
- Handle widget instance placement and configuration
- Enforce layout rules and constraints
- Manage personalization profiles
- Coordinate with other contexts to retrieve widget data

**Key Aggregates**:

- `Dashboard` (root): Owns widget instances and layout configuration
- `WidgetInstance`: Configuration and placement of a widget on a dashboard
- `Layout`: Grid/region definitions and sizing rules

**Published Events**:

- `DashboardCreated`
- `DashboardDeleted`
- `WidgetAddedToDashboard`
- `WidgetRemovedFromDashboard`
- `WidgetConfigurationChanged`
- `WidgetReordered`
- `ProfileSwitched`

**Consumed Events**:

- `UserRegistered` (from User Identity Context)
- `PreferencesUpdated` (from Preferences Context)
- `TaskUpdated` (from Tasks Context; used to refresh Tasks widget)
- `EventCreated` (from Calendar Context; used to refresh Calendar widget)
- `BookmarkPinned` (from Bookmarks Context; used to refresh Bookmarks/Speed Dial widget)
- `WeatherDataRefreshed` (from Weather Context; used to refresh Weather widget)

**Exposed APIs**:

- Commands: `CreateDashboard`, `DeleteDashboard`, `AddWidget`, `RemoveWidget`, `ConfigureWidget`, `ReorderWidgets`,
  `SwitchProfile`
- Queries: `GetDashboardByUserId`, `GetWidgetInstanceById`, `GetAllProfilesForUser`

**Dependencies**:

- User Identity Context (to validate user ownership)
- Preferences Context (to load theme and default settings)
- Widget-specific contexts (to validate widget types and configurations)

**Boundaries**:

- **In scope**: Dashboard structure, widget placement, layout rules, profile management
- **Out of scope**: Widget-specific business logic (delegated to respective contexts), authentication logic

**Invariants**:

- A dashboard belongs to exactly one user
- A widget instance must reference a valid widget type
- Layout positions cannot overlap
- Each profile must have a unique name per user

---

### 2. Bookmarks Context (Supporting)

**Purpose**: Manage hierarchical bookmarks (folders and links) with quick-access features like speed dial.

**Ownership**: Bookmarks team (in this case, the primary developer)

**Responsibilities**:

- CRUD operations on bookmarks and folders
- Maintain folder hierarchy
- Handle reordering within folders
- Manage pinned/favorite bookmarks
- Provide bookmark data to Dashboard Context for widget display

**Key Aggregates**:

- `Folder` (root): Owns child folders and bookmarks
- `Bookmark`: Link with title, URL, icon/thumbnail

**Published Events**:

- `FolderCreated`
- `FolderRenamed`
- `FolderDeleted`
- `BookmarkCreated`
- `BookmarkUpdated`
- `BookmarkDeleted`
- `BookmarkPinned`
- `BookmarkUnpinned`

**Consumed Events**:

- `UserRegistered` (to create root folder)
- `DashboardCreated` (to initialize bookmark widget if present)
- `ProfileSwitched` (from Dashboard Management; optional widget/profile-specific reactions)

**Exposed APIs**:

- Commands: `CreateBookmark`, `UpdateBookmark`, `DeleteBookmark`, `CreateFolder`, `RenameFolder`, `DeleteFolder`,
  `ReorderBookmarks`, `PinBookmark`
- Queries: `GetAllBookmarks`, `GetBookmarksByFolder`, `Get
