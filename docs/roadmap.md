# Roadmap

This roadmap describes future improvements for WorkPulse LeaveOps after the current real LINE-integrated MVP.

## Current Status

WorkPulse LeaveOps has completed the real LINE-integrated MVP stage.

Completed readiness:

- Portfolio / CV Ready: 100%
- Interview Demo Ready: 100%
- Internal Pilot Ready: 100%
- Production Enterprise Ready: Not claimed

## Phase 14: Database Migration Readiness

Goal:

Prepare the system to move from Google Sheets as the MVP database to a real database.

Planned items:

- DATABASE_ROADMAP
- DB_SCHEMA_DESIGN
- DATA_MIGRATION_PLAN
- ENTITY_RELATION_MAP
- Sheet to SQL table mapping
- PostgreSQL / Supabase option review
- Repository pattern design
- Data access layer planning

Target future tables:

- employees
- leave_policies
- leave_balances
- leave_requests
- approval_logs
- monthly_summaries
- monthly_confirmations
- disputes
- field_attendance_events
- notification_queue
- line_inbox_events
- line_delivery_logs
- api_request_logs
- system_settings

## Phase 15: HR Admin Web Panel

Goal:

Build a real web-based admin interface for HR and supervisors.

Planned modules:

- Employee management
- Leave request management
- Supervisor approval screen
- HR confirmation screen
- Leave balance dashboard
- Monthly summary review
- Dispute review screen
- LINE user mapping UI
- System status dashboard

Possible tech stack:

- React
- Next.js
- Supabase
- Firebase
- Cloudflare Pages

## Phase 16: LINE UX Enhancement

Goal:

Improve the LINE user experience.

Planned items:

- LINE Rich Menu
- LINE Flex Message
- Leave request buttons
- Approval buttons
- Monthly confirmation cards
- Dispute submission flow
- Field attendance check-in menu
- Status inquiry menu

## Phase 17: Production Hardening

Goal:

Prepare the system for production-grade internal use.

Planned items:

- Role-based permission
- Employee / Supervisor / HR / Admin access separation
- Data retention policy
- Audit log protection
- Backup strategy
- Queue retry policy
- Dead-letter queue
- Monitoring and alerting
- Token rotation procedure
- Consent flow for real LINE user mapping

## Phase 18: Multi-company / SaaS Direction

Goal:

Explore turning the system into a multi-company internal tools platform.

Planned items:

- company_id
- branch_id
- team_id
- policy_id
- multi-tenant data model
- subscription plan design
- company-level configuration
- custom leave policies
- custom LINE channel per company

## Future Positioning

WorkPulse LeaveOps can evolve from:

Google Sheets MVP
-> Internal HR tool
-> Database-backed admin system
-> Multi-company workflow platform

## Notes

The current repository should not claim full enterprise production readiness.

The current version is best positioned as:

- Real LINE-integrated MVP
- Portfolio project
- Interview demo
- Controlled internal pilot
