---
sidebar_position: 3
---

# Tasks

These user stores (Features and Scenarios) directly map with Tasks functional requirements. For more information,
check [this documentation](../functional/tasks).

## FR-TSK-001: Task management

User stories FR-TSK-001-001/002/003/004/005/006/007

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task management
  In order to manage my lists of tasks
  As a User
  I want to create, edit and delete tasks

  Scenario: Create a new task ("happy path")
    Given a user is viewing their task list
    When the user clicks "Add Task"
    And enters the title "Buy groceries"
    And confirms creation
    Then a new task is created with title "Buy groceries"
    And the task has default status "Todo"
    And the task has default priority "Medium"
    And a TaskCreated event is published
    And the task appears in the task list

  Scenario: Create a task with the title exceeding maximum length
    Given a user is creating a task
    When the user enters a title longer than 200 characters
    And attempts to save
    Then validation fails
    And an error message indicates the title is too long
    And the task is not created
    And no TaskCreated event is published

  Scenario: Edit task
    Given a user has a task with title "Old Title"
    When the user selects "Edit" on the task
    And changes the title to "New Title"
    And adds description "Important details"
    And confirms the changes
    Then the task is updated with new values
    And a TaskUpdated event is published
    And the task displays the new title and description

  Scenario: Delete task
    Given a user has a task in their list
    When the user selects "Delete" on the task
    Then a confirmation dialog appears
    And upon confirmation, the task is deleted
    And a TaskDeleted event is published
    And the task is removed from the list

  Scenario: Cancel task deletion
    Given a user initiates task deletion
    When the confirmation dialog is displayed
    And the user clicks "Cancel"
    Then the task is not deleted
    And no TaskDeleted event is published
    And the task remains in the list

  Scenario: Create a task without a title
    Given a user is creating a task
    When the user leaves the title field empty
    And attempts to save
    Then validation fails
    And an error message indicates the title is required
    And the task is not created
    And no TaskCreated event is published

  Scenario: Initialize default task list on user registration
    Given a new user has just registered
    When the system processes the UserRegistered event
    Then a default task list is automatically created for the user
    And the list is named "My Tasks" or similar
    And the user's task management is initialized
```

## FR-TSK-002: Task status lifecycle

User stories FR-TSK-002-001/002/003/004/005

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Tasks status lifecycle
  In order to keep track of what tasks are done
  As a User
  I want to change the status of my tasks

  Scenario: Change task status to "In Progress" ("happy path")
    Given a user has a task with status "Todo"
    When the user clicks on the task status
    And selects "In Progress"
    Then the task status is updated to "In Progress"
    And a TaskStatusChanged event is published
    And the task displays with "In Progress" indicator

  Scenario: Mark a task as "Done"
    Given a user has a task with status "In Progress"
    When the user changes the status to "Done"
    Then the task status is updated to "Done"
    And a TaskStatusChanged event is published
    And a TaskCompleted event is published
    And the completion timestamp is recorded
    And the task displays with strike-through or completion indicator

  Scenario: Quick complete via checkbox
    Given a user has a task with status "Todo"
    When the user clicks the checkbox next to the task
    Then the task status immediately changes to "Done"
    And a TaskStatusChanged event is published
    And a TaskCompleted event is published
    And the task is visually marked as completed

  Scenario: Revert completed task
    Given a user has a task with status "Done"
    When the user changes the status back to "Todo"
    Then the task status is updated to "Todo"
    And a TaskStatusChanged event is published
    And the completion timestamp is cleared
    And the task displays without completion indicator

  Scenario: Status persists across sessions
    Given a user has changed a task status to "In Progress"
    When the user logs out and logs back in
    Then the task still shows status "In Progress"
    And the status change is persisted
```

## FR-TSK-003: Task priority management

User stories FR-TSK-003-001/002/003/004/005

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task priority management
  In order to know what tasks I should focus on next
  As a User
  I want to assign priorities to my tasks

  Scenario: Change task priority ("happy path")
    Given a user has a task with priority "Medium"
    When the user clicks on the priority indicator
    And selects "High"
    Then the task priority is updated to "High"
    And a TaskPriorityChanged event is published
    And the task displays with high-priority indicator

  Scenario: Create a task with the default priority
    Given a user is creating a new task
    When the user does not specify a priority
    And saves the task
    Then the task is created with priority "Medium"
    And a TaskCreated event is published

  Scenario: Sort tasks by priority
    Given a user has tasks with mixed priorities
    When the user selects "Sort by Priority"
    Then tasks are displayed in order: High, Medium, Low
    And within each priority, tasks maintain their original order

  Scenario: Visual priority indicators
    Given a user has tasks with different priorities
    When the user views the task list
    Then high-priority tasks display in red or with "!" icon
    And medium-priority tasks display in yellow or with neutral icon
    And low-priority tasks display in gray or with "↓" icon

  Scenario: Priority persists across sessions
    Given a user has set a task priority to "High"
    When the user logs out and logs back in
    Then the task still shows priority "High"
    And the priority change is persisted
```

## FR-TSK-004: Due date management

User stories FR-TSK-004-001/002/003/004/005/006

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Due date management
  In order to organize my time
  As a User
  I want to set and modify due dates for tasks

  Scenario: Set a due date for a task ("happy path")
    Given a user has a task without a due date
    When the user clicks "Set Due Date"
    And selects tomorrow's date from the date picker
    And confirms
    Then the due date is set to tomorrow
    And a TaskUpdated event is published
    And the task displays the due date

  Scenario: Visual indicator for overdue task
    Given a user has a task with due date in the past
    When the user views the task list
    Then the task is highlighted in red
    And displays "Overdue" label
    And shows the number of days overdue

  Scenario: Visual indicator for task due today
    Given a user has a task due today
    When the user views the task list
    Then the task is highlighted in orange
    And displays "Due Today" label

  Scenario: Clear due date
    Given a user has a task with a due date set
    When the user clicks "Clear Due Date"
    And confirms
    Then the due date is removed from the task
    And a TaskUpdated event is published
    And the task no longer displays a due date

  Scenario: Sort tasks by due date
    Given a user has tasks with various due dates
    When the user selects "Sort by Due Date"
    Then tasks are displayed in chronological order
    And overdue tasks appear first
    And tasks without due dates appear last

  Scenario: Filter overdue tasks
    Given a user has tasks with various due dates
    When the user selects "Show Overdue Tasks"
    Then only tasks with due dates in the past are displayed
    And the count of overdue tasks is shown
```

## FR-TSK-005: Task lists/sections

User stories FR-TSK-005-001/002/003/004/005/006

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task lists/sections
  In order to organize my tasks
  As a User
  I want to group tasks in lists

  Scenario: Create a new task list ("happy path")
    Given a user is viewing their tasks
    When the user clicks "New List"
    And enters the name "Work"
    And confirms creation
    Then a new list named "Work" is created
    And a TaskListCreated event is published
    And the list appears in the list selector

  Scenario: Create a list with a duplicate name
    Given a user already has a list named "Personal"
    When the user attempts to create another list named "Personal"
    Then validation fails
    And an error message indicates the name already exists
    And the list is not created
    And no TaskListCreated event is published

  Scenario: Move a task to a different list
    Given a user has a task in "Personal" list
    When the user selects "Move to List"
    And chooses "Work" list
    Then the task is moved to "Work" list
    And a TaskUpdated event is published
    And the task appears in "Work" list
    And is removed from "Personal" list

  Scenario: Delete an empty list
    Given a user has an empty list named "Old"
    When the user selects "Delete List"
    Then a confirmation dialog appears
    And upon confirmation, the list is deleted
    And a TaskListDeleted event is published
    And the list is removed from the list selector

  Scenario: Delete a list with tasks
    Given a user has a list "Archive" with 5 tasks
    When the user attempts to delete the list
    Then a dialog appears asking what to do with the tasks
    And offers options: "Move to Default" or "Delete Tasks"
    And upon selecting "Move to Default" and confirming
    Then all tasks are moved to the default list
    And the "Archive" list is deleted
    And a TaskListDeleted event is published

  Scenario: Filter tasks by list
    Given a user has tasks in multiple lists
    When the user selects "Work" list from the list selector
    Then only tasks in "Work" list are displayed
    And the list name is highlighted as active
    And task count for "Work" is shown
```

## FR-TSK-006: Task reordering

User stories FR-TSK-006-001/002/003/004

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task reordering
  In order to visually prioritize tasks
  As a User
  I want to reorder them manually, independently of status, priority, or due date

  Scenario: Reorder tasks via drag-and-drop ("happy path")
    Given a list contains tasks in order: A, B, C, D
    When the user drags task D to the position between A and B
    Then task D is visually lifted and follows the cursor
    And drop zones between tasks are highlighted
    And when dropped, the order becomes: A, D, B, C
    And a TaskUpdated event is published
    And the new order is persisted

  Scenario: Move a task to the first position
    Given a list contains tasks in order: A, B, C
    When the user drags task C to the first position
    Then the order becomes: C, A, B
    And a TaskUpdated event is published
    And the change is persisted

  Scenario: Cancel reorder operation
    Given a user starts dragging a task
    When the user presses the ESC key before dropping
    Then the drag operation is cancelled
    And the task returns to its original position
    And no TaskUpdated event is published

  Scenario: Reorder persists across sort operations
    Given a user has manually reordered tasks
    When the user applies a temporary sort (e.g., by due date)
    And then clears the sort
    Then the manual order is restored
    And tasks appear in the user-defined order
```

## FR-TSK-007: Task search and filtering

User stories FR-TSK-007-001/002/003/004/005/006

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task search and filtering
  In order to quickly find specific tasks
  As a User
  I want to search by matching text and filter them by status, priority, due date range, and list

  Scenario: Search tasks by title ("happy path")
    Given a user has tasks with various titles
    When the user enters "grocery" in the search field
    Then all tasks with "grocery" in the title or description are displayed
    And the matching text "grocery" is highlighted
    And the result count is shown

  Scenario: Filter tasks by status
    Given a user has tasks with mixed statuses
    When the user selects "In Progress" from the status filter
    Then only tasks with status "In Progress" are displayed
    And the filter indicator shows "Status: In Progress"
    And the result count is updated

  Scenario: Combine multiple filters
    Given a user has tasks with various attributes
    When the user filters by status "Todo"
    And filters by priority "High"
    And filters by due date "This Week"
    Then only tasks matching all three criteria are displayed
    And all filter indicators are shown
    And the result count reflects the combined filters

  Scenario: No search results
    Given a user enters a search query
    When no tasks match the query
    Then a "No results found" message is displayed
    And the search field remains active
    And the user can modify the query

  Scenario: Clear all filters
    Given a user has multiple filters applied
    When the user clicks "Clear All Filters"
    Then all filters are removed
    And all tasks in the current list are displayed
    And the search field is cleared

  Scenario: Filter overdue tasks
    Given a user has tasks with various due dates
    When the user selects "Overdue" from the quick filters
    Then only tasks with due dates in the past are displayed
    And the overdue count is shown
    And tasks are sorted by how many days overdue
```

## FR-TSK-008: Calendar integration

User stories FR-TSK-008-001/002/003/004

```gherkin
@tasks @calendar
#noinspection CucumberUndefinedStep
Feature: Calendar integration
  In order to have tasks in my calendar
  As a User
  I want to create calendar events from my tasks

  Scenario: Create an event from a task with a due date ("happy path")
    Given a user has a task titled "Meeting Preparation"
    And the task has due date "2025-11-20 14:00"
    When the user selects "Create Event from Task"
    Then an EventCreationRequestedFromTask event is published
    And the event data includes title "Meeting Preparation"
    And the event date is set to "2025-11-20 14:00"
    And the Calendar context creates the event
    And a notification confirms "Event created"
    And the task remains in the task list

  Scenario: Create an event from a task without a due date
    Given a user has a task titled "Review Documents"
    And the task has no due date
    When the user selects "Create Event from Task"
    Then a date/time picker dialog appears
    And the user selects "2025-11-21 10:00"
    And confirms
    Then an EventCreationRequestedFromTask event is published
    And the event is created for the selected date/time

  Scenario: Event creation fails
    Given a user attempts to create an event from a task
    When the Calendar context is unavailable
    Then an error message is displayed
    And the user is notified to try again later
    And no EventCreationRequestedFromTask event is published successfully

  Scenario: Create an event with a description
    Given a user has a task with title and description
    When the user creates an event from the task
    Then the task description is mapped to event description
    And both title and description appear in the created event
```

## FR-TSK-009: Task completion tracking

User stories FR-TSK-009-001/002/003/004/005/006

```gherkin
@tasks
#noinspection CucumberUndefinedStep
Feature: Task completion tracking
  In order to measure my progress
  As a User
  I want to keep track of task completion and view them

  Scenario: Mark a task as completed ("happy path")
    Given a user has a task with status "In Progress"
    When the user marks the task as "Done"
    Then the task is marked as completed
    And completion timestamp is recorded
    And a TaskCompleted event is published
    And the task displays with strike-through
    And a checkmark icon appears

  Scenario: View completion statistics
    Given a user has 10 tasks in a list
    And 5 tasks are completed
    When the user views the list
    Then the completion statistics show "5 of 10 completed (50%)"
    And a progress bar shows 50% completion

  Scenario: Hide completed tasks
    Given a user has both completed and incomplete tasks
    When the user toggles "Hide Completed"
    Then completed tasks are hidden from view
    And only incomplete tasks are displayed
    And the toggle state is saved

  Scenario: Show completed tasks
    Given a user has hidden completed tasks
    When the user toggles "Show Completed"
    Then completed tasks reappear in the list
    And are visually distinct with strike-through
    And appear after incomplete tasks (or in order)

  Scenario: Revert a completed task to incomplete
    Given a user has a completed task
    When the user changes the status from "Done" to "Todo"
    Then the task is marked as incomplete
    And completion timestamp is cleared
    And a TaskStatusChanged event is published
    And the strike-through is removed
    And the checkmark icon is removed

  Scenario: Completion timestamp persists
    Given a user has completed a task
    When the user views the task details
    Then the completion timestamp is displayed
    And shows when the task was completed
```
