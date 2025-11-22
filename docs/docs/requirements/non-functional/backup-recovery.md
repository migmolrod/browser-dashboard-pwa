---
sidebar_position: 11
---

import PriorityLabel from "../../../src/components/PriorityLabel";

# Backup and recovery

## NFR-BAC-001: Database backups

**Priority:** <PriorityLabel priority="Must Have"/>

**Category:** Reliability

**Description:**
User data shall be backed up daily with a retention policy of at least 30 days, stored in a separate location, and encrypted.

**Rationale:**
Regular backups protect against data loss due to failures, human error, or security incidents. Backups are critical for data integrity.

**Measurement:**

- Backups run daily
- Backup success rate 100%
- Backup restoration tested regularly

**Acceptance criteria:**

- Automated daily backups
- Retention policy (30 days minimum)
- Stored in a separate location (different server/region)
- Encrypted backups (at rest)
- Backup monitoring (alerts for failed backups)
- Backup restoration tested monthly

**Affected components:**

- Database (PostgreSQL)
- Backup infrastructure

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence), BR-005 (User Value Delivery)
- Functional Requirements: All features with persistent data

**Testing approach:**

- Backup creation verification
- Backup restoration testing
- Backup encryption verification

**Trade-offs:**

- Backups require storage space and compute resources
- Frequent backups may impact database performance

**Open questions:**

- None

## NFR-BAC-002: Disaster recovery

**Priority:** <PriorityLabel priority="Should Have"/>

**Category:** Reliability

**Description:**
The system shall be recoverable within 4 hours (RTO) in case of failure, with data loss limited to 24 hours (RPO).

**Rationale:**
Disaster recovery planning demonstrates operational maturity and ensures business continuity in case of major failures.

**Measurement:**

- Recovery procedures documented
- RTO (Recovery Time Objective) < 4 hours
- RPO (Recovery Point Objective) < 24 hours

**Acceptance criteria:**

- Recovery procedures documented (runbooks)
- Regular recovery drills (quarterly)
- RTO: 4 hours (time to restore service)
- RPO: 24 hours (maximum data loss)
- Backup restoration tested regularly
- Infrastructure reproducible (IaC)

**Affected components:**

- Entire system (all components)
- Backup and infrastructure

**Related to:**

- Business Requirements: BR-001 (Portfolio Enhancement), BR-003 (Technical Excellence)
- Functional Requirements: All features

**Testing approach:**

- Disaster recovery drills
- Backup restoration testing
- RTO/RPO measurement

**Trade-offs:**

- Lower RTO/RPO requires more resources and complexity
- Recovery drills are time-consuming

**Open questions:**

- None
