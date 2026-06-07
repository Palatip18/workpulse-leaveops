# WorkPulse LeaveOps

WorkPulse LeaveOps is a real LINE-integrated HR LeaveOps automation MVP built with Google Apps Script, Google Sheets, Cloudflare Worker, and LINE Messaging API.

The project demonstrates an end-to-end internal HR workflow system with real LINE webhook integration, queue-based processing, audit logs, safety controls, and portfolio-ready evidence.

## Project Status

- Portfolio / CV Ready: 100%
- Interview Demo Ready: 100%
- Internal Pilot Ready: 100%
- Production Enterprise Ready: Not claimed

## What This Project Solves

Many small internal teams still manage leave requests manually through chat, spreadsheets, and repeated HR follow-ups.

WorkPulse LeaveOps solves this by turning the leave operation into a controlled workflow:

- Employees can check leave balance through LINE
- LINE messages are received through a real webhook
- Events are stored in a queue before processing
- The system maps LINE users to employee IDs
- Leave balance is calculated from Google Sheets
- Replies are pushed back through LINE
- Logs and readiness checks are retained as audit evidence

## Tech Stack

- Google Apps Script
- Google Sheets
- LINE Messaging API
- Cloudflare Worker
- Queue-based workflow
- Webhook proxy
- Audit logs
- Health checks
- Regression tests

## Key Features

- Employee leave request workflow
- Supervisor approval and rejection
- HR confirmation
- Leave balance tracking
- Monthly summary and confirmation
- Dispute handling
- Optional field attendance
- Real LINE webhook integration
- LINE push reply
- Queue-based webhook processing
- Kill switch and token guardrail
- Demo readiness and pilot readiness checks

## Architecture

WorkPulse LeaveOps uses Cloudflare Worker as a webhook proxy between LINE Messaging API and Google Apps Script.

High-level flow:

    LINE User
        |
        v
    LINE Official Account
        |
        v
    LINE Developers Webhook
        |
        v
    Cloudflare Worker
        |
        v
    Verify LINE Signature
        |
        v
    Google Apps Script Web App
        |
        v
    LINE_INBOX_QUEUE
        |
        v
    Queue Worker
        |
        v
    API Gateway
        |
        v
    Core LeaveOps
        |
        v
    LINE_DELIVERY_LOG
        |
        v
    LINE Push Reply
        |
        v
    LINE User

## Why Cloudflare Worker Was Used

Direct LINE webhook integration with Google Apps Script can run into timeout or redirect issues.

Cloudflare Worker helps by:

- Returning fast HTTP 200 responses to LINE
- Verifying LINE signatures
- Forwarding webhook events to Google Apps Script
- Keeping secrets in Cloudflare Worker Secrets
- Reducing webhook timeout risk
- Separating webhook acknowledgement from business processing

## Queue-Based Design

LINE events are not fully processed inside the webhook response.

Instead, the system uses this pattern:

1. LINE sends webhook event
2. Cloudflare Worker verifies and forwards the event
3. Google Apps Script writes the event into LINE_INBOX_QUEUE
4. Queue Worker processes pending items
5. API Gateway routes the command
6. Core LeaveOps calculates the result
7. LINE_DELIVERY_LOG records delivery result
8. LINE Push Reply sends the response back to the user

This improves reliability, traceability, and operational control.

## Real LINE Demo

Test command:

    เช็กสิทธิวันลา

Expected response:

    สิทธิวันลาของคุณ
    พนักงาน: Employee 001 (EMP001)
    ลาป่วยคงเหลือ: 29 วัน
    ลากิจคงเหลือ: 6 วัน
    ลาพักร้อนคงเหลือ: 10 วัน

## Portfolio Evidence

### 1. Real LINE Reply Success

![Real LINE Reply Success](screenshots/01_LINE_REAL_REPLY_SUCCESS.png)

### 2. LINE Inbox Queue Processed

![LINE Inbox Queue Done Sent](screenshots/02_LINE_INBOX_QUEUE_DONE_SENT.png)

### 3. LINE Delivery Log

![LINE Delivery Log Debug to Success](screenshots/03_LINE_DELIVERY_LOG_DEBUG_TO_SUCCESS.png)

More evidence screenshots are available in the screenshots folder.

## Problems Solved During Development

This project includes evidence of real debugging and controlled rollout:

- LINE direct webhook verification issues were handled
- Google Apps Script redirect and timeout risk was avoided
- Cloudflare Worker proxy was introduced
- Dry-run mode was used before live push
- LINE push was intentionally disabled during safety testing
- Live push was enabled only after queue validation
- LINE user mapping was implemented before real response delivery
- Final system passed demo and pilot readiness checks

## Security Notes

This repository is a sanitized portfolio version.

No real company data, real access tokens, webhook secrets, production Google Sheet IDs, or private webhook URLs should be committed.

Secrets must be stored in:

- Google Apps Script Script Properties
- Cloudflare Worker Secrets

The repository includes placeholder configuration only.

## Repository Structure

- cloudflare-worker/  
  Sanitized Cloudflare Worker webhook proxy code

- docs/  
  Architecture, demo script, pilot readiness, roadmap, and security notes

- samples/  
  Sample configuration, LINE webhook payload, and sheet structure

- screenshots/  
  Portfolio evidence screenshots

- README.md  
  Project overview and portfolio entry point

## Documentation

- [Architecture](docs/architecture.md)
- [Architecture Diagram](docs/architecture-diagram.txt)
- [Demo Script](docs/demo-script.md)
- [Pilot Readiness](docs/pilot-readiness.md)
- [Security Notes](docs/security-notes.md)
- [Roadmap](docs/roadmap.md)
- [Sample Configuration](samples/sample-config.md)
- [Sample LINE Payload](samples/sample-line-payload.json)
- [Sample Sheet Structure](samples/sample-sheet-structure.md)

## Roadmap

Future improvements:

- Database migration readiness
- HR Admin web panel
- LINE Rich Menu
- LINE Flex Message
- Production-grade permission system
- Monitoring and alerting
- Data retention policy
- Backup strategy
- Multi-company SaaS direction

## Current Positioning

This project is best positioned as:

- Real LINE-integrated MVP
- Portfolio project
- Interview demo
- Controlled internal pilot

It should not be presented as full enterprise production software yet.
