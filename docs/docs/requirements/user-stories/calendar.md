---
sidebar_position: 4
---

# Calendar

These user stores (Features and Scenarios) directly map with Calendar functional requirements. For more information,
check [this documentation](../functional/tasks).

## FR-CAL-001 Event management

User stories FR-CAL-001-001/002/003/004/005/006/007

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Event management
  In order to manage events
  As a User
  I want to add, edit and remove events from my calendar

  Scenario: Create a new event ("happy path")
    Given a user is viewing their calendar
    When the user clicks "New Event"
    And enters title "Team Meeting"
    And sets start time to "2025-11-20 10:00"
    And sets end time to "2025-11-20 11:00"
    And confirms creation
    Then a new event is created with title "Team Meeting"
    And the event spans from 10:00 to 11:00
    And an EventCreated event is published
    And the event appears in the calendar view

  Scenario: Create an event with an invalid time range
    Given a user is creating an event
    When the user sets start time to "2025-11-20 10:00"
    And sets end time to "2025-11-20 09:00" (before start time)
    And attempts to save
    Then validation fails
    And an error message indicates end time must be after start time
    And the event is not created
    And no EventCreated event is published

  Scenario: Edit event
    Given a user has an event titled "Meeting"
    When the user selects "Edit" on the event
    And changes the title to "Team Sync"
    And changes end time from 11:00 to 11:30
    And adds description "Discuss quarterly goals"
    And confirms the changes
    Then the event is updated with new values
    And an EventUpdated event is published
    And the event displays with updated information

  Scenario: Delete event
    Given a user has an event in their calendar
    When the user selects "Delete" on the event
    Then a confirmation dialog appears
    And upon confirmation, the event is deleted
    And an EventDeleted event is published
    And the event is removed from all calendar views

  Scenario: Cancel event deletion
    Given a user initiates event deletion
    When the confirmation dialog is displayed
    And the user clicks "Cancel"
    Then the event is not deleted
    And no EventDeleted event is published
    And the event remains in the calendar

  Scenario: Create an event without a title
    Given a user is creating an event
    When the user leaves the title field empty
    And attempts to save
    Then validation fails
    And an error message indicates the title is required
    And the event is not created
    And no EventCreated event is published

  Scenario: Initialize default calendar on user registration
    Given a new user has just registered
    When the system processes the UserRegistered event
    Then a default calendar is automatically created for the user
    And the calendar is named "My Calendar" or similar
    And the user's calendar management is initialized
```

## FR-CAL-002 Calendar views

User stories FR-CAL-002-001/002/003/004/005/006/007/008

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Calendar views
  In order to better navigate my schedule
  As a User
  I want to change the calendar view in different modes, like day, week, and month

  Scenario: View calendar in month view ("happy path")
    Given a user is viewing their calendar
    When the user selects "Month View"
    Then the calendar displays a month grid
    And the current date is highlighted
    And events appear as indicators on their respective dates
    And navigation controls show "Previous Month" and "Next Month"

  Scenario: View calendar in week view
    Given a user is viewing their calendar
    When the user selects "Week View"
    Then the calendar displays 7 days (Monday-Sunday or Sunday-Saturday)
    And hourly time slots are shown for each day
    And events are positioned at their corresponding times
    And the current day is highlighted
    And navigation controls show "Previous Week" and "Next Week"

  Scenario: View the calendar in the day view
    Given a user is viewing their calendar
    When the user selects "Day View"
    Then the calendar displays a single day
    And hourly time slots (e.g., 00:00-23:59) are shown
    And events are positioned at their exact times
    And current time indicator is shown
    And navigation controls show "Previous Day" and "Next Day"

  Scenario: View the calendar in the agenda view
    Given a user is viewing their calendar
    When the user selects "Agenda View"
    Then the calendar displays events in chronological list
    And events are grouped by date
    And each event shows title, time, and location
    And the next 30 days of events are shown by default
    And user can scroll to view more future events

  Scenario: Navigate to next month
    Given a user is viewing month view for November 2025
    When the user clicks "Next Month"
    Then the calendar displays December 2025
    And events for December are shown
    And the view remains in month mode

  Scenario: Jump today
    Given a user is viewing a date in the past or future
    When the user clicks "Today" button
    Then the calendar navigates to the current date
    And the current date is highlighted
    And the view type remains unchanged

  Scenario: Click event to view details
    Given a user is viewing month view with events
    When the user clicks on an event
    Then a popup or side panel displays full event details
    And shows title, time, description, location
    And provides "Edit" and "Delete" options

  Scenario: View preference persists
    Given a user has selected "Week View"
    When the user logs out and logs back in
    Then the calendar opens in "Week View"
    And the view preference is restored
```

## FR-CAL-003 Recurring events

User stories FR-CAL-003-001/002/003/004/005/006/007

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Recurring events
  In order to schedule repetitive meetings, activities, or other kind of events
  As a User
  I want to create recurring events with different patterns (daily, weekly, monthly, yearly, custom)

  Scenario: Create a weekly recurring event ("happy path")
    Given a user is creating an event
    When the user enters title "Team Standup"
    And sets start time to "2025-11-20 09:00"
    And sets end time to "2025-11-20 09:30"
    And selects "Repeat: Weekly"
    And sets end condition to "After 12 occurrences"
    And confirms creation
    Then a recurring event is created
    And 12 instances appear in the calendar
    And a RecurrencePatternCreated event is published

  Scenario: Create a monthly recurring event
    Given a user is creating an event
    When the user sets recurrence to "Monthly"
    And chooses "On day 15 of each month"
    And sets end date to "2026-11-15"
    Then the event recurs on the 15th of each month
    And instances are generated until the end date

  Scenario: Edit a single instance of a recurring event
    Given a user has a weekly recurring event
    When the user edits one specific instance
    And changes the time from 09:00 to 10:00
    And confirms "Edit this event only"
    Then only that instance is updated
    And an exception is created in the recurrence pattern
    And other instances remain unchanged
    And an EventInstanceUpdated event is published

  Scenario: Edit the entire recurring series
    Given a user has a weekly recurring event
    When the user edits an instance
    And changes the title from "Meeting" to "Sync"
    And confirms "Edit all events in series"
    Then all instances are updated with new title
    And the recurrence pattern is updated
    And a RecurrencePatternUpdated event is published

  Scenario: Delete single instance
    Given a user has a daily recurring event
    When the user deletes one specific instance
    And confirms "Delete this event only"
    Then only that instance is deleted
    And an exception is added to the recurrence pattern
    And other instances remain
    And an EventInstanceDeleted event is published

  Scenario: Delete entire recurring series
    Given a user has a recurring event with 20 instances
    When the user deletes one instance
    And confirms "Delete all events in series"
    Then all instances are deleted
    And the recurrence pattern is removed
    And a RecurrencePatternDeleted event is published

  Scenario: Create a recurring event with a custom pattern
    Given a user is creating an event
    When the user selects "Custom" recurrence
    And sets "Every 2 weeks on Monday and Wednesday"
    And sets end condition to "Until 2025-12-31"
    Then instances are generated following the custom pattern
    And appear on Mondays and Wednesdays every 2 weeks until year end
```

## FR-CAL-004 Event reminders

User stories FR-CAL-004-001/002/003/004/005/006/007

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Event reminders
  In order to not miss important events and stay on schedule
  As a User
  I want to set reminders for my events

  Scenario: Set a reminder for an event ("happy path")
    Given a user has created an event for tomorrow at 14:00
    When the user opens event settings
    And selects "Add Reminder"
    And chooses "1 hour before"
    And saves
    Then a reminder is set for tomorrow at 13:00
    And a ReminderSet event is published
    And the reminder is displayed in event details

  Scenario: Receive reminder notification
    Given a user has an event with a reminder set for 1 hour before
    When the reminder time is reached
    Then a browser notification appears
    And displays event title "Team Meeting"
    And displays start time "Starting in 1 hour at 14:00"
    And a ReminderTriggered event is published

  Scenario: Click notification to view the event
    Given a reminder notification has appeared
    When the user clicks on the notification
    Then the calendar application opens
    And the event details are displayed
    And the reminder is marked as acknowledged

  Scenario: Snooze reminder
    Given a reminder notification has appeared
    When the user clicks "Snooze"
    Then the notification is dismissed
    And will reappear in 5 minutes
    And a ReminderSnoozed event is published

  Scenario: Dismiss reminder
    Given a reminder notification has appeared
    When the user clicks "Dismiss"
    Then the notification is closed
    And will not appear again for this event
    And a ReminderDismissed event is published

  Scenario: Add multiple reminders
    Given a user has an event
    When the user adds reminder "1 day before"
    And adds reminder "1 hour before"
    And adds reminder "15 minutes before"
    Then all three reminders are set
    And will trigger at their respective times
    And all are displayed in event details

  Scenario: Request notification permission
    Given a user attempts to set a reminder
    And browser notifications are not permitted
    When the reminder is being saved
    Then a permission request dialog appears
    And if user grants permission, the reminder is set
    And if user denies permission, an error message is shown
```

## FR-CAL-005 Event categories

User stories FR-CAL-005-001/002/003/004/005/006

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Event categories
  In order to visually distinguish between different types of events
  As a User
  I want to assign categories to my events

  Scenario: Create a new category ("happy path")
    Given a user is viewing category settings
    When the user clicks "New Category"
    And enters name "Family"
    And selects color "Green"
    And confirms creation
    Then a new category "Family" is created
    And a CategoryCreated event is published
    And the category appears in the category list

  Scenario: Create a category with a duplicate name
    Given a user already has a category named "Work"
    When the user attempts to create another category named "Work"
    Then validation fails
    And an error message indicates the name already exists
    And the category is not created
    And no CategoryCreated event is published

  Scenario: Assign a category to an event
    Given a user has created an event
    When the user opens event settings
    And selects category "Work"
    And saves
    Then the event is assigned to "Work" category
    And the event displays with "Work" color in calendar views
    And an EventUpdated event is published

  Scenario: Filter events by category
    Given a user has events in multiple categories
    When the user selects "Show only Work events"
    Then only events in "Work" category are displayed
    And other events are hidden
    And the filter state is indicated in the UI

  Scenario: Delete category with associated events
    Given a user has category "Old" with 3 associated events
    When the user attempts to delete the category
    Then a dialog appears asking what to do with the events
    And offers options: "Remove category from events" or "Cancel"
    And upon selecting "Remove category" and confirming
    Then category is removed from all events
    And the category is deleted
    And a CategoryDeleted event is published

  Scenario: Edit category color
    Given a user has category "Personal" with color "Blue"
    When the user edits the category
    And changes color to "Purple"
    And saves
    Then the category color is updated
    And all events in this category now display with "Purple"
    And a CategoryUpdated event is published
```

## FR-CAL-006 Event time conflict detection

User stories FR-CAL-006-001/002/003/004/005/006

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Event time conflict detection
  In order to avoid double-booking and scheduling overlaps
  As a User
  I want to be warned about time conflicts when creating or editing events

  Scenario: Detect conflict when creating an event ("happy path")
    Given a user has an event "Meeting A" from 10:00 to 11:00
    When the user creates event "Meeting B" from 10:30 to 11:30
    Then a conflict warning appears
    And displays "Conflicts with: Meeting A (10:00-11:00)"
    And offers options: "Adjust Time" or "Save Anyway"

  Scenario: No conflict detected
    Given a user has an event from 10:00 to 11:00
    When the user creates event from 11:00 to 12:00
    Then no conflict is detected
    And the event is saved without warning

  Scenario: Override conflict warning
    Given a conflict warning is displayed
    When the user clicks "Save Anyway"
    Then the event is saved despite the conflict
    And both events remain in the calendar
    And a visual indicator shows the conflict in calendar views

  Scenario: Adjust time to resolve conflict
    Given a conflict warning is displayed
    When the user clicks "Adjust Time"
    Then the event editing dialog remains open
    And the user can modify start/end times
    And conflict detection re-runs on changes
    And the event is saved when no conflicts remain

  Scenario: Detect multiple conflicts
    Given a user has events at 10:00-11:00 and 10:30-11:30
    When the user creates event from 09:45 to 11:15
    Then conflicts with both events are detected
    And warning displays both conflicting events
    And shows time ranges for each conflict

  Scenario: Visual conflict indicator in calendar
    Given a user has overlapping events
    When the user views the calendar
    Then conflicting events are highlighted with warning color
    And a conflict icon is displayed
    And tooltip shows "Time conflict with X events"
```

## FR-CAL-007 Task integration

User stories FR-CAL-007-001/002/003/004/005

```gherkin
@calendar @tasks
#noinspection CucumberUndefinedStep
Feature: Task integration
  In order to have a clean workflow between task planning and calendar scheduling
  As a User
  I want to create calendar events from my tasks

  Scenario: Create an event from a task with a due date ("happy path")
    Given the Tasks context publishes EventCreationRequestedFromTask event
    And the event data includes title "Review Document"
    And due date "2025-11-21 14:00"
    When the Calendar context processes the event
    Then a calendar event is created with title "Review Document"
    And start time is set to "2025-11-21 14:00"
    And end time is set to "2025-11-21 15:00" (default 1 hour duration)
    And an EventCreated event is published
    And the event appears in calendar views

  Scenario: Create an event from a task without a due date
    Given the Tasks context publishes EventCreationRequestedFromTask event
    And the event data includes title "Plan Vacation"
    But no due date is specified
    When the Calendar context processes the event
    Then the user is prompted to select date and time
    And after selection, the event is created
    And an EventCreated event is published

  Scenario: Event creation failure
    Given the Tasks context publishes EventCreationRequestedFromTask event
    When the Calendar context encounters an error (e.g., database failure)
    Then the event creation fails
    And an error is logged
    And the user is notified of the failure
    And no EventCreated event is published
    And the task remains unaffected

  Scenario: Create an event with a task description
    Given a task includes title and description
    When EventCreationRequestedFromTask event is processed
    Then the calendar event is created with task title
    And event description is populated with task description
    And both title and description are displayed in event details

  Scenario: Multiple events from same task
    Given a user creates an event from task "Weekly Report"
    When the user later creates another event from the same task
    Then a second, independent event is created
    And both events coexist in the calendar
    And both reference the same task (conceptually)
```

## FR-CAL-008 Event import/export

User stories FR-CAL-008-001/002/003/004/005/006

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: Event import/export
  In order to backup or share my events
  As a User
  I want to export my events to a file that can be shared and later imported

  Scenario: Import events from an iCal file ("happy path")
    Given a user has an iCal file from another calendar application
    When the user selects "Import Events"
    And uploads the iCal file
    Then the file is validated
    And an import preview shows the number of events
    And the user confirms the import
    Then all events are created
    And EventCreated events are published
    And a success message is displayed

  Scenario: Export events to iCal
    Given a user has events in their calendar
    When the user selects "Export Events"
    And chooses date range "All Events"
    Then an iCal file is generated containing all events
    And the file is named "calendar_2025-11-15.ics"
    And the file is downloaded to the user's device

  Scenario: Import with duplicate handling
    Given a user already has event "Team Meeting" on 2025-11-20 10:00
    And the import file also contains this event
    When the user imports the file
    Then a dialog asks whether to skip duplicates or import all
    And if "Skip Duplicates" is selected, only new events are imported
    And if "Import All" is selected, the duplicate is imported (possibly with note)

  Scenario: Import invalid file
    Given a user attempts to import a file
    When the file is not a valid iCal format
    Then validation fails
    And an error message indicates the file format is invalid
    And no events are imported

  Scenario: Import fails mid-operation
    Given a user is importing a large iCal file
    When an error occurs during import (e.g., database error)
    Then the entire import is rolled back
    And no partial events are created
    And an error message is displayed with details

  Scenario: Export filtered events
    Given a user has events in multiple categories
    When the user selects "Export Events"
    And filters by category "Work"
    And chooses date range "This Month"
    Then only "Work" events from this month are exported
    And the file is named "calendar_work_2025-11-15.ics"
```

## FR-CAL-009 All-day events

User stories FR-CAL-009-001/002/003/004/005/006

```gherkin
@calendar
#noinspection CucumberUndefinedStep
Feature: All-day events
  In order to manage all-day events that span entire days without start/end times
  As a User
  I want to create all-day events

  Scenario: Create a single-day all-day event ("happy path")
    Given a user is creating an event
    When the user enters title "Birthday"
    And toggles "All-day" option
    And selects date "2025-11-25"
    And confirms creation
    Then an all-day event is created
    And the event spans the entire day (2025-11-25)
    And an EventCreated event is published
    And the event displays at top of day in calendar views

  Scenario: Create a multi-day all-day event
    Given a user is creating an event
    When the user enters title "Vacation"
    And toggles "All-day" option
    And selects start date "2025-12-20"
    And selects end date "2025-12-27"
    And confirms creation
    Then an all-day event is created spanning 8 days
    And the event displays across all dates in week/month views
    And an EventCreated event is published

  Scenario: All-day event displays at the top of day view
    Given a user has all-day event "Holiday" on 2025-11-25
    And timed events throughout the day
    When the user views Day View for 2025-11-25
    Then "Holiday" displays in all-day section at top
    And timed events display in hourly time slots below
    And all-day section is visually distinct

  Scenario: Convert timed event to all-day
    Given a user has timed event from 10:00 to 11:00
    When the user edits the event
    And toggles "All-day" option
    And saves
    Then the event is converted to all-day
    And time fields are removed
    And the event displays in all-day section
    And an EventUpdated event is published

  Scenario: Convert all-day event to timed
    Given a user has all-day event "Meeting"
    When the user edits the event
    And untoggles "All-day" option
    And sets start time to "14:00"
    And sets end time to "15:00"
    And saves
    Then the event is converted to timed event
    And displays in hourly time slots
    And an EventUpdated event is published
```
