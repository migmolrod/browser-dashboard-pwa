---
sidebar_position: 1
---

# Business & domain overview

This section contains our domain exploration and modeling.

## Purpose

This documentation contextualizes the domain and the business needs so that the different stakeholders have a solid
grounding to understand the next parts of the documentation (requirements, architecture, etc.).

## Audience

This documentation is intended in the first place for the architect, developer and designer of the project. That is me,
[Miguel Molinero](https://github.com/migmolrod). Potential future contributors could also benefit from this
documentation.

It will also be useful for recruiters and talent acquisition teams. The idea is they can get a grasp of my skills and
experience in several areas of software engineering. In this case, the domain modeling part.

I don't think any part of the documentation will be useful for anyone else. For example, end users wouldn't care about
the technical details of the project. In all likelihood, they would just want to know what the product does and how it
works (i.e., user guides or manuals). End users could be considered as stakeholders up to some point, but I don't think
they should be the main focus of this documentation.

:::note
With 'contributors' I'm not just referring to developers, but also other roles like product managers, QA engineers,
cyber-security experts, etc. that could potentially want to mentor me in the project, finding areas of improvement
within their expertise, mistakes or bugs I've made, etc.
:::

## Scope

This document focuses on the domain modeling of a personal, portfolio-oriented project — a fictional product called
"**Browser Dashboard PWA**." It is not intended for real-world deployment but rather to illustrate the analysis and
design process. The content is limited to the domain and business perspective; implementation and technical details are
addressed in later sections.

## Document structure

This domain exploration and modeling are organized into the following sections:

- **[Vision & Business Goals](business-vision):** Short narrative of what problem we are trying to solve.
- **[Core Domain Concepts](core-domain-concepts):** Overview of the core, supporting and generic subdomains.
- **[Domain Glossary](ubiquitous-language):** Shared vocabulary, acts as the "Rosetta Stone" for developers, PMs,
  documentations, QA, etc. so they all understand the same terms for a given context.
- **[Bounded Contexts](bounded-contexts/overview):** Definitions of each bounded context, their purpose, and the
  *context map* (how they interact with each other).
- **[Business Processes and Workflows](process-workflows):** Definitions of domain processes and workflows.

## Document standards

This piece of documentation will be inspired by _Domain-Driven Design_ (Evans, 2003).

It will be written in a clear and concise manner, with a focus on bridging the gap between the technical and business
world, creating a coherent domain model common to all stakeholders.
