---
sidebar_position: 6
---

import PriorityLabel from "../../../src/components/PriorityLabel";

# Maintainability

## NFR-MAI-001: Code quality

**Priority:** <PriorityLabel priority="Must Have"/>

**Description:**
The codebase shall maintain high-quality standards with linting, formatting, code analysis, and code review processes.

**Rationale:**
High code quality demonstrates professional development practices, improves maintainability, and reduces technical debt.

**Measurement:**

- SonarQube/SonarCloud quality gate passes
- Zero critical code smells
- Linting and formatting checks pass

**Acceptance criteria:**

- ESLint/TSLint configured for frontend
- Prettier configured for consistent formatting
- No critical SonarQube issues
- Code complexity metrics are acceptable (cyclomatic complexity < 15)
- Consistent code formatting (Prettier enforced in CI/CD)
- Code reviews are required for all changes (if collaborative)
- No commented-out code or TODOs in the `master` branch

**Affected components:**

- Entire codebase (frontend, backend, infrastructure)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-004 (Scalability and
  Maintainability)
- Functional Requirements: All features

**Testing approach:**

- SonarQube/SonarCloud analysis in CI/CD
- Linting and formatting checks in CI/CD
- Code review process (if applicable)

**Trade-offs:**

- Strict linting may slow development initially
- Code reviews add process overhead but improve quality

**Open questions:**

- None

## NFR-MAI-002: Test coverage

**Priority:** <PriorityLabel priority="Must Have"/>

**Description:**
The codebase shall maintain at least 80% test coverage across unit, integration, and end-to-end tests to ensure
reliability and enable confident refactoring.

**Rationale:**
High test coverage reduces bugs, enables confident refactoring, and demonstrates professional testing practices
(TDD/BDD).

**Measurement:**

- Overall test coverage > 80%
- Unit test coverage > 80%
- Critical paths covered by E2E tests

**Acceptance criteria:**

- Unit tests for business logic (80%+ coverage)
- Integration tests for APIs (critical endpoints)
- E2E tests for critical flows (user journeys)
- Coverage reports generated (JaCoCo for backend, Jest/Istanbul for frontend)
- Failed tests block deployment (CI/CD gating)
- Flaky tests identified and fixed
- Test documentation (how to run, how to write)

**Affected components:**

- Entire codebase (frontend, backend)
- Test infrastructure

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-004 (Scalability and
  Maintainability)
- Functional Requirements: All features

**Testing approach:**

- Unit testing with Jest (frontend), JUnit/Mockito (backend)
- Integration testing with Spring Test
- E2E testing with Playwright or Cypress
- Coverage tracking in CI/CD

**Trade-offs:**

- High test coverage requires time investment
- Test maintenance adds overhead

**Open questions:**

- None

## NFR-MAI-003: Documentation

**Priority:** <PriorityLabel priority="Must Have"/>

**Description:**
The code and system shall be well-documented with README files, API documentation, inline comments, architecture
diagrams, and setup instructions.

**Rationale:**
Comprehensive documentation demonstrates professionalism, aids portfolio reviewers, and enables future maintenance or
contributions.

**Measurement:**

- All modules have README files
- API documentation complete (Swagger/OpenAPI)
- Architecture documentation complete (SAD)

**Acceptance criteria:**

- README files for each module (purpose, setup, usage)
- API documentation (Swagger/OpenAPI) for all endpoints
- Inline code comments for complex logic
- Architecture diagrams (C4 model: context, container, component)
- Setup instructions (how to run locally)
- Deployment documentation
- Troubleshooting guide

**Affected components:**

- Entire project (code, documentation site)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-006 (Developer Experience)
- Functional Requirements: All features

**Testing approach:**

- Documentation review
- Setup instructions verification (fresh environment)
- API documentation accuracy verification

**Trade-offs:**

- Documentation requires ongoing maintenance
- Risk of documentation drift from code

**Open questions:**

- None

## NFR-MAI-004: Modularity

**Priority:** <PriorityLabel priority="Should Have"/>

**Description:**
The codebase shall be modular and loosely coupled with clear bounded context separation, enabling independent
development and testing.

**Rationale:**
Modularity improves maintainability, testability, and enables parallel development (if needed). It demonstrates
understanding of DDD and clean architecture.

**Measurement:**

- Clear module boundaries
- Low coupling between modules
- High cohesion within modules

**Acceptance criteria:**

- Clear module boundaries (bounded contexts: BKM, TSK, WEA, CAL, DAS, PRE, UID)
- Dependency injection used throughout
- Feature-based folder structure
- Minimal circular dependencies (checked with tools)
- Reusable components and services
- Each bounded context can be understood independently

**Affected components:**

- Entire codebase (frontend, backend)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-004 (Scalability and
  Maintainability)
- Functional Requirements: All features

**Testing approach:**

- Architecture compliance testing
- Dependency analysis (circular dependency detection)
- Module isolation testing

**Trade-offs:**

- Modularity adds initial complexity
- Strict boundaries may require more interfaces/abstractions

**Open questions:**

- None

## NFR-MAI-005: Version control

**Priority:** <PriorityLabel priority="Must Have"/>

**Description:**
The project shall follow Git best practices with meaningful commit messages, feature branches, pull requests, and no
secrets in the repository.

**Rationale:**
Proper version control demonstrates professional development practices and enables collaboration, code review, and
project history tracking.

**Measurement:**

- Commit message quality
- Branch strategy followed
- No secrets detected in the repository

**Acceptance criteria:**

- Meaningful commit messages (conventional commits preferred)
- Feature branches for all changes
- Pull request reviews (if collaborative)
- No secrets in the repository (API keys, passwords)
- .gitignore properly configured
- Clean commit history (no "WIP" or "test" commits in master)

**Affected components:**

- Entire project (Git repository)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-006 (Developer Experience)
- Functional Requirements: All features

**Testing approach:**

- Secret scanning (git-secrets, TruffleHog)
- Commit message linting (https://commitlint.js.org)
- Branch protection rules

**Trade-offs:**

- Strict commit message rules may slow commits
- Feature branches add process overhead

**Open questions:**

- None
