# Security Notes

This repository is a sanitized portfolio version of WorkPulse LeaveOps.

## Important Rules

Do not commit real secrets or real company data.

Never commit:

- LINE_CHANNEL_ACCESS_TOKEN
- LINE_CHANNEL_SECRET
- GAS_WEBAPP_URL with real wp_secret
- WORKPULSE_LINE_DIRECT_WEBHOOK_SECRET
- Google Sheet ID from a real system
- Real employee data
- Raw LINE webhook payload containing real user identifiers
- Screenshots showing full tokens, secrets, or private URLs

## Secret Storage

Secrets should be stored in:

- Google Apps Script Script Properties
- Cloudflare Worker Secrets

## Safe Demo Data

This project uses mock data only:

- EMP001 Employee 001
- EMP002 Employee 002
- SUP001 Supervisor 001
- HR001 HR 001
- ADMIN001 Admin 001

## Screenshot Policy

Screenshots used for portfolio evidence must mask:

- LINE user ID
- reply token
- webhook secret
- access token
- private Google Apps Script URL
- raw_json if it contains sensitive payload

## Current Repository Scope

This repository is intended for portfolio and interview demonstration.

It is not claiming full enterprise production readiness.

Production hardening still requires:

- Database migration
- Role-based permission
- Data retention policy
- Backup strategy
- Monitoring and alerting
- Consent flow for real employee LINE user mapping
