# Architecture

WorkPulse LeaveOps uses a queue-based architecture to connect LINE Messaging API with Google Apps Script safely.

## High-Level Flow

LINE User
-> LINE Official Account
-> LINE Developers Webhook
-> Cloudflare Worker
-> LINE signature verification
-> Google Apps Script Web App
-> LINE_INBOX_QUEUE
-> Queue Worker
-> API Gateway
-> Core LeaveOps
-> LINE Push Reply

## Why Cloudflare Worker

Google Apps Script Web App can return redirects or take too long for direct LINE webhook verification.

Cloudflare Worker is used as a lightweight webhook proxy.

It provides:

- Fast HTTP 200 response to LINE
- LINE signature verification
- Secure secret storage through Worker Secrets
- Background forwarding to Google Apps Script
- Reduced risk of webhook timeout

## Google Apps Script Layer

Google Apps Script handles:

- Webhook payload intake
- Queue writing
- LeaveOps business logic
- API Gateway actions
- LINE inbox queue processing
- Delivery log writing
- Health checks
- Regression tests

## Google Sheets Layer

Google Sheets acts as the MVP database.

Main sheets include:

- EMPLOYEES
- LEAVE_POLICY
- LEAVE_BALANCE
- LEAVE_REQUESTS
- APPROVAL_LOG
- HR_CONFIRMATION_QUEUE
- MONTHLY_SUMMARY
- MONTHLY_CONFIRMATION
- DISPUTE_QUEUE
- FIELD_ATTENDANCE_LOG
- FIELD_REVIEW_QUEUE
- LINE_INBOX_QUEUE
- LINE_DELIVERY_LOG
- TEST_RESULTS
- DASHBOARD

## Queue Design

LINE events are not processed directly inside the webhook response.

Instead:

1. Webhook receives the event.
2. Event is written to LINE_INBOX_QUEUE.
3. Worker function processes pending rows.
4. API Gateway routes the command.
5. Result is logged.
6. LINE push reply is sent.
7. Delivery result is written to LINE_DELIVERY_LOG.

This design reduces timeout risk and improves traceability.

## Main LINE Command Example

User sends:

เช็กสิทธิวันลา

System flow:

1. LINE event enters LINE_INBOX_QUEUE.
2. LINE user is mapped to EMP001.
3. Parser detects GET_LEAVE_BALANCE.
4. API Gateway calls leave balance module.
5. System returns leave balance.
6. LINE push reply is sent.

## Safety Controls

- Dry-run mode before live push
- Queue live push mode for controlled rollout
- Kill switch
- Token guardrail
- Script Properties for GAS secrets
- Worker Secrets for Cloudflare secrets
- Delivery log
- Audit log
- Health check
