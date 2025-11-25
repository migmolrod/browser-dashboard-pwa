---
sidebar_position: 5
---

# Weather

## FR-WEA-001: Location configuration

User stories FR-WEA-001-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Location configuration
  In order to see the weather in my location
  As a User
  I want to configure a weather widget with my location

  Scenario: Configure location by city name ("happy path")
    Given a user has a weather widget on their dashboard
    When the user opens widget settings
    And enters location "Madrid"
    And confirms the change
    Then the location is validated against the weather provider
    And the location is saved as "Madrid"
    And weather data is fetched for Madrid
    And the widget displays Madrid weather

  Scenario: Configure location with city and country
    Given a user is configuring a weather widget
    When the user enters location "London, UK"
    And confirms the change
    Then the location is validated as "London, UK"
    And weather data is fetched for London, UK
    And the widget displays weather for London, UK

  Scenario: Configure location by postal code
    Given a user is configuring a weather widget
    When the user enters location "28001" (Madrid postal code)
    And confirms the change
    Then the location is validated as postal code
    And weather data is fetched for the corresponding location
    And the widget displays weather with resolved city name

  Scenario: Configure location by coordinates
    Given a user is configuring a weather widget
    When the user enters coordinates "40.4168, -3.7038" (Madrid)
    And confirms the change
    Then the location is validated as coordinates
    And weather data is fetched for those coordinates
    And the widget displays weather with resolved city name

  Scenario: Invalid location validation
    Given a user is configuring a weather widget
    When the user enters location "InvalidCityXYZ123"
    And attempts to save
    Then location validation fails
    And an error message indicates the location is not found
    And the configuration is not saved
    And the widget retains previous location (or shows no data)

  Scenario: Update existing location
    Given a user has a weather widget configured for "London"
    When the user changes the location to "Paris"
    And confirms the change
    Then the location is updated to "Paris"
    And weather data is fetched for Paris
    And the widget displays Paris weather
    And previous London data is cleared

  Scenario: Use browser geolocation as default
    Given a user adds a weather widget for the first time
    And browser geolocation is permitted
    When the widget initializes
    Then the system requests user location
    And if granted, detects coordinates
    And resolves to city name
    And sets as default location
    And fetches weather data
```

## FR-WEA-002: Current weather retrieval

User stories FR-WEA-002-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Current weather retrieval
  In order to see the current weather data
  As a Developer
  I want the system to retrieve the current weather data from a weather provider API

  Scenario: Retrieve weather for the configured location ("happy path")
    Given a user has a weather widget configured for "Madrid"
    When the system fetches weather data
    Then a request is sent to the weather provider API
    And the response includes current temperature (25°C)
    And weather conditions ("Partly Cloudy")
    And humidity (60%)
    And wind speed (15 km/h)
    And provider timestamp
    Then a WeatherSnapshot is created
    And a WeatherDataRefreshed event is published
    And the widget displays all weather information

  Scenario: Display temperature in metric units
    Given a user has configured units as "metric"
    And a weather widget for "London"
    When weather data is retrieved
    Then temperature is displayed in Celsius (18°C)
    And wind speed is displayed in km/h (20 km/h)

  Scenario: Display temperature in imperial units
    Given a user has configured units as "imperial"
    And a weather widget for "New York"
    When weather data is retrieved
    Then temperature is displayed in Fahrenheit (75°F)
    And wind speed is displayed in mph (12 mph)

  Scenario: Display weather icon
    Given weather data indicates "Partly Cloudy"
    When the widget displays weather
    Then an appropriate weather icon is shown
    And matches the condition code from provider
    And is visually clear and recognizable

  Scenario: Weather retrieval failure—API error
    Given a user has a weather widget configured
    When the weather provider API returns an error (500)
    Then weather retrieval fails
    And a WeatherFetchFailed event is published
    And cached weather data is displayed (if available)
    And a subtle error indicator is shown
    And the system retries after backoff period

  Scenario: Weather retrieval failure—network timeout
    Given a user has a weather widget configured
    When the weather provider API request times out
    Then weather retrieval fails gracefully
    And a WeatherFetchFailed event is published
    And the widget shows last known data (if available)
    And shows "Unable to fetch weather" indicator
    And the system retries after backoff period

  Scenario: Parse provider response through ACL
    Given the weather provider returns data in its specific format
    When the system processes the response
    Then the anti-corruption layer translates provider format to WeatherSnapshot internal model
    And provider-specific fields are mapped consistently
    And the system is isolated from provider API changes
```

## FR-WEA-003: Weather data caching

User stories FR-WEA-003-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Weather data caching
  In order to have better efficiency and minimize API calls
  As a Developer
  I want the system to cache weather data

  Scenario: Serve cached weather data ("happy path")
    Given weather data was fetched for "Madrid" 10 minutes ago
    And cached with timestamp
    When the widget requests weather data for "Madrid"
    Then the system checks cache
    And finds valid cached data (age < 30 minutes)
    And serves cached data without API call
    And no WeatherDataRefreshed event is published

  Scenario: Refresh expired cache
    Given weather data was fetched for "London" 35 minutes ago
    And cache has expired (age > 30 minutes)
    When the widget requests weather data for "London"
    Then the system detects expired cache
    And triggers background refresh from provider API
    And serves stale cached data immediately (optimistic)
    And updates cache when fresh data arrives
    And publishes WeatherDataRefreshed event

  Scenario: Manual refresh bypasses cache
    Given weather data was fetched 5 minutes ago (cache valid)
    When the user clicks "Refresh" on weather widget
    Then the system bypasses cache
    And fetches fresh data from provider API
    And updates cache with new data
    And publishes WeatherDataRefreshed event
    And displays updated weather

  Scenario: Cache miss triggers retrieval
    Given no weather data is cached for "Paris"
    When the widget requests weather data for "Paris"
    Then the system detects cache miss
    And fetches data from provider API
    And caches the response
    And serves the data to widget
    And publishes WeatherDataRefreshed event

  Scenario: Cache prevents API rate limit
    Given weather data is requested frequently
    And cache is valid for 30 minutes
    When multiple widgets or users request same location
    Then cached data is served to all
    And only one API call is made per 30-minute window
    And API rate limits are respected

  Scenario: Cache persists across application restarts
    Given weather data is cached for "Madrid"
    When the application is restarted
    And the user views the weather widget
    Then cached data is loaded from persistent storage
    And displayed immediately
    And if cache is expired, background refresh is triggered

  Scenario: Different locations have independent caches
    Given weather data is cached for "London" and "Madrid"
    When "London" cache expires
    Then only "London" data is refreshed
    And "Madrid" cache remains valid
    And each location is tracked independently
```

## FR-WEA-004: Multiple locations

User stories FR-WEA-004-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Multiple locations
  In order to get weather information from more than one location
  As a User
  I want to create more than one widget instance with a different location for each

  Scenario: Add multiple weather widgets ("happy path")
    Given a user has a dashboard
    When the user adds a weather widget for "London"
    And adds another weather widget for "Tokyo"
    And adds a third weather widget for "New York"
    Then all three widgets are displayed on the dashboard
    And each shows weather for its respective location
    And each has independent configuration

  Scenario: Different locations update independently
    Given a user has weather widgets for "Madrid" and "Paris"
    When "Madrid" weather data is refreshed
    Then only the Madrid widget updates
    And Paris widget retains its current data
    And each widget has its own refresh cycle

  Scenario: Same location in multiple widgets
    Given a user adds two weather widgets for "London"
    When weather data for "London" is fetched
    Then both widgets display the same data
    And data is cached once for "London"
    And both widgets serve from same cache
    And only one API call is made

  Scenario: Remove one widget, others remain
    Given a user has three weather widgets
    When the user removes the "Tokyo" widget
    Then only the Tokyo widget is removed
    And "London" and "New York" widgets remain
    And their data and configuration are unaffected

  Scenario: Enforce maximum widget limit
    Given a user already has 5 weather widgets (maximum)
    When the user attempts to add a 6th weather widget
    Then an error message is displayed
    And indicates the maximum limit is reached
    And the widget is not added
```

## FR-WEA-005: Unit preferences

User stories FR-WEA-005-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Unit preferences
  In order to see the weather data in my preferred units
  As a User
  I want to set my unit preference to metric or imperial

  Scenario: Set unit preference to metric ("happy path")
    Given a user is in preferences settings
    When the user selects "Metric" units
    And saves preferences
    Then unit preference is set to metric
    And a PreferencesUpdated event is published
    And all weather widgets refresh
    And display temperature in Celsius
    And wind speed in km/h

  Scenario: Set unit preference to imperial
    Given a user is in preferences settings
    When the user selects "Imperial" units
    And saves preferences
    Then unit preference is set to imperial
    And a PreferencesUpdated event is published
    And all weather widgets refresh
    And display temperature in Fahrenheit
    And wind speed in mph

  Scenario: Weather fetched with preferred units
    Given a user has unit preference set to metric
    When weather data is fetched from provider
    Then the request specifies metric units
    And provider returns data in Celsius and km/h
    And no conversion is needed
    And data is displayed directly

  Scenario: Unit conversion when the provider doesn't support preference
    Given a weather provider only returns data in metric
    And user preference is imperial
    When weather data is retrieved
    Then the system receives metric data
    And converts temperature to Fahrenheit
    And converts wind speed to mph
    And displays converted values to user

  Scenario: Unit preference persists across sessions
    Given a user has set unit preference to imperial
    When the user logs out and logs back in
    Then unit preference is restored to imperial
    And all weather data displays in imperial units

  Scenario: Change preference refreshes widgets
    Given a user has weather widgets displaying in metric
    When the user changes preference to imperial
    Then all weather widgets immediately refresh
    And display data in imperial units
    And no page reload is required
```

## FR-WEA-006: Weather data refresh

User stories FR-WEA-006-001/002/003/004/005/006/007

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Weather data refresh
  In order to stay up to date with weather data
  As a User
  I want data to be refreshed automatically as well as be able to refresh data manually

  Scenario: Automatic weather refresh ("happy path")
    Given weather data was fetched 30 minutes ago
    And cache has expired
    When the system checks for expired cache
    Then automatic refresh is triggered
    And fresh weather data is fetched from provider
    And cache is updated with new data
    And a WeatherDataRefreshed event is published
    And all widgets for this location update automatically

  Scenario: Manual weather refresh
    Given a user is viewing a weather widget
    When the user clicks the "Refresh" button
    Then a loading indicator is displayed
    And fresh weather data is fetched from provider
    And cache is updated (bypassing existing cache)
    And a WeatherDataRefreshed event is published
    And the widget displays updated weather
    And loading indicator is hidden

  Scenario: Refresh with rate limiting
    Given a user manually refreshed weather 10 seconds ago
    When the user attempts to refresh again
    Then the refresh is rate-limited
    And a message indicates "Please wait before refreshing again"
    And no API call is made
    And cached data continues to display

  Scenario: Background refresh does not block UI
    Given automatic refresh is triggered
    When weather data is being fetched in background
    Then the UI remains responsive
    And the user can interact with other widgets
    And a subtle loading indicator shows refresh in progress
    And when refresh completes, the widget updates

  Scenario: Refresh failure retains previous data
    Given a user has weather data from 1 hour ago
    When automatic refresh is triggered
    And the provider API returns an error
    Then the refresh fails
    And a WeatherFetchFailed event is published
    And previous cached data (1 hour old) continues to display
    And a subtle error indicator is shown
    And the system schedules retry with backoff

  Scenario: Manual refresh during automatic refresh
    Given automatic refresh is in progress
    When the user clicks "Refresh" manually
    Then the manual refresh is canceled
    And the user is notified of the operation
    And the widget updates when refresh completes
```

## FR-WEA-007: Error handling

User stories FR-WEA-007-001/002/003/004/005/006/007

For end users

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Error handling
  In order to be informed about issues with weather functions
  As a User
  I want to be shown alerts with details about the errors
  
  Scenario: Handle network error ("happy path")
    Given a user has a weather widget configured
    When weather data fetch fails due to network timeout
    Then the error is classified as "Network Error"
    And a WeatherFetchFailed event is published
    And an error message "Unable to connect to weather service" is displayed
    And cached data is shown (if available) with "Last updated: 1 hour ago"
    And the system schedules retry with exponential backoff

  Scenario: Handle API error (500)
    Given a user has a weather widget configured
    When the weather provider API returns 500 Internal Server Error
    Then the error is classified as "API Error"
    And a WeatherFetchFailed event is published
    And an error message "Weather service temporarily unavailable" is displayed
    And cached data is retained
    And the system schedules retry after 5 minutes

  Scenario: Handle invalid location configuration
    Given a user has configured an invalid location "XYZ12345"
    When the system attempts to fetch weather data
    Then the error is classified as "Configuration Error"
    And a WeatherFetchFailed event is published
    And an error message "Invalid location. Please update your settings" is displayed
    And no retry is scheduled (configuration issue)
    And user is prompted to reconfigure location

  Scenario: Handle rate limit exceeded
    Given the weather provider API rate limit has been exceeded
    When the system attempts to fetch weather data
    Then the error is classified as "Rate Limit Error"
    And a WeatherFetchFailed event is published
    And an error message "Too many requests. Please try again in a few minutes" is displayed
    And cached data is displayed
    And retry is scheduled after rate limit reset time

  Scenario: Display cached data during error
    Given weather data was fetched 2 hours ago
    And is cached
    When a fetch error occurs
    Then the widget displays cached data
    And shows "Last updated: 2 hours ago"
    And shows a warning icon indicating data may be stale
    And user can attempt manual refresh

  Scenario: Manual retry after error
    Given a fetch error has occurred
    And error message is displayed
    When the user clicks "Retry" button
    Then the system attempts to fetch weather data again
    And if successful, updates widget and clears error
    And if failed again, shows error message and schedules retry

  Scenario: Persistent error state
    Given weather fetch has failed 5 times consecutively
    And exponential backoff has reached maximum
    When the next retry also fails
    Then the widget displays a persistent error state
    And message "Weather service unavailable. Please try again later"
    And cached data is shown if available
    And user can manually retry at any time
```

For devs:

```gherkin
@weather
#noinspection CucumberUndefinedStep
Feature: Error handling
  In order to monitor and track errors with weather API
  As a Developer
  I want to log error details for debugging and monitoring

  Scenario: Error logging for debugging
    Given a weather fetch error occurs
    When the error is handled
    Then the error is logged with:
      | Timestamp |
      | Error type (Network, API, Configuration, Rate Limit) | 
      | Error details (status code, message) |
      | Location being fetched |
      | User context (userId, widgetId) |
    And logs are available for debugging and monitoring
```
