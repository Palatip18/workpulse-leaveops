# Pilot Readiness

WorkPulse LeaveOps has passed the internal pilot readiness checklist for a controlled demo environment.

## Current Readiness

- Portfolio / CV Ready: 100%
- Interview Demo Ready: 100%
- Internal Pilot Ready: 100%
- Production Enterprise Ready: Not claimed

## Pilot Scope

This pilot version is designed for:

- Demo users
- Mock employee data
- Internal workflow testing
- Interview demonstration
- Portfolio evidence

It is not designed for direct enterprise-wide production rollout without further hardening.

## Completed Pilot Requirements

### LINE Integration

- LINE Webhook Verify passed
- Cloudflare Worker receives LINE webhook events
- LINE signature verification is enabled
- Worker forwards events to Google Apps Script
- LINE_INBOX_QUEUE receives real LINE events
- LINE user is mapped to EMP001
- Queue worker processes messages
- LINE push reply works with real LINE account

### Queue and Logs

- LINE_INBOX_QUEUE records inbound events
- LINE_DELIVERY_LOG records push delivery results
- API_REQUEST_LOG records API Gateway actions
- APPROVAL_LOG records leave workflow actions
- TEST_RESULTS records health and regression checks

### Safety Controls

- Dry-run mode before live push
- Queue live push mode
- Kill switch
- Token guardrail
- Script Properties for GAS secrets
- Cloudflare Worker Secrets for proxy secrets
- No real company data
- Mock employee data only

### HR Workflow

- Leave request flow exists
- Supervisor approval / rejection flow exists
- HR confirmation flow exists
- Leave balance deduction exists
- Monthly summary flow exists
- Monthly confirmation flow exists
- Dispute queue exists
- Optional field attendance flow exists

## Pilot Go-Live Conditions

Before running an internal pilot:

1. Confirm LINE mode is QUEUE_LIVE_PUSH.
2. Confirm line_push_enabled is true.
3. Confirm worker trigger is installed.
4. Confirm auto-response in LINE OA is disabled.
5. Confirm LINE user mapping is correct.
6. Confirm no pending queue items are stuck.
7. Confirm delivery log has no recent failed sends.
8. Confirm screenshots do not expose secrets.
9. Confirm kill switch is available.
10. Confirm demo data is used only.

## Rollback

If anything behaves incorrectly:

1. Run WORKPULSE_killRealLineNow().
2. Disable LINE webhook if needed.
3. Stop queue worker trigger.
4. Review LINE_INBOX_QUEUE.
5. Review LINE_DELIVERY_LOG.
6. Review Apps Script Executions.
7. Fix mapping or command parser.
8. Re-enable dry-run mode before going live again.

## Pilot Verdict

WorkPulse LeaveOps is ready for controlled internal pilot and interview demo use.

It should not be presented as full enterprise production software yet.
