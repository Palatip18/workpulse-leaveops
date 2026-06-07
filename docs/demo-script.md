# Demo Script

This document describes a 3-5 minute interview demo flow for WorkPulse LeaveOps.

## Demo Goal

Show that WorkPulse LeaveOps is not only a mock demo, but a real LINE-integrated HR workflow MVP with queue processing, audit logs, safety controls, and pilot readiness.

## Demo Flow

### 1. Project Overview

Explain:

- WorkPulse LeaveOps is an HR LeaveOps automation MVP.
- It supports leave request, supervisor approval, HR confirmation, leave balance tracking, monthly confirmation, dispute handling, and optional field attendance.
- It uses Google Apps Script, Google Sheets, Cloudflare Worker, and LINE Messaging API.

Screen to show:

- README
- DASHBOARD

### 2. Architecture

Explain the real LINE flow:

LINE User
-> LINE Official Account
-> Cloudflare Worker
-> Google Apps Script
-> LINE_INBOX_QUEUE
-> Queue Worker
-> API Gateway
-> Core LeaveOps
-> LINE Push Reply

Screen to show:

- docs/architecture.md
- Cloudflare Worker health page

### 3. Real LINE Test

Send this message in LINE:

เช็กสิทธิวันลา

Expected result:

The LINE Official Account replies with leave balance:

- Sick leave remaining
- Personal leave remaining
- Annual leave remaining

Screen to show:

- LINE chat screenshot

### 4. Queue Evidence

Open LINE_INBOX_QUEUE.

Expected result:

- message_text = เช็กสิทธิวันลา
- employee_id = EMP001
- process_status = DONE
- result_status = SUCCESS
- reply_mode = PUSH
- reply_status = SENT

### 5. Delivery Evidence

Open LINE_DELIVERY_LOG.

Expected result:

- delivery_type = PUSH
- status = SENT
- response_code = 200 or 2xx

Also explain:

- DRY_RUN was used before live push.
- Live push was enabled only after queue validation.

### 6. Leave Workflow

Explain the leave workflow:

Employee submits leave
-> Supervisor approves or rejects
-> HR confirms
-> Leave balance is deducted
-> Approval log is recorded

Screen to show:

- LEAVE_REQUESTS
- APPROVAL_LOG
- LEAVE_BALANCE

### 7. Monthly Confirmation

Explain:

- Monthly summary can be generated from attendance and leave data.
- Employees can confirm or submit disputes.
- Month lock is allowed only after pending items are resolved.

Screen to show:

- MONTHLY_SUMMARY
- MONTHLY_CONFIRMATION
- DISPUTE_QUEUE

### 8. Field Attendance

Explain:

- Field Attendance is optional.
- It does not replace a fingerprint scanner.
- It supports field check-in/check-out with evidence and HR review.

Screen to show:

- FIELD_ATTENDANCE_LOG
- FIELD_EVIDENCE_LOG
- FIELD_REVIEW_QUEUE

### 9. Safety and Controls

Explain:

- Token guardrail
- Script Properties
- Worker Secrets
- Kill switch
- Dry-run mode
- Queue-based processing

Screen to show:

- security-notes.md
- LINE_REAL_CONFIG_AUDIT
- Worker Secrets page with values hidden

### 10. QA and Readiness

Show:

- TEST_RESULTS
- PHASE13_FINAL_CHECK
- DEMO_READINESS_CHECK
- PILOT_READINESS_CHECK

Expected result:

- Portfolio / CV Ready = 100%
- Interview Demo Ready = 100%
- Internal Pilot Ready = 100%

### 11. Roadmap

Explain future improvements:

- Database migration
- HR Admin web panel
- LINE Rich Menu
- Flex Message
- Production permission model
- Monitoring and alerting
- Multi-company support

## Closing Statement

WorkPulse LeaveOps demonstrates real-world internal tool development using low-code/cloud tools, queue-based architecture, LINE integration, operational safety controls, and HR workflow automation.
