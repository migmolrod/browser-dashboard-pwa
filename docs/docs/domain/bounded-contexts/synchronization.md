---
sidebar_position: 9
---

# Synchronization (Generic)

## Context Summary

- Code: `SYN`
- Mission: Provide local‑first persistence with reliable background synchronization to optional cloud storage.
- Scope: Persist data locally; detect and queue changes; sync to/from cloud when available; basic conflict
  detection/resolution; offline readiness.
- Out of Scope: Complex CRDT/merging strategies; cross‑service transactional guarantees.

## Ownership

- Platform/Infrastructure team

## Domain Model

- Aggregates
    - SyncState (root): per-entity sync metadata (version/etag, lastSyncedAt, pending ops)
- Key invariants
    - SyncState must reference a valid entity
    - Conflict resolution must be deterministic for a given policy

## Capabilities

- Commands: TriggerSync, ResolveConflict
- Queries: GetSyncStatus
- Policies/Rules: background/interval sync; retry with exponential backoff; last‑write‑wins (MVP) with pluggable
  strategies later

**Key Aggregates**:

- `SyncState` (root): Tracks synchronization status per entity

**Published Events**:

- `DataSynchronized`
- `SyncConflictDetected`
- `SyncFailed`

**Consumed Events**:

- All domain events from other contexts (to trigger sync)

**Exposed APIs**:

- Commands: `TriggerSync`, `ResolveConflict`
- Queries: `GetSyncStatus`

**Dependencies**:

- All contexts (to sync their data)
- External cloud storage (if configured)

**Boundaries**:

- **In scope**: Local persistence, sync orchestration, conflict detection
- **Out of scope**: Complex CRDT-based resolution (simple last-write-wins in MVP)

**Invariants**:

- Sync state must reference a valid entity
- Consistency: eventual across local/cloud; strong consistency is not guaranteed
- Versioning: event schemas evolve additively; remote adapter versioned separately

## Risks & Evolution (optional)

- Risk: data divergence during extended offline periods—mitigate with clear conflict policy and user feedback
- Possible evolution: per‑field merges/CRDTs; selective sync scopes; bandwidth‑aware scheduling
