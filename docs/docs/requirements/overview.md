---
sidebar_position: 1
title: Requirements overview
slug: overview
---

# Requirements Overview

This section contains the complete requirements documentation for the Browser Dashboard PWA project.

## Purpose

This documentation establishes the project requirements and provides a detailed description of the project's features
and functionality.

## Audience

Just like the DMD, this documentation is intended first and foremost for developers. Which right now means just me, but
could potentially include future contributors. By documenting the requirements and transforming them into a testable
specification, we can ensure that the project is built correctly and that every implementation meets the requirements.

And, again, like the DMD, this documentation is also intended for recruiters and potential employers. By providing
a detailed description of the project's features and functionality in the form of user stories, they can evaluate my
ability to transform requirements into a testable specification that can be read by a non-technical audience.

Finally, I doubt that other stakeholders (such as end users) will find this documentation useful. End users would only
actually care about the features and functionality of the project, not the technical details behind it.

:::info
With 'contributors' I'm not just referring to developers, but also other roles like product managers, QA engineers,
cyber-security experts, etc. that could potentially want to mentor me in the project, finding areas of improvement
within their expertise, mistakes or bugs I've made, etc.
:::

## Scope

This document covers the requirements for the Browser Dashboard PWA project. This isn't limited to the functional
requirements but also includes non-functional requirements, and business requirements, as well as mapping the
functional requirements into user stories. For these, the language of choice is **Gherkin** with **English** as the
natural language.

The content is limited to these requirements and their mapping into a complete specification; implementation and
technical details are addressed in later sections.

## Document Structure

The requirements are organized into the following sections:

- **[Business Requirements](business-requirements)**: High-level business objectives
- **[Functional Requirements](functional-requirements)**: Detailed feature specifications
- **[Non-Functional Requirements](non-functional-requirements)**: Quality attributes and constraints
- **[User Stories](user-stories)**: User-centric requirement descriptions
- **[System Requirements](system-requirements)**: Technical prerequisites and dependencies

## Project Modules

The Browser Dashboard consists of four primary modules:

1. **Bookmarks**: Visual bookmark management with links and folders
2. **Task List**: Simple task management with CRUD operations
3. **Weather**: Real-time weather information from external APIs
4. **Calendar**: Event management with task list integration

## Documentation standards

The documentation will try to follow
the [ISO/IEC/IEEE 29148:2011 standard](https://raw.githubusercontent.com/Orthant/IEEE/master/29148-2011.pdf) as much
as possible. Even though this standard has been withdrawn in favor of the 2018 standard, it is still a good reference
and offers relevant guidelines.

- [Progressive Web Apps (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [IEEE 830-1998 - Software Requirements Specification](https://standards.ieee.org/standard/830-1998.html)
- [MoSCoW Prioritization Method](https://en.wikipedia.org/wiki/MoSCoW_method)

### Requirement Numbering

Requirements are numbered using the following format:

- **BR-XXX**: Business Requirements
- **FR-XXX**: Functional Requirements
- **NFR-XXX**: Non-Functional Requirements
- **SR-XXX**: System Requirements

### Priority Levels

- **Must Have**: Critical for MVP, project fails without it
- **Should Have**: Important but not critical, can be workarounds
- **Could Have**: Desirable but not necessary, nice to have
- **Won't Have**: Explicitly out of scope for this release
