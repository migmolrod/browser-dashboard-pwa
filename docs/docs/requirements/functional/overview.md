---
sidebar_position: 1
---

# Overview

This section covers the functional requirements of the system following the Behavior-Driven Development (BDD)
methodology. We organize requirements and BDD artifacts by Domain-Driven Design (DDD) bounded contexts defined in the
domain documentation (DMD).

## Organization and terminology

- Bounded Context: Primary container for related features. E.g., "User Identity context."
- Feature: Describes a coherent behavior within a bounded context, container for one or more scenarios. E.g., "User
  registration."
- Scenario: Concrete examples specifying behavior for a feature. E.g., "Successful registration with correct
  credentials."

## Documentation conventions

### Requirement numbering

Each feature will have this pattern FR-XXX-000. These are the rules for each segment of the code:

- `FR-` prefix (Functional Requirement).
- Followed by `XXX`, with XXX being the internal code of each bounded context, as defined in the DMD.
- `-000` suffix, with `000` being a three-digit number that identifies the feature within the type of requirement and
  bounded context.

Examples:

- For the "Task" bounded context, the naming of a feature could be FR-TSK-004
- For the "Identity" bounded context, the naming of a feature could be FR-UID-001
