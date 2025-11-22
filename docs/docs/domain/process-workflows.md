---
sidebar_position: 6
---

# Processes and workflows

This section describes key end-to-end workflows across bounded contexts. Diagrams are expressed in BPMN‑like notation
using Mermaid for readability. Each workflow includes a brief narrative.

:::note Legend

- Pools represent bounded contexts
- Events: (o) Start, (x) End
- Tasks: Rounded rectangles
- Messages: Dashed arrows across pools
- Data stores: Implicit per context; no cross‑DB calls

:::

---

## User onboarding

Narrative: When a user registers, foundational contexts initialize defaults so the system is immediately usable.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant ID as User Identity
    participant PREF as Preferences
    participant DASH as Dashboard Management
    participant TASK as Tasks
    participant CAL as Calendar
    participant BM as Bookmarks
    UI ->> ID: RegisterUser(username, password)
    ID -->> UI: UserRegistered(UserId)
    ID -->> PREF: DomainEvent UserRegistered(UserId)
    PREF -->> ID: PreferencesCreated(UserId, defaults)
    ID -->> DASH: DomainEvent UserRegistered(UserId)
    DASH -->> ID: DashboardCreated(UserId, DefaultProfile)
    ID -->> TASK: DomainEvent UserRegistered(UserId)
    TASK -->> ID: DefaultTaskListCreated(UserId)
    ID -->> CAL: DomainEvent UserRegistered(UserId)
    CAL -->> ID: CalendarCreated(UserId)
    ID -->> BM: DomainEvent UserRegistered(UserId)
    BM -->> ID: RootFolderCreated(UserId)
```

Key outputs:

- UserPreferences created
- Default Dashboard with profile
- Default TaskList, Calendar, and Bookmarks root folder

---

## Compose a dashboard (Add/Configure/Reorder widgets)

Narrative: A user personalizes their dashboard by adding a widget instance, configuring it, and reordering layout
positions.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant DASH as Dashboard Management
    participant PREF as Preferences
    participant TASK as Tasks
    participant CAL as Calendar
    participant BM as Bookmarks
    participant WEA as Weather
    UI ->> DASH: AddWidget(DashboardId, WidgetType)
    DASH -->> UI: WidgetAddedToDashboard(WidgetInstanceId)
    UI ->> DASH: ConfigureWidget(WidgetInstanceId, Settings)
    DASH -->> UI: WidgetConfigurationChanged
    DASH -->> WEA: DomainEvent WidgetConfigurationChanged (if Weather)
    DASH -->> TASK: DomainEvent WidgetConfigurationChanged (if Tasks)
    DASH -->> CAL: DomainEvent WidgetConfigurationChanged (if Calendar)
    DASH -->> BM: DomainEvent WidgetConfigurationChanged (if Bookmarks)
    UI ->> DASH: ReorderWidgets(LayoutChanges)
    DASH -->> UI: WidgetReordered (layout valid)
```

Policy guards:

- Layout positions cannot overlap
- Widget type must be supported
- Configuration validated by supplier contexts when applicable

---

## Manage tasks and create calendar event from a task

Narrative: A user updates the task state and optionally creates a related calendar event.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant TASK as Tasks
    participant CAL as Calendar
    participant DASH as Dashboard Management
    UI ->> TASK: CreateTask(Title, Priority, DueDate?)
    TASK -->> UI: TaskCreated(TaskId)
    UI ->> TASK: ChangeTaskStatus(TaskId, In-Progress)
    TASK -->> UI: TaskStatusChanged
    UI ->> TASK: CreateEventFromTask(TaskId)
    TASK -->> CAL: DomainEvent EventCreationRequestedFromTask(TaskId, Title, DueDate)
    CAL -->> TASK: EventCreated(EventId)
    CAL -->> UI: EventCreated(EventId)
    TASK -->> DASH: DomainEvent TaskUpdated (for widget refresh)
    CAL -->> DASH: DomainEvent EventCreated (for widget refresh)
```

Invariants:

- Task status must be valid (Todo/In‑Progress/Done)
- Calendar enforces start < end
- Event creation is one‑way; no hard coupling

---

## Bookmarks management and pin to speed dial

Narrative: A user organizes bookmarks and pins favorites for quick access on the dashboard.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant BM as Bookmarks
    participant DASH as Dashboard Management
    UI ->> BM: CreateFolder("Development")
    BM -->> UI: FolderCreated(FolderId)
    UI ->> BM: CreateBookmark(FolderId, Title, URL)
    BM -->> UI: BookmarkCreated(BookmarkId)
    UI ->> BM: PinBookmark(BookmarkId)
    BM -->> UI: BookmarkPinned
    BM -->> DASH: DomainEvent BookmarkPinned(UserId, BookmarkId)
    DASH -->> DASH: Refresh widget read model (if widget present)
```

Constraints:

- URL must be valid
- Folder hierarchy maintained
- Pinned set scoped to user

---

## Weather data refresh with ACL

Narrative: Weather context refreshes data from an external provider using an anti‑corruption layer and notifies widgets.

```mermaid
sequenceDiagram
    autonumber
    participant SCHED as Scheduler
    participant WEA as Weather (ACL)
    participant EXT as Weather Provider API
    participant PREF as Preferences
    participant DASH as Dashboard Management
    SCHED ->> WEA: RefreshWeatherData()
    WEA ->> PREF: GetPreferences(UserId: units)
    PREF -->> WEA: Preferences(units)
    WEA ->> EXT: FetchCurrentWeather(location, units)
    EXT -->> WEA: ProviderResponse(raw)
    WEA -->> WEA: Map via ACL to WeatherSnapshot
    WEA -->> DASH: DomainEvent WeatherDataRefreshed(UserId, Snapshot)
```

Policies:

- Cache with TTL and rate limiting
- Provider errors produce WeatherFetchFailed events

---

## Switch profile

Narrative: User switches between personalization profiles; dashboard restores saved layout and widget configurations.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant DASH as Dashboard Management
    participant PREF as Preferences
    participant WEA as Weather
    participant TASK as Tasks
    participant CAL as Calendar
    participant BM as Bookmarks
    UI ->> DASH: SwitchProfile(UserId, ProfileId)
    DASH -->> UI: ProfileSwitched
    DASH -->> PREF: Query preferences (theme/locale/timezone)
    PREF -->> DASH: Preferences
    DASH -->> WEA: DomainEvent ProfileSwitched (for data refresh if needed)
    DASH -->> TASK: DomainEvent ProfileSwitched
    DASH -->> CAL: DomainEvent ProfileSwitched
    DASH -->> BM: DomainEvent ProfileSwitched
```

Rules:

- Profile must exist for the user
- Restored layout must pass layout policy

---

## Offline first and synchronization

Narrative: User operates offline; when connectivity is restored, changes synchronize to the cloud and conflicts are
resolved.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant SYNC as Synchronization
    participant DASH as Dashboard
    participant TASK as Tasks
    participant CAL as Calendar
    participant BM as Bookmarks
    UI ->> SYNC: RecordChange(local op)
    Note over SYNC: Store in local DB with vector/ts
    SYNC -->> UI: OfflineAck
    Note over SYNC: Connectivity restored
    SYNC ->> DASH: PushChanges(dashboard ops)
    SYNC ->> TASK: PushChanges(task ops)
    SYNC ->> CAL: PushChanges(calendar ops)
    SYNC ->> BM: PushChanges(bookmark ops)

    alt Conflict detected
        SYNC -->> UI: SyncConflictDetected(details)
        UI ->> SYNC: ResolveConflict(choice)
        SYNC -->> All: DataSynchronized
    else No conflicts
        SYNC -->> All: DataSynchronized
    end
```

MVP strategy:

- Last‑write‑wins with timestamps
- Eventual consistency across contexts

---

## Delete dashboard and cleanup

Narrative: User deletes a dashboard; widget instances are removed while data in supporting contexts remains intact.

```mermaid
sequenceDiagram
    autonumber
    participant UI as UI
    participant DASH as Dashboard Management
    participant TASK as Tasks
    participant CAL as Calendar
    participant BM as Bookmarks
    participant WEA as Weather
    UI ->> DASH: DeleteDashboard(DashboardId)
    DASH -->> UI: DashboardDeleted
    DASH -->> TASK: DomainEvent WidgetRemovedFromDashboard (tasks widget)
    DASH -->> CAL: DomainEvent WidgetRemovedFromDashboard (calendar widget)
    DASH -->> BM: DomainEvent WidgetRemovedFromDashboard (bookmarks widget)
    DASH -->> WEA: DomainEvent WidgetRemovedFromDashboard (weather widget)
```

Principle:

- Dashboard removal does not delete domain data from supplier contexts
- Only composition/layout artifacts are removed
