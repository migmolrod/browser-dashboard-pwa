---
sidebar_position: 1
---

# Overview

This section defines the bounded contexts identified in the Browser Dashboard PWA system, expanding the information
already provided in the [core domain concepts](../core-domain-concepts) document.

## List of contexts

### Core context

1. **[Dashboard Management](./dashboard-management)**

### Supporting contexts

1. **[Bookmarks](./bookmarks)**
2. **[Tasks](./tasks)**
3. **[Calendar](./calendar)**
4. **[Weather](./weather)**

### Generic contexts

1. **[User Identity](./user-identity)**
2. **[Preferences](./preferences)**
3. **[Synchronization](./synchronization)**

## Structure

In the following sections of the documentation, we will define each bounded context separately, each one in its own
piece of documentation, to improve legibility.

Each bounded context will follow this structure:

- **Context Summary**
    - Mission: One-sentence reason this context exists (the “why”).
    - Scope: What the context owns and does, at a high level (the “what”).
    - Out of Scope: Explicit exclusions to avoid ambiguity (the “what not”).
- **Ownership**
    - Team and decision owner.
- **Domain Model**
    - Aggregates and roots: brief bullets.
    - Key invariants: enforceable rules tied to aggregates.
- **Capabilities**
    - Commands: write-side operations exposed.
    - Queries: read-side operations exposed.
    - Policies/Rules: cross-cutting business policies not captured as invariants (e.g., layout rules).
- **Events**
    - Published
    - Consumed (optional): Note purpose/reaction in brief parentheses only where non-obvious.
- **Integration & Dependencies**
    - Upstream/Downstream contexts with a relationship type (Customer-Supplier, Conformist, etc.).
    - External systems and ACLs, if any. Keep this as the single place to talk about dependencies (removes duplication
      with “Dependencies” scattered elsewhere).

### Optional sections

- **Contract & SLA** (optional for core contexts)
    - Consistency expectations (strong/eventual).
    - Latency/availability assumptions.
    - Versioning approach for APIs/events.
- **Risks & Evolution** (optional)
    - Known hotspots and likely splits/merges.
