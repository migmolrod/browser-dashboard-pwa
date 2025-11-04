---
sidebar_position: 7
---

# User Identity (Generic)

## Context Summary

- Mission: Provide foundational user identification, authentication, and session management.
- Scope: Register/login/logout; user lookup; session lifecycle; minimal authorization hooks for downstream scoping.
- Out of Scope: OAuth/Social login, MFA, advanced authorization (RBAC/ABAC), account recovery flows.

## Ownership

- Platform/Infrastructure team

## Domain Model

- Aggregates
    - User (root): username, credentials, basic profile identifiers
    - Session (optional): session/token metadata and lifecycle
- Key invariants
    - Username must be unique
    - User must have valid credentials (per selected auth scheme)
    - Active sessions must reference a valid User

## Capabilities

- Commands: RegisterUser, LoginUser, LogoutUser, DeleteUser
- Queries: GetUserById, GetUserByUsername, GetActiveSessionsByUser (optional)
- Policies/Rules: password policy (length/complexity); lockout/backoff policy (optional); session expiry/rotation

## Events

- Published: UserRegistered, UserLoggedIn, UserLoggedOut, UserDeleted
- Consumed: None (foundational)

## Integration & Dependencies

- Downstream (Conformist): All contexts accept UserId as provided
- Lateral (Shared Kernel): Preferences shares minimal identifiers (UserId)
- Notes: Acts as a system-of-record for identity; downstream contexts must not store credentials

## Contract & SLA (optional)

- Consistency: strong for identity and session mutations
- Versioning: additive changes to user read models; event versioning for identity lifecycle

## Risks & Evolution (optional)

- Risk: expanding into full IAM—constrain scope and defer to external IdP when needed
- Possible evolution: OAuth/OIDC integration; MFA; password reset/recovery flows
