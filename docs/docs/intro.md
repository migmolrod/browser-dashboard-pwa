---
sidebar_position: 1
sidebar_label: Introduction
slug: /intro
---

# Introduction

Browser Dashboard PWA is a project that aims to create a Progressive Web Application (PWA) that will allow users to
have a centralized dashboard in their browser with different widgets. It's a personal project (not an actual commercial
product), and it primarily serves as a way to improve my portfolio with a real-world project.

## Prior decisions

Since the main goal of this whole project is to learn, practice and serve as an example in my portfolio, I have made
some decisions in different areas that I think are important to keep in mind. They result in a **completely
overengineered** solution, and I'm fully aware of it.

In any other scenario, one should probably aim at the most cost-effective solution, considering the client
constraints (budget, available infrastructure either on-demand or cloud-based, previous iterations of the software to be
developed if applicable, etc.). But the intention here was to show skills and proficiency in those overengineered
solutions that could be a better fit for a more complex, enterprise-grade system.

In conclusion, my idea was not to _vibe-code_ a quick MVP, but to create a complete solution that recruiters could find
interesting. And a solution that I could even use as a reference for future projects.

The main decisions I made are:

- I want to use **Domain-Driven Design** (DDD) as a way to translate a business problem into a software design, bridging
  the gap between those two worlds.
- I want to use **Ports and Adapters** pattern as a way to separate the domain from the infrastructure.
- I want to use **CQRS** as a way to separate the read and write models of the domain.
- I want to use **TDD** (test-driven development) as a way to develop the software.
- I want to use **Behavior-Driven Development** (BDD) as a way to translate requirements into code (software tests; yes,
  tests are also code).
- I want to use a **microservice** architecture as a way to separate the different bounded contexts of the domain.
- I want to use **Spring Boot** for backend and **Angular** for frontend since it's my current favorite stack of
  technologies and the one I know the best.
- I want to use **Docker** (docker-compose) as a way to run the application in a containerized environment.
- I want the documentation to **comply** with the **standards** of the industry whenever possible and in a sane way. I
  won't probably be able to make the documentation fully compliant with the standards. But I will try to make it as
  close as possible.
- I want to learn and use **C4 models** and **4+1 architectural view model** to document the project.
- I want to learn and use **Localstack** and **Terraform** as a way to create, provision and manage a local environment
  that emulates a real cloud environment (AWS).

## Standard reference and best practices

There are clear standards in the industry related to this documentation. For example, the **ISO/IEC/IEEE 29148:2018**
(about requirements engineering) and **ISO/IEC/IEEE 42010:2022** (about software architecture description). However,
due to the high cost of getting the latest version of these documents, we will use previous versions that, even though
already withdrawn from the standards, are probably still relevant and widely used in the industry.

The **SRS** document follows the guidelines of **ISO/IEC/IEEE 29148:2011 (Systems and software engineering — Life cycle
processes — Requirements engineering)**.

The **SAD** is based on **ISO/IEC/IEEE 42010:2021 (Systems and software engineering — Architecture description)**.

Another standard I would like to use is **ISO/IEC/IEEE 29119–3:2013 (Software and systems engineering — Software
testing)** as a guideline for documenting tests (since I want to use a TDD/BDD approach). Unfortunately, I could not
find a full version of the standard, even though it has already been withdrawn in favor of the 2021 version. So we will
have to improvise, use some common sense and tailor some custom guidelines to document the test-driven development
process.

## Documentation structure

This documentation will comprise the following documents:

- **[DMD](domain/overview)** (Domain Model Document). Here we will define the DDD strategic design, including the main
  business goals, a glossary of terms (ubiquitous language) and the bounded contexts.
- **[SRS](requirements/overview)** (Software Requirements Specification). Here we will define the requirements for the
  project, including functional and non-functional requirements. On the functional side, we will define user stories
  that can later be used to implement the project using Behavior Driven Development.
- **[SAD](architecture/overview)** (Software Architecture Document). Here we will define the high-level architecture of
  the project and divide the full system into subsystems or modules. This also includes the definition of which parts
  will be implemented using which technologies.
- **CDD** (Component Design Documents). Here, each one of the parts defined in the SAD document will be described in
  detail. This will include the implementation of each part using the technologies defined in the SAD document as well
  as additional details like patterns and best practices (per-module low-level architecture). These include DDD tactic
  patterns.

### Domain Model Document (DMD)

**Purpose**: Establish the **ubiquitous language**, **bounded contexts**, and **business understanding** — the
conceptual foundation of the system.

**Contents**:

- **Vision & Goals**: Why the system exists, key outcomes
- **Ubiquitous Language**: Shared vocabulary of domain terms
- **Bounded Contexts & Context Map**: Each context, their interfaces, integrations
- **Core Domains & Subdomains**: What parts are strategic vs. supporting
- **Business Processes**: BPMN or activity diagrams describing high-level workflows

**Corresponds to**: DDD Strategic Design phase\
**Feeds into**: SRS (requirements), SAD (architecture) and CDD (detailed component/module designs)\
**Standard**: _Domain-Driven Design_ (Evans, 2013)

### Software Requirements Specification (SRS)

**Purpose**: Define **what the system should do** — not how.

**Contents**:

- Scope & Overview
- Functional Requirements
    - Linked to bounded contexts from the DMD
- Non-functional Requirements
    - Performance, scalability, security, maintainability
- Use Cases / User Stories
- Acceptance Criteria
- System Constraints & Assumptions

**Corresponds to**: Requirements Engineering phase\
**Feeds into**: SAD for architectural decisions\
**Standard**: ISO/IEC/IEEE 29148:2011

### Software Architecture Document (SAD)

**Purpose**: Describe the **high-level system structure** and how the system meets requirements.

**Contents**: (mapped to C4 + 4+1)

- **Introduction & Design Goals**
    - **Guiding principles**: DDD, Ports & Adapters, CQRS, TDD, etc.
- **Architectural Views**
    - **Logical View**: C4 Level 1 (Context).
    - **Development View**: repo layout, tech stack, CI/CD overview.
    - **Process View**: runtime behavior, message flows, CQRS, async handling.
    - **Physical View**: deployment topology, infrastructure.
    - **Scenarios (+1)**: trace key user flows through architecture.
- **C4 Level 2**: Container Diagram
    - **Components**: Services, databases, APIs, frontends
- **Cross-cutting Concerns**
    - Security, observability, error handling, configuration
- **Architecture Decision Records** (ADRs)
    - Key trade-offs and justifications

**Corresponds to**: architecture design phase (C4 L1/L2)\
**Feeds into**: CDD (detailed component/module designs)\
**Standard**: ISO/IEC/IEEE 42010:2011

### Component Design Documents (CDD)

**Purpose**: Describe **module- or bounded-context-level design** — the “inside” of each architectural building block.

Each CDD corresponds to one **bounded context** or **major subsystem**.

**Contents**: (C4 Level 3 + 4):

- **Overview**: Purpose of the component / bounded context
- **Responsibilities & Interfaces**: Inputs, outputs, and adapters
- **Internal Architecture**: Ports & Adapters diagram, layers (domain, application, infrastructure)
- **Domain Model**: Entities, Value Objects, Aggregates, Repositories
- **Behavioral Design**: Sequence diagrams, workflows, event flows
- **Data Models/Schemas**
- **Error Handling, Transactions, and Invariants**
- **Testing Strategy**: TDD/BDD approach, coverage, mocks, integration testing
- **Code Mapping**: Source structure, naming conventions, key files

**Corresponds to**: Detailed design level (C4 L3/L4)\
**Feeds into**: Implementation and test specs
**Standard**: ISO/IEC/IEEE 42010:2011
