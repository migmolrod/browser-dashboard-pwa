---
sidebar_position: 1
---

import PriorityLabel from "../../../src/components/PriorityLabel";

# Performance

## NFR-PER-001: Page load time

**Priority:** <PriorityLabel priority="Must Have"/>

**Category:** Performance

**Description:**
The initial page load shall be completed in under 2 seconds on a standard broadband connection (5 Mbps) to ensure a
responsive user experience and meet modern web performance standards.

**Rationale:**
Fast page load times are critical for user satisfaction and engagement. Research shows that users abandon sites that
take longer than 3 seconds to load. This requirement directly impacts user productivity and portfolio presentation
quality.

**Measurement:**

- Lighthouse Performance Score > 90
- First Contentful Paint (FCP) < 1.5s
- Time to Interactive (TTI) < 3s
- Largest Contentful Paint (LCP) < 2.5s

**Acceptance criteria:**

- Tested on Chrome, Firefox, Safari, Edge (versions specified in "NFR-USA-004: Browser compatibility")
- Measured using Lighthouse and Web Vitals
- 95th percentile measurements meet targets
- Initial bundle size optimized (< 300KB gzipped)
- Critical CSS inlined
- Above-the-fold content prioritized

**Affected components:**

- Frontend (Angular application)
- All bounded contexts (BKM, TSK, WEA, CAL, DAS, PRE, UID)
- PWA service worker
- CDN/hosting infrastructure

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-005 (User Value Delivery)
- Functional Requirements: All user-facing features

**Testing approach:**

- Lighthouse CI in an automated pipeline
- Real User Monitoring (RUM) with Web Vitals
- Performance budgets enforced in CI/CD
- Tested on various network conditions (3G, 4G, broadband)
- Load testing with tools like k6 or Artillery

**Trade-offs:**

- Code splitting increases complexity but improves the initial load
- Aggressive caching may cause stale data issues (mitigated by cache invalidation strategy)

**Open questions:**

- None

## NFR-PER-002: API response time

**Priority:** <PriorityLabel priority="Must Have"/>

**Category:** Performance

**Description:**
API endpoints shall respond in under 200 ms at the 95th percentile under a normal load to ensure responsive user
interactions and maintain system performance.

**Rationale:**
Fast API response times are essential for a smooth user experience. Delays in API responses translate directly to UI
latency, degrading user productivity and satisfaction.

**Measurement:**

- P95 response time < 200 ms
- P99 response time < 500 ms
- Average response time < 100 ms
- Measured under normal load (100 concurrent users)

**Acceptance criteria:**

- Measured using APM tools (Application Performance Monitoring)
- Under load of 100 concurrent users
- Excludes third-party API calls (weather provider)
- Database query optimization applied (see NFR-PER-003)
- Connection pooling configured
- Response times are logged and monitored

**Affected components:**

- Backend (Spring Boot microservices)
- All API endpoints across bounded contexts
- Database (PostgreSQL)
- API Gateway (if applicable)

**Related to:**

- Business Requirements: BR-002 (User Productivity Enhancement), BR-003 (Technical Excellence), BR-005 (User Value
  Delivery)
- Functional Requirements: All features with API interactions

**Testing approach:**

- Load testing with tools like JMeter, k6, or Gatling
- APM integration (e.g., New Relic, Datadog, or open-source alternatives)
- Performance regression testing in CI/CD
- Database query profiling with EXPLAIN ANALYZE

**Trade-offs:**

- Caching improves response times but may introduce stale data
- Database denormalization may improve read performance but complicate writes

**Open questions:**

- None

## NFR-PER-003: Database query performance

**Priority:** <PriorityLabel priority="Must Have"/>

**Category:** Performance

**Description:**
Database queries shall execute in under 50 ms at the 95th percentile to minimize API response latency and ensure
efficient data retrieval.

**Rationale:**
Database query performance is a critical factor in overall API response time. Slow queries create bottlenecks that
degrade user experience and system scalability.

**Measurement:**

- P95 query execution time < 50 ms
- Query execution time logged and monitored
- Slow query log enabled

**Acceptance criteria:**

- Proper indexing implemented on all frequently queried columns
- Query optimization applied (EXPLAIN ANALYZE reviewed)
- Connection pooling configured (e.g., HikariCP)
- Query execution time monitored via APM or database logs
- N+1 query problems avoided (eager loading, batch fetching)
- No full table scans on large tables

**Affected components:**

- Backend (Spring Boot microservices)
- Database (PostgreSQL)
- All data access layers (Repositories)

**Related to:**

- Business Requirements: BR-003 (Technical Excellence), BR-004 (Scalability and Maintainability)
- Functional Requirements: All features with database interactions

**Testing approach:**

- Database query profiling with PostgreSQL EXPLAIN ANALYZE
- Load testing with realistic data volumes
- Index usage verification
- Slow query log analysis

**Trade-offs:**

- Indexing improves read performance but slows writes and increases storage
- Query optimization may increase complexity

**Open questions:**

- None

## NFR-PER-004: Animation frame rate

**Priority:** <PriorityLabel priority="Should Have"/>

**Category:** Performance

**Description:**
All UI animations shall maintain at least 60 frames per second (60 FPS) to provide smooth, responsive user interactions
and avoid perceived sluggishness.

**Rationale:**
Smooth animations contribute to a polished, professional user experience. Janky animations create a perception of poor
quality and can negatively impact user satisfaction.

**Measurement:**

- Frame rate monitoring with browser DevTools
- No dropped frames during animations
- Consistent 60 FPS during scroll, transitions, and animations

**Acceptance criteria:**

- No jank during animations (no dropped frames)
- Smooth scroll performance
- GPU acceleration is used where appropriate (CSS transforms, opacity)
- Respects `prefers-reduced-motion` media query for accessibility
- Animations optimized to avoid reflow/repaint

**Affected components:**

- Frontend (Angular components)
- All UI animations and transitions
- Scroll behavior

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-005 (User Value Delivery)
- Functional Requirements: All user-facing features with animations

**Testing approach:**

- Browser DevTools Performance profiling
- Visual regression testing
- Tested on lower-end devices
- Monitoring for layout thrashing

**Trade-offs:**

- GPU acceleration improves performance but increases memory usage
- Complex animations may be simplified for performance

**Open questions:**

- None

## NFR-PER-005: Bundle size

**Priority:** <PriorityLabel priority="Should Have"/>

**Category:** Performance

**Description:**
The initial JavaScript bundle shall not exceed 300KB (gzipped) to minimize download time and improve page load
performance, especially on slower connections.

**Rationale:**
Large bundle sizes directly impact page load time and user experience, particularly on mobile devices or slower
connections. Smaller bundles load faster and reduce bandwidth costs.

**Measurement:**

- Initial bundle size < 300KB (gzipped)
- Bundle analysis is performed regularly
- Bundle size tracked over time

**Acceptance criteria:**

- Code splitting implemented (lazy loading for routes and modules)
- Tree shaking applied to remove unused code
- Lazy loading for non-critical modules
- Bundle analysis is performed with tools like webpack-bundle-analyzer
- Dependencies reviewed for size (prefer smaller alternatives)
- Production build optimized with minification and compression

**Affected components:**

- Frontend (Angular application)
- Build system (Webpack, Angular CLI)

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-007 (Cost Efficiency)
- Functional Requirements: All user-facing features

**Testing approach:**

- Bundle size analysis in a CI/CD pipeline
- Bundle size budgets enforced
- Lighthouse performance audits

**Trade-offs:**

- Code splitting increases complexity but improves the initial load
- Lazy loading may introduce slight delays for secondary routes

**Open questions:**

- None
