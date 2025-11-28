---
sidebar_position: 7
---

# Preferences

## FR-PRE-001: Theme management

User stories FR-PRE-001-001/002/003/004/005/006

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Theme management
  In order to customize the appearance of my dashboard
  As a User
  I want to switch between visual themes

  Scenario: Select the light theme ("happy path")
    Given a user is authenticated
    And viewing the preference settings
    When the user selects "Light" theme
    And saves preferences
    Then the theme preference is updated to "Light"
    And a ThemeChanged event is published
    And the application switches to light theme immediately
    And all UI components update with light theme colors
    And the preference is persisted

  Scenario: Select the dark theme
    Given a user has light theme active
    When the user selects "Dark" theme
    And saves preferences
    Then the theme preference is updated to "Dark"
    And a ThemeChanged event is published
    And the application switches to dark theme immediately
    And all UI components update with dark theme colors

  Scenario: Select the system theme
    Given a user has dark theme active
    When the user selects "System" theme
    And saves preferences
    Then the theme preference is updated to "System"
    And a ThemeChanged event is published
    And the application detects OS theme preference
    And applies matching theme (light or dark)
    And updates dynamically if OS theme changes

  Scenario: System theme adapts to OS changes
    Given a user has "System" theme selected
    And OS is currently in light mode
    When the OS switches to dark mode
    Then the application detects the OS theme change
    And automatically switches to dark theme
    And no ThemeChanged event is published (no user action)
    And the preference remains "System"

  Scenario: Theme persists across sessions
    Given a user has selected "Dark" theme
    When the user logs out and logs back in
    Then the theme is restored to "Dark"
    And the application loads with dark theme
    And theme preference is retrieved from storage

  Scenario: Default theme for new users
    Given a new user has just registered
    When the UserRegistered event is processed
    Then default preferences are created
    And theme is set to "System"
    And the application uses OS theme preference initially
```

## FR-PRE-002: Locale management

User stories FR-PRE-002-001/002/003/004/005/006

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Locale management
  In order to customize the language for the application language, including date formats, number formats, etc.
  As a User
  I want to select my preferred language and region for the application

  Scenario: Select locale ("happy path")
    Given a user is viewing preferences settings
    And current locale is "en-US"
    When the user selects locale "es-ES" (Spanish - Spain)
    And saves preferences
    Then the locale preference is updated to "es-ES"
    And a LocaleChanged event is published
    And UI language switches to Spanish
    And date formats change to DD/MM/YYYY
    And number formats use European convention (1.000,50)
    And the preference is persisted

  Scenario: View date in locale format
    Given a user has locale set to "es-ES"
    When the user views a date (e.g., event date)
    Then dates are displayed as "15/11/2025" (DD/MM/YYYY)
    And month names are in Spanish (e.g., "noviembre")

  Scenario: View numbers in locale format
    Given a user has locale set to "de-DE" (German - Germany)
    When the user views numeric data (e.g., weather temperature)
    Then numbers use German formatting (1.234,56)
    And decimal separator is comma
    And thousands separator is period

  Scenario: Reject invalid locale
    Given a user is selecting a locale
    When the user attempts to set locale to "xx-XX" (unsupported)
    And saves preferences
    Then validation fails
    And an error message "Locale not supported" is displayed
    And locale is not changed
    And no LocaleChanged event is published

  Scenario: Locale persists across sessions
    Given a user has selected locale "fr-FR"
    When the user logs out and logs back in
    Then the locale is restored to "fr-FR"
    And the application loads with French language
    And French date/number formats

  Scenario: Default locale for new users
    Given a new user has just registered
    When default preferences are created
    Then locale is set to "en-US"
    And the application uses English language
```

## FR-PRE-003: Timezone management

User stories FR-PRE-003-001/002/003/004/005/006

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Timezone management
  In order to customize the dates and times displayed by the application
  As a User
  I want to change my preferred timezone

  Scenario: Select timezone ("happy path")
    Given a user is viewing preferences settings
    And current timezone is "UTC"
    When the user selects timezone "America/New_York"
    And saves preferences
    Then the timezone preference is updated to "America/New_York"
    And a PreferencesUpdated event is published
    And all timestamps display in Eastern Time
    And timezone offset is shown (e.g., UTC-5 or UTC-4 depending on DST)
    And the preference is persisted

  Scenario: View timestamps in timezone
    Given a user has timezone set to "Europe/Madrid" (UTC+1/UTC+2)
    And an event is scheduled at "2025-11-20T10:00:00Z" (UTC)
    When the user views the event
    Then the time is displayed as "11:00" or "12:00" (depending on DST)
    And timezone is indicated (CET or CEST)

  Scenario: Autodetect timezone from a browser
    Given a new user is registering
    When default preferences are created
    Then the system detects browser timezone using Intl.DateTimeFormat().resolvedOptions().timeZone
    And sets timezone to detected value (e.g., "America/Los_Angeles")
    And the user can change it later if needed

  Scenario: Reject invalid timezone
    Given a user is selecting a timezone
    When the user attempts to set timezone to "Invalid/Timezone"
    And saves preferences
    Then validation fails
    And an error message "Invalid timezone" is displayed
    And timezone is not changed
    And no PreferencesUpdated event is published

  Scenario: Timezone persists across sessions
    Given a user has selected timezone "Asia/Tokyo"
    When the user logs out and logs back in
    Then the timezone is restored to "Asia/Tokyo"
    And all timestamps display in Japan Standard Time

  Scenario: Search timezone by city name
    Given a user is selecting timezone
    When the user types "Madrid" in the search box
    Then matching timezones are filtered:
      | Europe/Madrid |
    And the user can select from the filtered list
```

## FR-PRE-004: Default preferences

User stories FR-PRE-004-001/002/003/004/005

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Default preferences
  In order to ensure the application works immediately without requiring user configuration
  As a Developer
  I want to provide default preferences for new users when they register

  Scenario: Create default preferences on registration ("happy path")
    Given a new user "john_doe" has just registered
    When the system processes UserRegistered event
    Then a UserPreferences aggregate is created for "john_doe"
    And theme is set to "System"
    And locale is set to "en-US"
    And timezone is set to browser-detected value (or UTC)
    And widget defaults are set (empty or reasonable values)
    And preferences are persisted to database
    And a PreferencesCreated event is published

  Scenario: Verify default values
    Given a new user has registered
    When the user views preferences settings
    Then theme shows "System" selected
    And locale shows "en-US" selected
    And timezone shows detected or UTC value
    And all defaults are displayed correctly

  Scenario: User can change defaults
    Given a new user has default preferences
    When the user changes theme to "Dark"
    And changes locale to "es-ES"
    And saves preferences
    Then the changes are persisted
    And override the defaults
    And the application uses new values

  Scenario: Idempotent preference creation
    Given UserRegistered event is processed
    And UserPreferences are created
    When the event is processed again (e.g., retry)
    Then no duplicate preferences are created
    And existing preferences remain unchanged
    And no error occurs

  Scenario: Browser timezone detection
    Given a user registers from browser in "America/Los_Angeles" timezone
    When default preferences are created
    Then timezone is detected as "America/Los_Angeles"
    And set as default timezone
    And the user sees timestamps in Pacific Time
```

## FR-PRE-005: Preference persistence

User stories FR-PRE-005-001/002/003/004/005

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Preference persistence
  In order to ensure that user customizations are not lost
  As a Developer
  I want to persist user preferences

  Scenario: Persist preference changes ("happy path")
    Given a user changes theme from "Light" to "Dark"
    When the preference update is saved
    Then the preference is immediately persisted to database
    And a ThemeChanged event is published
    And persistence completes successfully

  Scenario: Retrieve preferences on login
    Given a user has previously set preferences (Dark theme, es-ES locale)
    When the user logs in
    Then preferences are retrieved from database by UserId
    And theme is loaded as "Dark"
    And locale is loaded as "es-ES"
    And application applies these preferences

  Scenario: Handle concurrent updates
    Given a user has preferences open in two browser tabs
    When the user updates theme in tab 1
    And simultaneously updates locale in tab 2
    Then optimistic locking detects the conflict
    And one operation succeeds immediately
    And the other operation is retried with updated state
    And both changes are successfully persisted
    And no data is lost

  Scenario: Persist across restarts
    Given a user has set preferences
    When the application is restarted
    And the user logs in
    Then preferences are loaded from persistent storage
    And all user settings are restored
    And the application applies them correctly

  Scenario: Persistence failure—retry
    Given a user changes preferences
    When persistence fails due to database error
    Then the error is logged
    And the operation is queued for retry
    And the user is notified of the temporary issue
    And the system retries with exponential backoff
    And succeeds on retry
```

## FR-PRE-006: Preference validation

User stories FR-PRE-006-001/002/003/004/005/006/007

```gherkin
@preferences
#noinspection CucumberUndefinedStep
Feature: Preference validation
  In order to prevent invalid configurations
  As a Developer
  I want to validate preference values before persisting them

  Scenario: Validate theme value ("happy path")
    Given a user is updating preferences
    When the user sets theme to "Dark"
    Then theme value is validated against enum (Light, Dark, System)
    And validation passes
    And preference is updated

  Scenario: Reject invalid theme value
    Given a user is updating preferences
    When the user attempts to set theme to "Blue" (invalid)
    Then validation fails
    And an error message "Invalid theme. Supported: Light, Dark, System" is displayed
    And the preference is not updated

  Scenario: Validate locale value
    Given a user is updating preferences
    When the user sets locale to "fr-FR"
    And "fr-FR" is in the supported locale catalog
    Then validation passes
    And preference is updated

  Scenario: Reject invalid locale value
    Given a user is updating preferences
    When the user sets locale to "xx-XX" (unsupported)
    Then validation fails
    And an error message "Locale not supported" is displayed
    And available locales are suggested
    And the preference is not updated

  Scenario: Validate timezone value
    Given a user is updating preferences
    When the user sets timezone to "America/New_York"
    And "America/New_York" is valid IANA identifier
    Then validation passes
    And preference is updated

  Scenario: Reject invalid timezone value
    Given a user is updating preferences
    When the user sets timezone to "Invalid/Timezone"
    Then validation fails
    And an error message "Invalid timezone identifier" is displayed
    And the preference is not updated

  Scenario: Reject multiple invalid values
    Given a user is updating multiple preferences
    When the user sets theme to "Blue" (invalid)
    And sets locale to "xx-XX" (invalid)
    And sets timezone to "America/New_York" (valid)
    Then validation fails for theme and locale
    And error messages list all validation errors
    And none of the preferences are updated
    And the operation is atomic (all or nothing)
```
