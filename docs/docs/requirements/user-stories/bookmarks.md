---
sidebar_position: 2
---

# Bookmarks

These user stores (Features and Scenarios) directly map with Bookmarks functional requirements. For more information,
check [this documentation](../functional/bookmarks).

## US-BKM-001: Folder management

User stories US-BKM-001-001/002/003/004/005/006/007

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Folder management
  In order to organize my bookmarks
  As a User
  I want to create, edit and remove folders

  Scenario: Create a new folder ("happy path")
    Given a user is viewing their bookmarks
    When the user selects "New Folder" within the "Work" folder
    And enters the name "Projects"
    And confirms creation
    Then a new folder named "Projects" is created
    And the folder is placed within "Work" folder
    And a FolderCreated event is published
    And the folder appears in the folder tree

  Scenario: Create a folder with a duplicate name
    Given a user has a folder named "Personal" in the root folder
    When the user attempts to create another folder named "Personal" in the root folder
    Then validation fails
    And an error message indicates the name already exists at this level
    And the folder is not created
    And no FolderCreated event is published

  Scenario: Rename folder
    Given a user has a folder named "Temp"
    When the user selects "Rename" on the folder
    And changes the name to "Archive"
    And confirms the change
    Then the folder name is updated to "Archive"
    And a FolderRenamed event is published
    And all child elements remain intact
    And the folder's position in the tree is unchanged

  Scenario: Delete empty folder
    Given a user has an empty folder named "Old"
    When the user selects "Delete" on the folder
    Then a simple confirmation dialog appears
    And upon confirmation, the folder is deleted
    And a FolderDeleted event is published
    And the folder is removed from the folder tree

  Scenario: Delete a folder with contents (cascade)
    Given a user has a folder named "Archive" containing 5 bookmarks and 2 subfolders
    When the user selects "Delete" on the folder
    Then a warning dialog appears indicating the folder contains items
    And the dialog shows the count of items that will be deleted
    And upon confirmation, the folder and all contents are deleted
    And FolderDeleted events are published for the folder and subfolders
    And BookmarkDeleted events are published for all bookmarks
    And the entire subtree is removed

  Scenario: Attempt to rename to duplicate name
    Given a user has two folders in root: "Personal" and "Work"
    When the user attempts to rename "Personal" to "Work"
    Then validation fails
    And an error message indicates the name already exists at this level
    And the folder name remains unchanged
    And no FolderRenamed event is published

  Scenario: Create the root folder on user registration
    Given a new user has just registered
    When the system processes the UserRegistered event
    Then a root folder is automatically created for the user
    And the root folder has a system-defined name (e.g., "Bookmarks" or "Root")
    And a FolderCreated event is published
    And the user's bookmark tree is initialized
```

## US-BKM-002: Bookmark management

User stories US-BKM-002-001/002/003/004/005/006/007

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Bookmark management
  In order to manage my bookmarks
  As a User
  I want to create, edit and remove bookmarks

  Scenario: Create a new bookmark ("happy path")
    Given a user is viewing the "Work" folder
    When the user selects "Add Bookmark"
    And enters the URL "https://github.com"
    And enters the title "GitHub"
    And confirms creation
    Then a new bookmark is created
    And the bookmark is placed in the "Work" folder
    And the favicon is automatically fetched from the URL
    And a BookmarkCreated event is published
    And the bookmark appears in the folder

  Scenario: Create a bookmark with invalid URL
    Given a user is creating a bookmark
    When the user enters an invalid URL "not-a-url"
    And attempts to save
    Then URL validation fails
    And an error message indicates the URL format is invalid
    And the bookmark is not created
    And no BookmarkCreated event is published

  Scenario: Edit bookmark
    Given a user has a bookmark with title "Old Title" and URL "https://old-url.com"
    When the user selects "Edit" on the bookmark
    And changes the title to "New Title"
    And changes the URL to "https://new-url.com"
    And confirms the changes
    Then the bookmark is updated with the new values
    And a BookmarkUpdated event is published
    And the favicon is refreshed from the new URL
    And the bookmark position remains unchanged

  Scenario: Delete bookmark
    Given a user has a bookmark in the "Work" folder
    When the user selects "Delete" on the bookmark
    Then a confirmation dialog appears
    And upon confirmation, the bookmark is deleted
    And a BookmarkDeleted event is published
    And the bookmark is removed from the folder

  Scenario: Move bookmark to another folder
    Given a user has a bookmark in the "Personal" folder
    When the user drags the bookmark to the "Work" folder
    Then the bookmark is moved to the "Work" folder
    And a BookmarkUpdated event is published indicating folder change
    And the bookmark appears in the "Work" folder
    And the bookmark is removed from the "Personal" folder

  Scenario: Create a bookmark without a title
    Given a user is creating a bookmark
    When the user enters a URL "https://example.com"
    But leaves the title field empty
    And attempts to save
    Then validation fails
    And an error message indicates the title is required
    And the bookmark is not created
    And no BookmarkCreated event is published

  Scenario: Auto-fetch favicon fails
    Given a user creates a bookmark with URL "https://no-favicon.com"
    When the favicon auto-fetch fails
    Then a default icon is assigned to the bookmark
    And the bookmark is created successfully
    And a BookmarkCreated event is published
    And the user can later upload a custom icon
```

## US-BKM-003: Bookmark organization

User stories US-BKM-003-001/002/003/004

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Bookmark organization
  In order to manage bookmarks
  As a User
  I want to move bookmarks between folders

  Scenario: Move bookmark via drag-and-drop ("happy path")
    Given a user has a bookmark in the "Personal" folder
    When the user drags the bookmark over the "Work" folder
    And releases the mouse button
    Then the bookmark is moved to the "Work" folder
    And a BookmarkUpdated event is published
    And the bookmark appears at the end of the "Work" folder
    And the bookmark is removed from the "Personal" folder

  Scenario: Move bookmark via context menu
    Given a user right-clicks a bookmark in the "Personal" folder
    When the user selects "Move to..." from the context menu
    And selects "Work" folder from the folder list
    Then the bookmark is moved to the "Work" folder
    And a BookmarkUpdated event is published
    And the bookmark appears at the end of the "Work" folder

  Scenario: Cancel drag operation
    Given a user starts dragging a bookmark
    When the user presses the ESC key before releasing
    Then the drag operation is cancelled
    And the bookmark remains in its original folder
    And no BookmarkUpdated event is published

  Scenario: Drop bookmark on an invalid target
    Given a user is dragging a bookmark
    When the user releases the bookmark outside any folder area
    Then the bookmark snaps back to its original position
    And no move operation occurs
    And no BookmarkUpdated event is published
```

## US-BKM-004: Bookmark reordering

User stories US-BKM-004-001/002/003

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Bookmark reordering
  In order to show bookmarks in the order I need
  As a User
  I want to reorder bookmarks

  Scenario: Reorder bookmarks via drag-and-drop ("happy path")
    Given a folder contains bookmarks in order: A, B, C, D
    When the user drags bookmark D to the position between A and B
    Then bookmark D is visually lifted and follows the cursor
    And drop zones between bookmarks are highlighted
    And when dropped, the order becomes: A, D, B, C
    And a BookmarkUpdated event is published
    And the new order is persisted

  Scenario: Move bookmark to the first position
    Given a folder contains bookmarks in order: A, B, C
    When the user drags bookmark C to the first position
    Then the order becomes: C, A, B
    And a BookmarkUpdated event is published
    And the change is persisted

  Scenario: Cancel reorder operation
    Given a user starts dragging a bookmark
    When the user presses the ESC key before dropping
    Then the drag operation is cancelled
    And the bookmark returns to its original position
    And no BookmarkUpdated event is published
```

## US-BKM-005: Pin/favorite management

User stories US-BKM-005-001/002/003/004

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Pin/favorite management
  In order to manage favorite bookmarks
  As a User
  I want to add and remove bookmarks and folders to a Speed Dial

  Scenario: Pin a bookmark ("happy path")
    Given a user has a bookmark in the "Work" folder
    And the bookmark is not currently pinned
    When the user right-clicks the bookmark
    And selects "Pin to Speed Dial"
    Then the bookmark is marked as pinned
    And a BookmarkPinned event is published
    And the bookmark appears in the speed dial
    And a pin icon is displayed on the bookmark

  Scenario: Unpin a bookmark
    Given a user has a pinned bookmark
    When the user right-clicks the bookmark
    And selects "Unpin from Speed Dial"
    Then the bookmark is unmarked as pinned
    And a BookmarkUnpinned event is published
    And the bookmark is removed from the speed dial
    And the pin icon is removed

  Scenario: Attempt to pin when maximum reached
    Given a user has already pinned 12 bookmarks (maximum)
    When the user attempts to pin another bookmark
    Then an error message appears indicating the limit is reached
    And the bookmark is not pinned
    And no BookmarkPinned event is published

  Scenario: Pin status persists across sessions
    Given a user has pinned 5 bookmarks
    When the user logs out and logs back in
    Then the 5 bookmarks remain pinned
    And they appear in the speed dial
    And the pin indicators are displayed
```

## US-BKM-006: Bookmark search

User stories US-BKM-006-001/002/003/004/005

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Bookmark search
  In order to easily find one of my bookmarks
  As a User
  I want to search for bookmarks by title or URL

  Scenario: Search bookmarks by title ("happy path")
    Given a user has bookmarks with various titles
    When the user enters "github" in the search field
    Then all bookmarks with "github" in the title are displayed
    And the matching text "github" is highlighted
    And each result shows the bookmark title, URL, and folder path
    And results update in real-time as the user types

  Scenario: Search bookmarks by URL
    Given a user has bookmarks with various URLs
    When the user enters "stackoverflow.com" in the search field
    Then all bookmarks with "stackoverflow.com" in the URL are displayed
    And the matching text is highlighted in the URL
    And results show the folder location

  Scenario: No search results
    Given a user enters a search query
    When no bookmarks match the query
    Then a "No results found" message is displayed
    And the search field remains active
    And the user can modify the query

  Scenario: Clear search
    Given a user has entered a search query with results displayed
    When the user clicks the "Clear" button
    Then the search field is cleared
    And the normal folder view is restored
    And all bookmarks in the current folder are displayed

  Scenario: Search with special characters
    Given a user has bookmarks with special characters in titles
    When the user searches for those special characters
    Then the search correctly handles and escapes special characters
    And matching bookmarks are displayed
    And no errors occur
```

## US-BKM-007: Icon/favicon management

User stories US-BKM-007-001/002/003/004/005

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Icon/favicon management
  In order to quickly identify bookmarks
  As a User
  I want to assign icons or favicons to bookmarks

  Scenario: Auto-fetch favicon on bookmark creation ("happy path")
    Given a user creates a bookmark with URL "https://github.com"
    When the bookmark is saved
    Then the system immediately displays a default icon
    And the system asynchronously fetches the favicon from "https://github.com/favicon.ico"
    And when the fetch succeeds, the favicon replaces the default icon
    And the favicon is cached for future use

  Scenario: Favicon fetch fails
    Given a user creates a bookmark with URL "https://no-favicon-site.com"
    When the bookmark is saved
    And the favicon fetch fails (404 or timeout)
    Then the default icon is retained
    And the fetch failure is logged
    And the user can later upload a custom icon

  Scenario: Upload custom icon
    Given a user has a bookmark with an auto-fetched favicon
    When the user opens bookmark settings
    And selects "Upload Custom Icon"
    And uploads a PNG file (< 100KB)
    Then the file is validated for size and format
    And the custom icon is stored
    And the custom icon replaces the auto-fetched favicon
    And a BookmarkUpdated event is published

  Scenario: Upload invalid icon file
    Given a user attempts to upload a custom icon
    When the file size exceeds 100KB
    Then validation fails
    And an error message indicates the file is too large
    And the icon is not uploaded
    And the current icon remains unchanged

  Scenario: Revert to auto-fetched icon
    Given a user has uploaded a custom icon
    When the user selects "Use Auto-Fetched Icon"
    Then the custom icon is removed
    And the system re-fetches the favicon from the URL
    And the auto-fetched icon is displayed
    And a BookmarkUpdated event is published
```

## US-BKM-008: Speed Dial

User stories US-BKM-008-001/002/003/004/005

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Speed Dial
  In order to access pinned/favorite bookmarks
  As a User
  I want to view my Speed Dial

  Scenario: View speed dial with pinned bookmarks ("happy path")
    Given a user has pinned 8 bookmarks
    When the user views the speed dial
    Then all 8 bookmarks are displayed in a grid layout
    And each bookmark shows its icon and title
    And the grid adapts to the screen size
    And hover effects highlight the bookmark tile

  Scenario: Open bookmark from speed dial
    Given a user is viewing the speed dial
    When the user clicks on a bookmark tile
    Then the bookmark URL opens in a new browser tab
    And the speed dial remains open

  Scenario: View empty speed dial
    Given a user has no pinned bookmarks
    When the user views the speed dial
    Then a placeholder message is displayed
    And the message says "Pin bookmarks to add them here"
    And a button or link to bookmark management is provided

  Scenario: Speed dial updates in real-time
    Given a user is viewing the speed dial
    When the user pins a new bookmark from another window/tab
    Then the speed dial automatically updates
    And the new bookmark appears in the grid
    And no page refresh is required

  Scenario: Responsive grid layout
    Given a user is viewing the speed dial on desktop
    When the user resizes the browser window to tablet size
    Then the grid layout adapts to show fewer columns
    And all pinned bookmarks remain visible
    And the transition is smooth
```

## US-BKM-009: Bookmark import/export

User stories US-BKM-009-001/002/003/004/005

```gherkin
@bookmarks
#noinspection CucumberUndefinedStep
Feature: Bookmark import/export
  In order to backup or share my bookmarks
  As a User
  I want to export my bookmarks to a file that can be shared and later imported

  Scenario: Import bookmarks from an HTML file ("happy path")
    Given a user has a bookmark HTML file from another browser
    When the user selects "Import Bookmarks"
    And uploads the HTML file
    Then the file is validated
    And an import preview shows the number of bookmarks and folders
    And the user confirms the import
    And all bookmarks and folders are created
    And BookmarkCreated and FolderCreated events are published
    And a success message is displayed

  Scenario: Export bookmarks to JSON
    Given a user has bookmarks organized in folders
    When the user selects "Export Bookmarks"
    And chooses JSON format
    Then a JSON file is generated containing all bookmarks and folders
    And the file is named with timestamp (e.g., "bookmarks_2025-11-15.json")
    And the file is downloaded to the user's device

  Scenario: Import with duplicate handling
    Given a user already has bookmarks with URLs that exist in the import file
    When the user imports the file
    Then a dialog asks whether to skip duplicates or import all
    And if "Skip Duplicates" is selected, only new bookmarks are imported
    And if "Import All" is selected, duplicates are imported (possibly in a different folder)

  Scenario: Import invalid file
    Given a user attempts to import a file
    When the file is not a valid HTML or JSON bookmark file
    Then validation fails
    And an error message indicates the file format is invalid
    And no bookmarks are imported

  Scenario: Import fails mid-operation
    Given a user is importing a large bookmark file
    When an error occurs during import (e.g., database error)
    Then the entire import is rolled back
    And no partial bookmarks are created
    And an error message is displayed with details
```
