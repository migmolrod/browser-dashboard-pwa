---
sidebar_position: 3
---

# Bookmarks (Supporting)

## Context Summary

- Mission: Manage hierarchical bookmarks (folders and links) and quick‑access features like speed dial.
- Scope: CRUD for folders/bookmarks; nested hierarchy; reordering; pin/favorite management; data supply for dashboard
  widget(s).
- Out of Scope: Dashboard layout/personalization; advanced URL validation beyond basic format checks.

## Ownership

- Bookmarks team (primary developer).

## Domain Model

- Aggregates:
    - Folder (root): owns child folders and bookmarks.
    - Bookmark: link with title, URL, optional icon/thumbnail.
- Key invariants:
    - Each bookmark belongs to exactly one folder.
    - URLs must be valid and non‑empty.
    - Folder names must be unique within the same parent.
    - Cannot delete a folder with children (must be empty or cascade).

## Capabilities

- Commands: CreateFolder, RenameFolder, DeleteFolder, CreateBookmark, UpdateBookmark, DeleteBookmark, ReorderBookmarks,
  PinBookmark, UnpinBookmark.
- Queries: GetAllBookmarks, GetBookmarksByFolder, GetPinnedBookmarks, SearchBookmarks.
- Policies/Rules: maintain folder tree integrity; stable ordering within a folder; basic URL validation; pinning rules
  for speed dial.

## Events

- Published: FolderCreated, FolderRenamed, FolderDeleted, BookmarkCreated, BookmarkUpdated, BookmarkDeleted,
  BookmarkPinned, BookmarkUnpinned.
- Consumed: UserRegistered (initialize root folder), DashboardCreated (optional widget init), ProfileSwitched (optional
  widget/profile reactions).

## Integration & Dependencies

- Upstream (Conformist): User Identity (user model).
- Downstream (Customer–Supplier): Dashboard Management (supplies bookmark data for widgets).
- Upstream (Conformist): Preferences (read cross‑cutting settings if needed).
- Notes: Exposes read models for dashboard widgets; no responsibility for dashboard composition.

## Contract & SLA (optional)

- Consistency: strong for CRUD within the context; eventual for consumers via events.
- Versioning: additive changes to query responses; versioned event schemas.

## Risks & Evolution (optional)

- Risk: deep nesting and large trees impacting search/reorder—mitigate with pagination and index-friendly structures.
- Possible evolution: introduce Collections or Tags parallel to Folders if the user needs to outgrow the strict
  hierarchy.
