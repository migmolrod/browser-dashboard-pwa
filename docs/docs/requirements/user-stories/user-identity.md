---
sidebar_position: 6
---

# User Identity

## FR-UID-001: User registration

User stories FR-UID-001-001/002/003/004/005/006/007/008

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: User registration
  In order to start using the application
  As a User
  I want to register as a new user

  Scenario: Register with valid credentials ("happy path")
    Given a user is on the registration page
    When the user enters username "john_doe"
    And enters email "john@example.com"
    And enters password "SecurePass123"
    And confirms password "SecurePass123"
    And submits the registration form
    Then a new User aggregate is created
    And the password is hashed using bcrypt
    And credentials are stored securely
    And a UserRegistered event is published
    And the user is automatically logged in
    And redirected to the dashboard

  Scenario: Reject duplicate username
    Given a user "alice_smith" already exists
    When a new user attempts to register with username "alice_smith"
    And enters email "alice2@example.com"
    And enters password "SecurePass123"
    And submits the registration form
    Then validation fails
    And a generic error message indicates "Could not create user"
    And the user is not created
    And no UserRegistered event is published

  Scenario: Reject duplicate email
    Given a user with email "john@example.com" already exists
    When a new user attempts to register with different username
    But same email "john@example.com"
    And submits the registration form
    Then validation fails
    And an error message indicates "Email already registered"
    And the user is not created
    And no UserRegistered event is published

  Scenario: Reject invalid password (too short)
    Given a user is registering
    When the user enters password "Pass1" (only 5 characters)
    And submits the registration form
    Then validation fails
    And an error message indicates "Password must be at least 8 characters"
    And the user is not created

  Scenario: Reject invalid password (missing complexity)
    Given a user is registering
    When the user enters password "password123" (no uppercase)
    And submits the registration form
    Then validation fails
    And an error message indicates "Password must contain uppercase, lowercase, and digit"
    And the user is not created

  Scenario: Password confirmation mismatch
    Given a user is registering
    When the user enters password "SecurePass123"
    And confirms with "SecurePass456" (different)
    And submits the registration form
    Then validation fails
    And an error message indicates "Passwords do not match"
    And the user is not created

  Scenario: Invalid email format
    Given a user is registering
    When the user enters email "invalid-email" (no @ or domain)
    And submits the registration form
    Then validation fails
    And an error message indicates "Invalid email format"
    And the user is not created

  Scenario: Username with invalid characters
    Given a user is registering
    When the user enters username "john@doe!" (contains @ and !)
    And submits the registration form
    Then validation fails
    And an error message indicates "Username can only contain letters, numbers, underscore, and hyphen"
    And the user is not created
```

## FR-UID-002: User authentication

User stories FR-UID-002-001/002/003/004/005/006/007/008

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: User authentication
  In order to start a session within the application
  As a User
  I want to log in into the application

  Scenario: Login with valid credentials ("happy path")
    Given a user "john_doe" is registered
    When the user navigates to the login page
    And enters username "john_doe"
    And enters password "SecurePass123"
    And submits the login form
    Then the password is verified against stored hash
    And authentication succeeds
    And a session is created with unique session token
    And a UserLoggedIn event is published
    And the user is redirected to the dashboard
    And session token is stored in HTTP-only cookie

  Scenario: Login with email instead of username
    Given a user is registered with email "john@example.com"
    When the user enters email "john@example.com"
    And enters correct password
    And submits the login form
    Then authentication succeeds
    And the user is logged in
    And a UserLoggedIn event is published

  Scenario: Reject invalid password
    Given a user "john_doe" is registered
    When the user enters username "john_doe"
    And enters incorrect password "WrongPass456"
    And submits the login form
    Then authentication fails
    And an error message "Invalid username or password" is displayed
    And failed attempt is logged
    And no session is created
    And no UserLoggedIn event is published

  Scenario: Generic error for non-existent user
    Given no user exists with username "unknown_user"
    When the user attempts to login with "unknown_user"
    And enters any password
    And submits the login form
    Then authentication fails
    And the same error message "Invalid username or password" is displayed
    And no distinction is made between invalid username vs. password
    And failed attempt is logged

  Scenario: Account lockout after failed attempts
    Given a user "john_doe" is registered
    And the user has made 4 failed login attempts
    When the user makes a 5th failed login attempt
    Then authentication fails
    And the account is locked for 15 minutes
    And an error message "Account temporarily locked. Please try again in 15 minutes" is displayed
    And the lockout is logged for security monitoring

  Scenario: Successful login resets failed attempt counter
    Given a user "john_doe" has made 3 failed login attempts
    When the user successfully logs in with correct password
    Then authentication succeeds
    And the failed attempt counter is reset to 0
    And the user can continue normally

  Scenario: Login attempt during the lockout period
    Given a user "john_doe" is locked out due to failed attempts
    And the lockout period has not expired
    When the user attempts to login with correct password
    Then authentication is denied
    And an error message "Account temporarily locked" is displayed
    And no session is created

  Scenario: Login after the lockout period expires
    Given a user "john_doe" was locked out
    And the 15-minute lockout period has expired
    When the user attempts to login with correct password
    Then authentication succeeds
    And the lockout is lifted
    And the user is logged in normally
```

## FR-UID-003: Session management

User stories FR-UID-003-001/002/003/004/005/006/007

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: Session management
  In order to maintain user identity state across requests
  As a Developer
  I want the system to handle user sessions

  Scenario: Create a session on login
    Given the user successfully logs in
    When authentication completes
    Then a new authenticated session is established
    And a session identifier is returned to the client

  Scenario: Validate session on protected request
    Given the user has an active session
    When the user accesses a protected resource
    Then the system validates the session
    And authorizes access if valid

  Scenario: Inactivity expiration
    Given the session has been inactive beyond the configured timeout
    When the user attempts to make a request
    Then the session is considered expired
    And the system returns 401 Unauthorized

  Scenario: Absolute expiration
    Given the session has exceeded its maximum allowed lifetime
    When the user attempts to make a request
    Then the session is considered expired
    And the system returns 401 Unauthorized

  Scenario: Logout
    Given the user is authenticated
    When the user initiates logout
    Then the active session is terminated
    And a UserLoggedOut event is emitted

  Scenario: Concurrent sessions
    Given the user logs in from multiple devices
    Then each login establishes an independent session
    And terminating one session does not affect others

  Scenario: Session renewal on activity
    Given the user interacts with the system before inactivity timeout
    When a valid request is made
    Then the session remains active
```

## FR-UID-004: User profile management

User stories FR-UID-004-001/002/003/004/005/006

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: User profile management
  In order to manage my user profile
  As a User
  I want to view and update basic profile information

  Scenario: View user profile ("happy path")
    Given a user is authenticated
    When the user navigates to profile settings
    Then the profile page displays current username
    And displays current email
    And displays current display name (if set)
    And displays account creation date
    And displays last login date

  Scenario: Update display name
    Given a user is viewing their profile
    When the user changes display name from "John" to "John Doe"
    And saves changes
    Then the display name is updated to "John Doe"
    And a UserUpdated event is published
    And a success message "Profile updated successfully" is displayed
    And the new display name appears throughout the application

  Scenario: Update email with validation
    Given a user is viewing their profile
    When the user changes email from "john@example.com" to "john.doe@example.com"
    And the new email is unique
    And saves changes
    Then the email is validated for format
    And checked for uniqueness
    And updated to "john.doe@example.com"
    And a UserUpdated event is published

  Scenario: Reject duplicate email
    Given another user already has email "alice@example.com"
    When the current user attempts to change email to "alice@example.com"
    And saves changes
    Then validation fails
    And an error message "Email already in use" is displayed
    And the email is not updated

  Scenario: Update username with validation
    Given a user's current username is "john_doe"
    When the user changes username to "john_d"
    And the new username is unique
    And saves changes
    Then the username is validated for format and uniqueness
    And updated to "john_d"
    And a UserUpdated event is published
    And the user remains logged in

  Scenario: Cancel profile changes
    Given a user has made changes to profile
    When the user clicks "Cancel"
    Then changes are discarded
    And profile reverts to previous values
    And no UserUpdated event is published
```

## FR-UID-005: Password management

User stories FR-UID-005-001/002/003/004/005/006

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: Password management
  In order to enhance the security of my account and update compromised credentials
  As a User
  I want to change my password

  Scenario: Change password successfully ("happy path")
    Given a user is authenticated
    When the user navigates to password change form
    And enters current password "OldPass123"
    And enters new password "NewSecurePass456"
    And confirms new password "NewSecurePass456"
    And submits the form
    Then current password is verified
    And new password is validated for complexity
    And new password hash is generated
    And password is updated in storage
    And a PasswordChanged event is published
    And a success message "Password changed successfully" is displayed

  Scenario: Reject incorrect current password
    Given a user is changing password
    When the user enters incorrect current password
    And enters valid new password
    And submits the form
    Then current password verification fails
    And an error message "Current password is incorrect" is displayed
    And the password is not changed

  Scenario: Reject weak new password
    Given a user is changing password
    When the user enters correct current password
    And enters weak new password "pass123" (no uppercase)
    And submits the form
    Then password complexity validation fails
    And an error message "Password must contain uppercase, lowercase, and digit" is displayed
    And the password is not changed

  Scenario: Reject same password
    Given a user is changing password
    When the user enters current password "SecurePass123"
    And enters new password "SecurePass123" (same)
    And submits the form
    Then validation fails
    And an error message "New password must be different from current password" is displayed
    And the password is not changed

  Scenario: Password confirmation mismatch
    Given a user is changing password
    When the user enters valid current password
    And enters new password "NewPass123"
    And confirms with "NewPass456" (different)
    And submits the form
    Then validation fails
    And an error message "Passwords do not match" is displayed
    And the password is not changed

  Scenario: Invalidate other sessions after password change
    Given a user has 3 active sessions (desktop, mobile, tablet)
    When the user changes password from desktop session
    Then the password is changed successfully
    And all sessions except current (desktop) are invalidated
    And mobile and tablet devices are logged out
    And must re-authenticate with new password
```

## FR-UID-006: Account deletion

User stories FR-UID-006-001/002/003/004/005/006

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: Account deletion
  In order to control my data
  As a User
  I want to delete my account permanently

  Scenario: Delete an account successfully ("happy path")
    Given a user is authenticated
    When the user navigates to account settings
    And clicks "Delete Account"
    Then a confirmation dialog appears
    And warns "This action is permanent and cannot be undone"
    And the user enters password for confirmation
    And confirms deletion
    Then the password is verified
    And the user account is deleted
    And a UserDeleted event is published
    And the user is logged out
    And all sessions are invalidated
    And the user is redirected to goodbye page

  Scenario: Reject deletion with an incorrect password
    Given a user is attempting to delete account
    When the user enters incorrect password in confirmation dialog
    And confirms deletion
    Then password verification fails
    And an error message "Incorrect password" is displayed
    And account deletion is aborted
    And the user remains logged in

  Scenario: Cancel account deletion
    Given a user has opened account deletion confirmation dialog
    When the user clicks "Cancel"
    Then the dialog is closed
    And no account deletion occurs
    And no UserDeleted event is published
    And the user remains logged in

  Scenario: Cannot log in after deletion
    Given a user has deleted their account
    When the user attempts to log in with previous credentials
    Then authentication fails
    And an error message "Invalid username or password" is displayed
    And no session is created

  Scenario: Cascading deletion across contexts
    Given a user has data in multiple contexts (dashboards, tasks, bookmarks, calendar)
    When the user deletes their account
    Then a UserDeleted event is published
    And Dashboard Management context deletes all dashboards
    And Tasks context deletes all tasks
    And Bookmarks context deletes all bookmarks
    And Calendar context deletes all events
    And all user-related data is removed from the system

  Scenario: Account deletion is logged
    Given a user deletes their account
    When deletion completes
    Then the deletion is logged with:
      | Timestamp  |
      | UserId     |
      | Username   |
      | Email      |
      | IP address |
    And the log is retained for audit purposes
```

## FR-UID-007: Security policies

User stories FR-UID-007-001/002/003/004/005/006/007/008

```gherkin
@userid
#noinspection CucumberUndefinedStep
Feature: Security policies
  In order to prevent unauthorized access and protect user accounts
  As a Developer
  I want the system to enforce security policies

  Scenario: Enforce password complexity on registration
    Given a user is registering
    When the user enters password "simple"
    And submits registration form
    Then password complexity validation fails
    And an error lists requirements: "min 8 chars, uppercase, lowercase, digit"
    And registration is rejected

  Scenario: Enforce account lockout after failed logins
    Given a user makes 5 consecutive failed login attempts
    When the 5th attempt fails
    Then the account is locked for 15 minutes
    And an error message "Account locked. Try again in 15 minutes" is displayed
    And the lockout is logged

  Scenario: Enforce session inactivity timeout
    Given a user has been inactive for 30 minutes
    When the user makes a request
    Then the session is expired
    And 401 Unauthorized is returned
    And the user must log in again

  Scenario: Enforce session absolute timeout
    Given a user's session was created 24 hours ago
    When the user makes a request
    Then the session is expired
    And 401 Unauthorized is returned
    And the user must log in again

  Scenario: Password hashing with bcrypt
    Given a user registers or changes password
    When the password is stored
    Then bcrypt is used with cost factor 12
    And the password hash is stored (not plaintext)
    And the hash is verifiable but not reversible

  Scenario: Secure session token generation
    Given a user logs in
    When a session token is generated
    Then a cryptographically secure random generator is used
    And the token has at least 32 bytes of entropy
    And the token is unpredictable

  Scenario: Audit logging for security events
    Given a security event occurs (login, logout, password change, deletion)
    When the event completes
    Then an audit log entry is created with:
      | Timestamp              |
      | Event type             |
      | UserId                 |
      | IP address             |
      | User agent             |
      | Success/failure status |
    And the log is persisted for compliance

  Scenario: Configurable security policies
    Given security policies are defined in configuration
    When the system starts
    Then policies are loaded from environment variables:
      | PASSWORD_MIN_LENGTH=8         |
      | LOCKOUT_ATTEMPTS=5            |
      | LOCKOUT_DURATION_MINUTES=15   |
      | SESSION_INACTIVITY_MINUTES=30 |
      | SESSION_ABSOLUTE_HOURS=24     |
    And policies are enforced according to configuration
```
