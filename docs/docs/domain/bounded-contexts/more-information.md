---
sidebar_position: 10
---

# More information

## Context map diagram

The following diagram illustrates the relationships between bounded contexts and their integration patterns.

![image](./context-map.svg)

## Integration patterns

### Customer-Supplier

**Dashboard Management ↔ Widget contexts**

The Dashboard Management context is the customer, depending on widget contexts to supply data. The supplier contexts
(Bookmarks, Tasks, Calendar, Weather) expose well-defined APIs and publish events that the Dashboard context consumes.
Suppliers prioritize customer needs in their API design.

**Dashboard Management ↔ Preferences**

Dashboard Management consumes preference data to apply themes, locale, and defaults. Preferences context supplies this
data with a stable API.

### Conformist

**Core and Widget Contexts ↔ User Identity**

All contexts conform to the User Identity context's user model. The Identity context is foundational and does not adapt
to other contexts' needs. Each context accepts the `UserId` as provided.

**Widget Contexts ↔ Preferences**

Widget contexts conform to the Preferences context for cross-cutting settings like units, timezone, and theme. They
accept preference values without negotiation.

### Partnership

**Tasks ↔ Calendar**

These contexts have a collaborative relationship. Tasks can request event creation in Calendar, and both contexts
coordinate to maintain consistency. This is a mutual relationship where both parties adapt to each other's needs.

### Anti-Corruption Layer (ACL)

**Weather ↔ Weather Provider API**

The Weather context uses an ACL to protect itself from changes in the external weather API. The ACL translates external
API responses into domain-specific weather snapshots, preventing external model pollution.

### Published language

**Synchronization ↔ Core, Bookmarks, Tasks and Calendar Contexts**

Synchronization uses a published language (domain events) to understand changes across all contexts. Contexts publish
events in a standardized format, and Sync subscribes without direct coupling.

### Shared kernel

**User Identity ↔ Preferences**

These two contexts share a small, common model (`UserId` and basic user information). Changes to the shared kernel
require coordination between both contexts.

## Context isolation and communication

### Synchronous communication

- Dashboard Management → Widget Contexts: REST/GraphQL API calls for queries
- Widget Contexts → Dashboard Management: API responses

### Asynchronous communication

- All Contexts → Synchronization: Domain events via message bus
- Tasks → Calendar: Event creation requests via domain events
- Preferences → All Contexts: Preference change notifications via events

### Data ownership

- Each context owns its data and exposes it only through APIs or events
- No direct database access between contexts
- Shared data (e.g., `UserId`) is replicated and kept consistent via events

## Evolution and future considerations

### Potential context splits

- **Dashboard Management:** May split into "Dashboard Composition" and "Layout Engine" if complexity grows
- **Tasks:** Could evolve into a more comprehensive "Project Management" context

### Potential context merges

- **User Identity + Preferences:** Could merge if preferences remain simple

### Future external integrations

- **Calendar:** Third-party calendars (Google Calendar, Outlook)
- **Tasks:** Third-party task management tools (Notion, Todoist, Evernote)
- **Identity:** OAuth providers (Google, Meta, Apple, Microsoft)

## Summary

This bounded context design aligns with our strategic domain classification:

- **Core** (Dashboard Management): Most design rigor and business differentiation
- **Supporting** (Bookmarks, Tasks, Calendar, Weather): Simple, cohesive CRUD with clear boundaries
- **Generic** (Identity, Preferences, Sync): Commodity, reusable patterns

Now, each context has clear responsibilities, well-defined boundaries, and explicit integration patterns. This sets the
foundation not only for requirement gathering but also for architecture and detailed design phases.
