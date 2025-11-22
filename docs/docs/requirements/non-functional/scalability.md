---
sidebar_position: 2
---

import PriorityLabel from "../../../src/components/PriorityLabel";

# Scalability

## NFR-SCA-001: Concurrent users

**Priority:** <PriorityLabel priority="Should Have"/>

**Category:** Scalability

**Description:**
The system shall support at least 100 concurrent users without performance degradation to demonstrate scalability and handle realistic usage scenarios.

**Rationale:**
While this is primarily a personal portfolio project, demonstrating scalability shows professional-level system design and preparation for potential growth.

**Measurement:**

- System tested with 100 concurrent users
- No significant increase in response times under load
- Error rate remains below 1% under load

**Acceptance criteria:**

- Load testing performed with tools like JMeter, k6, or Gatling
- No significant increase in response times (< 10% degradation)
- No error rate increase (< 1% errors)
- Resource usage within limits (CPU < 80%, memory < 85%)
- Database connection pool handles concurrency
- API rate limiting prevents abuse

**Affected components:**

- Backend (Spring Boot microservices)
- Database (PostgreSQL)
- API Gateway
- Infrastructure (hosting environment)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-004 (Scalability and Maintainability)
- Functional Requirements: All features under concurrent load

**Testing approach:**

- Load testing with realistic user scenarios
- Stress testing to identify breaking points
- Monitoring resource usage during load tests

**Trade-offs:**

- Optimizing for concurrency may increase infrastructure complexity
- Caching improves scalability but may introduce consistency challenges

**Open questions:**

- None

## NFR-SCA-002: Data volume

**Priority:** <PriorityLabel priority="Should Have"/>

**Category:** Scalability

**Description:**
The system shall handle user accounts with large data volumes without performance degradation. This includes up to 500 bookmarks, 1,000 tasks, and 2,000 calendar events per user.

**Rationale:**
Users with extensive data should experience the same performance as users with minimal data. Handling large data volumes demonstrates scalability and production-readiness.

**Measurement:**

- Performance tested with maximum data volumes
- Query performance within targets (NFR-003)
- UI responsiveness maintained

**Acceptance criteria:**

- Performance maintained with maximum data (500 bookmarks, 1,000 tasks, 2,000 calendar events)
- Pagination implemented for large lists
- Virtual scrolling for large lists (performance optimization)
- Database performance optimized with proper indexing
- API responses remain under 200ms (NFR-002)
- No UI lag with large datasets

**Affected components:**

- Backend (all bounded contexts: BKM, TSK, CAL)
- Database (PostgreSQL)
- Frontend (Angular components with large lists)

**Related to:**

- Business Requirements: BR-003 (Technical Excellence), BR-004 (Scalability and Maintainability), BR-005 (User Value Delivery)
- Functional Requirements: FR-BKM (Bookmarks), FR-TSK (Tasks), FR-CAL (Calendar)

**Testing approach:**

- Load testing with maximum data volumes
- Database query profiling with large datasets
- UI performance testing with large lists

**Trade-offs:**

- Pagination improves performance but adds complexity
- Denormalization may improve read performance but complicate writes

**Open questions:**

- None

## NFR-SCA-003: Horizontal scaling

**Priority:** <PriorityLabel priority="Could Have"/>

**Category:** Scalability

**Description:**
The backend shall support horizontal scaling by adding more instances without architectural changes, enabling load distribution and increased capacity.

**Rationale:**
Horizontal scaling demonstrates cloud-native design principles and preparation for growth. While not required for MVP, it's a valuable architectural property for portfolio demonstration.

**Measurement:**

- Application can run multiple instances behind load balancer
- No session affinity required (stateless design)
- Load distributed evenly across instances

**Acceptance criteria:**

- Stateless API design (no in-memory session state)
- Load balancer compatibility (health checks, graceful shutdown)
- Shared session storage (Redis or database-backed sessions)
- Database connection pooling scales with instances
- No data consistency issues with multiple instances
- Configuration externalized (environment variables)

**Affected components:**

- Backend (Spring Boot microservices)
- Infrastructure (load balancer, orchestration)
- Session management

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-004 (Scalability and Maintainability)
- Functional Requirements: All backend features

**Testing approach:**

- Deploy multiple instances behind load balancer
- Test session persistence across instances
- Load testing with multiple instances

**Trade-offs:**

- Stateless design may require external session storage
- Complexity increases with distributed architecture

**Open questions:**

- None
