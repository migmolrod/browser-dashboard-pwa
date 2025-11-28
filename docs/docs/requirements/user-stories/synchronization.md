---
sidebar_position: 7
---

# Synchronization

# FR-SYN-001: Local persistence

User stories FR-SYN-001-001/002/003/004/005/006

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Local persistence
  In order to enable offline-first features
  As a Developer
  I want to persist user data locally within the browser

  Scenario: Persist data locally on creation ("happy path")
    Given a user creates a new task "Buy groceries"
    When the TaskCreated event is published
    Then the Synchronization context intercepts the event
    And stores the task in local IndexedDB
    And creates sync metadata: \{ version: 1, lastSyncedAt: null, pendingOps: ["create"] }
    And the task is immediately available for offline access
    And local storage write completes successfully

  Scenario: Retrieve data from local storage
    Given a user has tasks stored locally
    And the device is offline
    When the user opens the tasks view
    Then tasks are retrieved from local IndexedDB
    And displayed without network call
    And the UI indicates offline mode

  Scenario: Local data persists across sessions
    Given a user has created tasks while offline
    When the user closes the browser
    And reopens the application later
    Then tasks are retrieved from local IndexedDB
    And all data is intact
    And sync metadata is preserved

  Scenario: Handle storage quota limits
    Given local storage is approaching quota limit (90% used)
    When the user creates new data
    Then the system detects near-quota condition
    And displays a warning "Local storage is almost full"
    And suggests clearing old data or syncing to cloud
    And the operation completes if space is available

  Scenario: Encrypt sensitive data in local storage
    Given a user's data contains sensitive information (e.g., calendar event details)
    When data is persisted to local storage
    Then sensitive fields are encrypted using Web Crypto API
    And encryption key is derived from user session
    And encrypted data is stored in IndexedDB
    And can be decrypted when retrieved

  Scenario: Query local data efficiently
    Given a user has 1000 tasks stored locally
    When the user searches for "groceries"
    Then IndexedDB index is used for efficient lookup
    And results are returned in < 100ms
    And no network call is made
```

# FR-SYN-002: Offline operation

User stories FR-SYN-002-001/002/003/004/005/006

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Offline operation
  In order to allow offline operation
  As a Developer
  I want to queue user actions locally and synchronize them when connection is restored

  Scenario: Create data offline ("happy path")
    Given the user's device is offline
    And the UI shows "Offline" indicator
    When the user creates a new task "Call dentist"
    Then the task is saved to local IndexedDB
    And sync metadata is created: \{ pendingOps: ["create"], syncStatus: "pending" }
    And the task appears in the task list immediately
    And a toast notification shows "Changes will sync when online"

  Scenario: Update data offline
    Given the user's device is offline
    And a task "Buy milk" exists locally
    When the user updates the task to "Buy milk and eggs"
    Then the update is saved to local IndexedDB
    And sync metadata is updated: \{ pendingOps: ["update"], syncStatus: "pending" }
    And the updated task displays immediately
    And the change is queued for sync

  Scenario: Delete data offline
    Given the user's device is offline
    And a task "Old task" exists locally
    When the user deletes the task
    Then the task is marked as deleted in local IndexedDB
    And sync metadata is updated: \{ pendingOps: ["delete"], syncStatus: "pending" }
    And the task is removed from the UI
    And the deletion is queued for sync

  Scenario: View offline indicator
    Given the user's device loses internet connection
    When the network status changes to offline
    Then an "Offline" badge appears in the UI header
    And a toast notification shows "You're offline. Changes will sync automatically"
    And all UI interactions remain functional

  Scenario: Multiple offline operations
    Given the user's device is offline
    When the user creates 3 tasks
    And updates 2 existing tasks
    And deletes 1 task
    Then all 6 operations are queued locally
    And each has sync metadata with operation type and timestamp
    And all changes are visible in the UI
    And operations are ordered by timestamp for sync

  Scenario: Offline operations persist across sessions
    Given the user made changes while offline
    And queued operations exist
    When the user closes the browser
    And reopens the application (still offline)
    Then queued operations are loaded from IndexedDB
    And the UI shows pending sync count
    And operations remain queued until online
```

# FR-SYN-003: Background synchronization

User stories FR-SYN-003-001/002/003/004/005/006

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Background synchronization
  In order to allow user interactions when synchronization occurs
  As a Developer
  I want to synchronize local changes to the cloud in a non-blocking background process

  Scenario: Auto-sync on network reconnection ("happy path")
    Given the user made changes while offline
    And 5 operations are queued
    When the device reconnects to the internet
    Then the sync process automatically triggers
    And operations are sent to server in order
    And server responds with success for all operations
    And local sync state is updated: \{ lastSyncedAt: now, pendingOps: [] }
    And a DataSynchronized event is published
    And a toast notification shows "Synced 5 changes"

  Scenario: Periodic background sync
    Given the user is online
    And has made recent changes
    When 5 minutes have elapsed since last sync
    Then the sync process automatically triggers in background
    And pending operations are sent to server
    And sync completes without user awareness
    And DataSynchronized event is published

  Scenario: Manual sync trigger
    Given the user has pending changes
    When the user clicks "Sync Now" button
    Then sync process immediately triggers
    And a progress indicator is displayed
    And pending operations are sent to server
    And progress updates as operations complete
    And "Sync complete" message is shown when done

  Scenario: View sync progress
    Given sync is in progress
    And 10 operations are being synced
    When the user views the UI
    Then a progress indicator shows "Syncing... 3 of 10"
    And updates in real-time as operations complete
    And shows "Synced" when all operations complete

  Scenario: Sync pulls server changes
    Given the user has synced local changes
    And server has changes from another device
    When sync completes
    Then server changes are fetched
    And merged into local IndexedDB
    And UI updates with new data
    And DataSynchronized event is published

  Scenario: Partial sync success
    Given 5 operations are queued for sync
    When sync is triggered
    And 3 operations succeed
    And 2 operations fail (network error)
    Then successful operations are marked as synced
    And failed operations remain in queue
    And a partial success message is shown: "Synced 3 of 5 changes"
    And failed operations are retried later
```

# FR-SYN-004: Conflict detection

User stories FR-SYN-004-001/002/003/004/005

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Conflict detection
  In order to avoid data corruption
  As a Developer
  I want to detect conflicts when client and server changes affect the same entity

  Scenario: Detect conflict during sync ("happy path")
    Given a user modified task "Buy milk" locally (version 2)
    And the same task was modified on server from another device (version 3)
    When sync is triggered
    Then the system compares local version (2) with server version (3)
    And detects a conflict (versions differ)
    And logs conflict: \{ taskId, localVersion: 2, serverVersion: 3, timestamp }
    And publishes SyncConflictDetected event
    And queues the conflict for resolution

  Scenario: No conflict detected
    Given a user modified task "Buy milk" locally (version 2)
    And the server has the same version (2)
    When sync is triggered
    Then the system compares versions
    And no conflict is detected
    And local changes are sent to server
    And sync completes successfully

  Scenario: Log conflict details
    Given a conflict is detected
    When the conflict is logged
    Then the log includes:
      | Entity ID |
      | Entity type |
      | Local version |
      | Server version |
      | Local changes |
      | Server changes |
      | Timestamp |
      | User ID |
    And the log is stored for debugging

  Scenario: Notify user of conflict
    Given a conflict is detected
    When SyncConflictDetected event is published
    Then a UI notification is displayed "Sync conflict detected for task 'Buy milk'"
    And provides options: "Keep local", "Keep server", "Merge" (if available)
    And the notification is non-blocking

  Scenario: Multiple conflicts
    Given sync detects conflicts for 3 entities
    When conflicts are processed
    Then 3 SyncConflictDetected events are published
    And all conflicts are logged
    And a summary notification shows: "3 sync conflicts detected"
    And each conflict is queued for resolution
```

# FR-SYN-005: Conflict resolution

User stories FR-SYN-005-001/002/003/004/005

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Conflict resolution
  In order to avoid data corruption
  As a User
  I want to solve detected conflicts

  Scenario: Resolve conflict with last-write-wins ("happy path")
    Given a conflict exists for task "Buy milk"
    And local version has timestamp "2025-11-15T10:00:00Z"
    And server version has timestamp "2025-11-15T10:05:00Z" (later)
    When conflict resolution is triggered
    Then timestamps are compared
    And server version is kept (later timestamp)
    And local version is replaced with server version
    And sync state is updated: \{ conflictResolved: true, resolvedAt: now }
    And a notification shows "Conflict resolved: server version kept"

  Scenario: Resolve conflict—local wins
    Given a conflict exists for task "Call dentist"
    And local version has timestamp "2025-11-15T10:10:00Z"
    And server version has timestamp "2025-11-15T10:05:00Z" (earlier)
    When conflict resolution is triggered
    Then local version is kept (later timestamp)
    And local version is sent to server (overwriting server)
    And sync state is updated
    And a notification shows "Conflict resolved: local version kept"

  Scenario: Notify user of resolution
    Given a conflict is resolved
    When resolution completes
    Then a notification appears: "Conflict resolved for task 'Buy milk': server version was more recent"
    And the notification is informational (non-blocking)
    And dismissed after 5 seconds

  Scenario: Log losing entity
    Given a conflict is resolved in favor of server version
    And local version is discarded
    When resolution completes
    Then the losing local version is logged: \{ entityId, version, data, discardedAt, reason: "conflict resolution" }
    And the log is stored for potential recovery
    And the log is retained for 30 days

  Scenario: Multiple conflict resolutions
    Given 3 conflicts exist
    When conflict resolution is triggered for all
    Then each conflict is resolved independently
    And 2 are resolved in favor of server
    And 1 is resolved in favor of local
    And a summary notification shows: "3 conflicts resolved"
    And all resolutions are logged
```

# FR-SYN-006: Sync status tracking

User stories FR-SYN-006-001/002/003/004/005/006

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Sync status tracking
  In order to help users understand the status of their data
  As a Developer
  I want to provide visual information about synchronization status

  Scenario: View pending operations count ("happy path")
    Given a user has made 5 changes while offline
    When the user views the UI
    Then a badge shows "5 pending" in the sync indicator
    And hovering shows tooltip: "5 changes waiting to sync"

  Scenario: View last sync time
    Given sync completed 10 minutes ago
    When the user views the sync status
    Then the UI shows "Last synced: 10 minutes ago"
    And the timestamp updates every minute
    And clicking shows detailed timestamp

  Scenario: View sync progress
    Given sync is in progress
    And 7 of 10 operations are complete
    When the user views the UI
    Then a progress bar shows 70% complete
    And text shows "Syncing... 7 of 10"
    And the progress updates in real-time

  Scenario: View sync errors
    Given sync failed for 2 operations
    When the user views the sync status
    Then the UI shows a warning badge: "2 errors"
    And clicking shows error details
    And provides "Retry" option

  Scenario: Query detailed sync status
    Given a user wants detailed sync information
    When the user navigates to Settings > Sync Status
    Then the detailed sync status page shows:
      | Pending operations: 3       |
      | Last sync: 2025-11-15 14:30 |
      | Errors: 1                   |
      | Synced entities: 247        |
      | Per-entity status list      |
    And the page updates in real-time

  Scenario: Real-time status updates
    Given the sync status page is open
    When sync is triggered and operations complete
    Then the status updates in real-time:
      | Pending count decreases     |
      | Progress bar updates        |
      | Last sync timestamp updates |
    And no page refresh is needed
```

# FR-SYN-007: Retry and error handling

User stories FR-SYN-007-001/002/003/004/005/006

```gherkin
@sync
#noinspection CucumberUndefinedStep
Feature: Retry and error handling
  In order to monitor and track synchronization errors
  As a Developer
  I want to log error details for debugging and monitoring

  Scenario: Auto-retry failed operation ("happy path")
    Given a sync operation fails due to network timeout
    When the error is detected
    Then the operation is logged as failed
    And queued for retry with backoff: 1s
    And after 1 second, retry is attempted
    And if it fails again, backoff doubles to 2s
    And retry continues up to 5 attempts
    And if it succeeds, operation is marked as synced

  Scenario: Exponential backoff
    Given a sync operation fails
    When retries are scheduled
    Then backoff intervals are: 1s, 2s, 4s, 8s, 16s, 60s (capped)
    And retry attempts stop after 5 failures
    And backoff timing is logged for debugging

  Scenario: Manual retry
    Given a sync operation has failed 5 times
    And is marked as permanently failed
    When the user views the error notification
    And clicks "Retry Now"
    Then the operation is immediately retried
    And retry counter is reset
    And success/failure is reported to user

  Scenario: Persistent failure notification
    Given a sync operation has failed 5 times
    And maximum retries are exhausted
    When the final retry fails
    Then a SyncFailed event is published
    And a notification appears: "Unable to sync. Please check your connection and try again."
    And provides "Retry" and "View Details" options
    And the operation remains queued

  Scenario: Different error types
    Given sync operations fail with different errors
    When errors are handled:
      | Network error → retry with backoff                |
      | Server 500 error → retry with backoff             |
      | Server 400 error → log and notify user (no retry) |
      | Conflict → trigger conflict resolution            |
      | Timeout → retry with longer timeout               |
    Then each error type has appropriate handling

  Scenario: Error logging
    Given a sync operation fails
    When the error is logged
    Then the log includes:
      | Error type                  |
      | Error message               |
      | Stack trace (if applicable) |
      | Entity ID                   |
      | Retry attempt number        |
      | Timestamp                   |
      | User ID                     |
    And logs are available for debugging
```
