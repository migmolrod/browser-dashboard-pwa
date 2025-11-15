---
sidebar_position: 2
---

# Templates

This is a set of templates for each requirement type.

## For Business Requirements

### Requirement template

```markdown
### BR-XXX: [Requirement Title]

**Priority:** [Must Have | Should Have | Could Have | Won't Have]

**Description:**
[Brief description of the business need or objective this requirement addresses]

**Rationale:**
[Why this requirement is important for the business]

**Success Criteria:**

- [Measurable criteria to determine if the requirement is met]
- [...]

**Related to:**

- Bounded Context: [context name from DMD]
- Strategic Goal: [reference to DMD business goals if applicable]

**Dependencies:**

- [Other BR, FR, or NFR codes this depends on]

**Acceptance Criteria:**

- [Specific, testable criteria]
- [...]
```

## For Functional Requirements (FR-XXX-000)

### Document Organization Structure

Functional requirements documents (like `dashboard-management.mdx`) should follow this structure:

```markdown
# [Bounded Context Name] - Functional Requirements

## Overview

[Brief introduction to this bounded context and its purpose]

**Bounded Context Code:** XXX
**Related DMD Section:** [link to DMD bounded context]

---

## Features Summary

| Feature Code | Feature Name | Priority    | Status |
|--------------|--------------|-------------|--------|
| FR-XXX-001   | [Name]       | Must Have   | Draft  |
| FR-XXX-002   | [Name]       | Should Have | Draft  |
| ...          | ...          | ...         | ...    |

---

## FR-XXX-001: [Feature Name]

[Full feature template as shown above]

---

## FR-XXX-002: [Feature Name]

[Full feature template as shown above]

---

## Cross-Feature Considerations

### Interactions Between Features

[How features in this context interact]

### Shared Business Rules

[Business rules that apply across multiple features]

### Data Consistency Requirements

[Any specific consistency needs]

---

## Traceability Matrix

| Feature    | Business Req | Domain Events   | User Stories   |
|------------|--------------|-----------------|----------------|
| FR-XXX-001 | BR-005       | BookmarkCreated | US-XXX-001-001 |
| ...        | ...          | ...             | ...            |

```

### Requirement template

```markdown
## [Feature Name]

### FR-XXX-000: [Feature Title]

**Priority:** [Must Have | Should Have | Could Have | Won't Have]

**Bounded Context:** [XXX - Context Name]

**Description:**
[Detailed description of what the system should do]

**Preconditions:**

- [Conditions that must be true before this feature can be used]
- [...]

**Postconditions:**

- [Expected system state after successful execution]
- [...]

**Business Rules:**

- [Domain rules that govern this feature]
- [...]

**User Roles:**

- [Which user roles can use this feature]

**Related to:**

- Business Requirements: [BR-XXX, ...]
- Domain Aggregates: [from DMD]
- Domain Events: [from DMD, if applicable]

**Dependencies:**

- [Other FR codes this depends on]

**Acceptance Criteria:**

- [Specific, testable criteria]
- [...]

**User Stories:**

- [US-XXX-000-001]: [link to user story]
- [...]

---

#### Scenarios

##### Scenario 1: [Scenario Name] (Happy Path)

**Given** [initial context and preconditions]\
**When** [action taken by user or system]\
**Then** [expected outcome]\
**And** [additional expected outcomes]

##### Scenario 2: [Alternative Scenario Name]

[Similar structure to Scenario 1]

##### Scenario 3: [Error/Edge Case Scenario Name]

[Similar structure to Scenario 1]

---

**Technical Notes:**

- [Any technical considerations, constraints, or implementation hints]
- [...]

**Open Questions:**

- [Any unresolved questions or areas needing clarification]
- [...]

```

## For Non-Functional Requirements (NFR-XXX)

```markdown
### NFR-XXX: [Requirement Title]

**Priority:** [Must Have | Should Have | Could Have | Won't Have]

**Category:
** [Performance | Scalability | Reliability | Security | Usability | Maintainability | Portability | Compliance]

**Description:**
[What quality attribute or constraint this requirement defines]

**Rationale:**
[Why this NFR is important]

**Measurement:**

- [Specific metrics and their target values]
- [How compliance will be measured]

**Acceptance Criteria:**

- [Specific, testable, measurable criteria]
- [Include tools, methods, or conditions for verification]
- [...]

**Affected Components:**

- [Which parts of the system this applies to]
- [Bounded contexts, services, or modules]

**Related to:**

- Business Requirements: [BR-XXX, ...]
- Functional Requirements: [FR-XXX-000, ...]

**Testing Approach:**

- [How this will be tested/verified]
- [Tools or frameworks to be used]

**Trade-offs:**

- [Any trade-offs or conflicts with other requirements]

**Open Questions:**

- [Any unresolved questions]
```

---

---

## Additional Recommendations

### 1. Scenario Naming Convention

For user stories/scenarios, consider: `US-XXX-000-001` where:

- `US-` prefix for User Story
- `XXX` = bounded context code
- `000` = feature number (matching FR)
- `001` = scenario number within that feature

### 2. Status Field

Consider adding a status field to track requirement maturity:

- **Draft:** Initial definition
- **Review:** Under stakeholder review
- **Approved:** Ready for implementation
- **Implemented:** Code complete
- **Verified:** Testing complete

### 3. Gherkin Guidelines

For your BDD scenarios:

- Use **Given-When-Then** consistently
- Each scenario should be independent
- Use **And** for multiple conditions of the same type
- Use **But** for negative conditions
- Keep scenarios focused on behavior, not implementation
