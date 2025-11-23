---
sidebar_position: 1
---

# Dashboard management

## US-DAS-001: Dashboard creation

User stories US-DAS-001-001/002/003

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Dashboard creation
  In order to manage my dashboard and widgets
  As a User
  I want to create a new dashboard

  Scenario: Create the default dashboard on user registration ("happy path")
    Given a new user has just registered and been authenticated
    When the system processes the UserRegistered event
    Then a default dashboard is automatically created for the user
    And the dashboard has an empty widget instances collection
    And the dashboard has a default single-column layout
    And a DashboardCreated event is published

  Scenario: View a newly created dashboard
    Given a dashboard has just been created for a user
    When the user navigates to their dashboard view
    Then they see an empty dashboard with placeholder content
    And they see instructions on how to add widgets
    And the layout is rendered correctly

  Scenario: Dashboard creation failure — invalid User
    Given the user identity is invalid or not found
    When an attempt is made to create a dashboard
    Then the dashboard creation fails
    And an appropriate error message is returned
    And no DashboardCreated event is published
```

## US-DAS-002: Widget instance management

User stories US-DAS-002-001/002/003/004/005

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Widget instance management
  In order to manage my widgets
  As a user
  I want to add and remove widget instances to my dashboard

  Scenario: Add the first widget to a dashboard ("happy path")
    Given a user has an empty dashboard
    When the user selects "Add Widget" and chooses "Bookmarks"
    Then a new Bookmarks widget instance is created
    And the widget is added to the dashboard at the first available position
    And the widget has default configuration values
    And a WidgetAddedToDashboard event is published
    And the dashboard view updates to show the new widget

  Scenario: Add a second instance of the same widget type
    Given a user already has a Weather widget for London on their dashboard
    When the user adds another Weather widget for Madrid
    Then both widget instances coexist on the dashboard
    And each has a unique WidgetInstanceId
    And each has independent configuration (London vs Madrid)
    And layout positions do not overlap

  Scenario: Remove a widget from a dashboard
    Given a user has multiple widgets on their dashboard
    When the user selects "Remove" on a specific widget instance
    Then a confirmation dialog appears
    And upon confirmation, the widget instance is removed
    And a WidgetRemovedFromDashboard event is published
    And the layout is recalculated to close the gap
    And other widgets shift to fill the space

  Scenario: Add a widget with an invalid type
    Given a user attempts to add a widget
    When the widget type is not registered or invalid
    Then the operation fails with a validation error
    And an error message is displayed to the user
    And no WidgetAddedToDashboard event is published

  Scenario: Remove widget — cancel confirmation
    Given a user initiates widget removal
    When the confirmation dialog is displayed
    And the user clicks "Cancel"
    Then the widget is not removed
    And no WidgetRemovedFromDashboard event is published
    And the dashboard remains unchanged
```

## US-DAS-003: Widget configuration

User stories US-DAS-003-001/002/003/004/005

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Widget instance management
  In order to configure my widgets
  As a user
  I want to configure different types of widgets with valid settings

  Scenario: Configure weather widget location ("happy path")
    Given a user has a Weather widget on their dashboard
    When the user opens the widget settings
    And changes the location from "London" to "Madrid"
    And clicks "Save"
    Then the configuration is validated against the Weather widget schema
    And the location is updated to "Madrid"
    And a WidgetConfigurationChanged event is published
    And the widget refreshes to show Madrid weather data

  Scenario: Configure bookmarks widget folder selection ("happy path")
    Given a user has a Bookmarks widget on their dashboard
    When the user opens the widget settings
    And selects "Work" folder from available folders
    And clicks "Save"
    Then the configuration is updated
    And the widget displays only bookmarks from the "Work" folder
    And a WidgetConfigurationChanged event is published

  Scenario: Invalid configuration — missing required field
    Given a user is configuring a widget
    When the user leaves a required configuration field empty
    And attempts to save
    Then validation fails
    And an error message highlights the missing field
    And the configuration is not saved
    And no WidgetConfigurationChanged event is published

  Scenario: Invalid configuration — schema violation
    Given a user is configuring a Weather widget
    When the user enters an invalid location (e.g., "XYZ123")
    And attempts to save
    Then schema validation fails
    And an error message indicates the location is invalid
    And the configuration is not saved
    And the widget retains its previous configuration

  Scenario: Cancel configuration changes
    Given a user has opened widget settings
    And made changes to the configuration
    When the user clicks "Cancel"
    Then changes are discarded
    And the widget retains its previous configuration
    And no WidgetConfigurationChanged event is published
```

## US-DAS-004: Layout management

User stories US-DAS-004-001/002/003/004/005

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Layout management
  In order to customize my dashboard
  As a user
  I want to configure the dashboard layout

  Scenario: Automatic layout calculation ("happy path")
    Given a user has a dashboard with three widgets
    When the dashboard is rendered
    Then the layout engine calculates positions for all widgets
    And widgets are arranged in a single-column grid
    And no widgets overlap
    And widgets fill the available width
    And vertical spacing is consistent

  Scenario: Responsive layout - mobile view
    Given a user has a dashboard with multiple widgets
    When the user views the dashboard on a mobile device
    Then the layout adapts to a single-column view
    And widgets stack vertically
    And widget widths fill the mobile screen
    And spacing is adjusted for mobile viewing

  Scenario: Layout after widget removal
    Given a user has a dashboard with four widgets in a grid layout
    When the user removes the second widget
    Then the layout is recalculated
    And the gap is closed
    And remaining widgets shift to maintain a cohesive layout
    And no empty spaces remain in the middle of the layout

  Scenario: Layout persistence
    Given a user has arranged widgets on their dashboard
    When the user logs out and logs back in
    Then the layout is restored exactly as it was
    And all widget positions are preserved
    And no widgets have shifted or overlapped

  Scenario: Responsive layout — window resize
    Given a user is viewing their dashboard on desktop
    When the user resizes the browser window
    Then the layout adapts in real-time
    And widgets reflow to fit the new width
    And no widgets are cut off or hidden
    And the transition is smooth
```

## US-DAS-005: Widget reordering

User stories US-DAS-005-001/002/003/004/005

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Widget reordering
  In order to position the widgets in the layout
  As a user
  I want to move and reorder my widgets

  Scenario: Reorder widgets by drag-and-drop ("happy path")
    Given a user has a dashboard with four widgets (A, B, C, D) in that order
    When the user drags widget D to the position between A and B
    Then widget D is visually lifted and follows the cursor
    And drop zones between other widgets are highlighted
    And when dropped, the order becomes: A, D, B, C
    And a WidgetReordered event is published
    And the new order is persisted
    And other widgets smoothly animate to their new positions

  Scenario: Reorder widgets — first to last position
    Given a user has a dashboard with widgets (A, B, C) in that order
    When the user drags widget A to the end of the list
    Then the order becomes: B, C, A
    And the layout is recalculated
    And the change is persisted
    And a WidgetReordered event is published

  Scenario: Cancel drag operation
    Given a user starts dragging a widget
    When the user presses the ESC key before dropping
    Then the drag operation is cancelled
    And the widget returns to its original position
    And no WidgetReordered event is published
    And the order remains unchanged

  Scenario: Drag widget outside valid drop zone
    Given a user is dragging a widget
    When the user releases the widget outside any valid drop zone
    Then the widget snaps back to its original position
    And no reordering occurs
    And no WidgetReordered event is published

  Scenario: Reorder widgets on a touch device
    Given a user is viewing their dashboard on a touch device
    When the user long-presses a widget and then drags it
    Then the widget enters drag mode
    And follows the touch point
    And can be dropped in a new position
    And the same reordering logic applies as desktop
```

## US-DAS-006: Personalization profiles

User stories US-DAS-006-001/002/003/004/005/006

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Personalization profiles
  In order to have more than one dashboard
  As a user
  I want to create profiles and switch between them

  Scenario: Create a new profile ("happy path")
    Given a user is viewing their default dashboard
    When the user clicks "Create New Profile"
    And enters the name "Work"
    And confirms creation
    Then a new profile named "Work" is created
    And a new empty dashboard is associated with the profile
    And the user is switched to the new "Work" profile
    And a ProfileCreated event is published
    And the profile is added to the profile selector

  Scenario: Switch between profiles
    Given a user has two profiles: "Default" and "Work"
    And the "Default" profile is currently active
    When the user selects "Work" from the profile selector
    Then the current dashboard is saved
    And the "Work" dashboard is loaded
    And a ProfileSwitched event is published
    And widgets and layout from "Work" profile are displayed
    And the profile selector shows "Work" as active

  Scenario: Create a profile with a duplicate name
    Given a user already has a profile named "Work"
    When the user attempts to create another profile named "Work"
    Then validation fails
    And an error message indicates the name is already in use
    And the profile is not created
    And no ProfileCreated event is published

  Scenario: Delete non-default profile
    Given a user has three profiles: "Default", "Work", and "Home"
    And "Home" profile is currently active
    When the user deletes the "Home" profile
    Then a confirmation dialog appears
    And upon confirmation, the "Home" profile is deleted
    And the user is switched to the "Default" profile
    And a ProfileDeleted event is published
    And "Home" is removed from the profile selector

  Scenario: Attempt to delete default profile
    Given a user is viewing their "Default" profile
    When the user attempts to delete the "Default" profile
    Then the operation is prevented
    And an error message indicates the default profile cannot be deleted
    And no ProfileDeleted event is published

  Scenario: Restore last active profile on login
    Given a user's last active profile was "Work"
    When the user logs out and logs back in
    Then the "Work" profile is automatically loaded
    And the dashboard associated with "Work" is displayed
```

## US-DAS-007: Dashboard deletion

User stories US-DAS-007-001/002/003/004

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Dashboard deletion
  In order to better manage my profiles
  As a user
  I want to remove my dashboards

  Scenario: Delete dashboard (happy path — multiple profiles)
    Given a user has two profiles with associated dashboards: "Default" and "Work"
    And the user is viewing the "Work" dashboard
    When the user selects "Delete Dashboard" from the profile menu
    Then a confirmation dialog appears warning of permanent deletion
    And upon confirmation, the "Work" dashboard is deleted
    And all widget instances on the "Work" dashboard are removed
    And a DashboardDeleted event is published
    And the user is switched to the "Default" dashboard

  Scenario: Attempt to delete only dashboard
    Given a user has only one dashboard (the default dashboard)
    When the user attempts to delete this dashboard
    Then the operation is prevented
    And an error message indicates the last dashboard cannot be deleted
    And no DashboardDeleted event is published

  Scenario: Cancel dashboard deletion
    Given a user initiates dashboard deletion
    When the confirmation dialog appears
    And the user clicks "Cancel"
    Then the deletion is aborted
    And the dashboard remains unchanged
    And no DashboardDeleted event is published

  Scenario: Dashboard deletion on account deletion
    Given a user requests account deletion
    When the account deletion process runs
    Then all dashboards associated with the user are deleted
    And DashboardDeleted events are published for each dashboard
    And all widget instances are cascade deleted
```

## US-DAS-008: Dashboard persistence

User stories US-DAS-007-001/002/003/004/005

```gherkin
@dashboard
#noinspection CucumberUndefinedStep
Feature: Dashboard persistence
  In order to use my dashboards in the future in this or other devices
  As a user
  I want the dashboard to be saved

  Scenario: Persist dashboard after widget addition ("happy path")
    Given a user has a dashboard loaded
    When the user adds a new widget
    Then the widget instance is immediately persisted to storage
    And the dashboard's widget instances collection is updated
    And the layout is recalculated and persisted
    And persistence completes successfully

  Scenario: Resume dashboard across sessions
    Given a user has configured their dashboard with multiple widgets
    And the user logs out
    When the user logs back in from a different device
    Then the dashboard is retrieved from storage
    And all widget instances are restored
    And all widget configurations are restored
    And the layout is restored exactly as before
    And the dashboard appears identical to when the user logged out

  Scenario: Handle concurrent update conflict
    Given a user has their dashboard open in two browser tabs
    When the user adds a widget in tab 1
    And simultaneously adds a different widget in tab 2
    Then optimistic locking detects the conflict
    And one operation succeeds immediately
    And the other operation is retried with the updated state
    And both widgets are successfully added
    And no data is lost

  Scenario: Persistence failure — network error
    Given a user adds a widget to their dashboard
    When the persistence operation fails due to network error
    Then an error message is displayed to the user
    And the operation is queued for retry
    And the user is notified when the retry succeeds
    And the dashboard state is eventually consistent

  Scenario: Retrieve dashboard with invalid widget configuration
    Given a dashboard is stored with a widget configuration
    And the widget type schema has been updated
    When the dashboard is retrieved
    Then the widget configuration is validated against the new schema
    And invalid configurations are migrated or reset to defaults
    And the user is notified of any configuration changes
    And the dashboard loads successfully
```
