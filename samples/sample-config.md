# Sample Configuration

This file shows the required configuration keys for WorkPulse LeaveOps.

Do not commit real values.

## Google Apps Script Script Properties

Required keys:

- LINE_CHANNEL_ACCESS_TOKEN
- LINE_CHANNEL_SECRET
- WORKPULSE_LINE_DIRECT_WEBHOOK_SECRET
- WORKPULSE_LINE_MODE
- WORKPULSE_REAL_LINE_ENABLED
- WORKPULSE_LINE_REPLY_ENABLED
- WORKPULSE_LINE_PUSH_ENABLED
- WORKPULSE_LINE_VERIFY_ONLY

Example safe values:

LINE_CHANNEL_ACCESS_TOKEN=your-line-channel-access-token
LINE_CHANNEL_SECRET=your-line-channel-secret
WORKPULSE_LINE_DIRECT_WEBHOOK_SECRET=your-direct-webhook-secret
WORKPULSE_LINE_MODE=QUEUE_LIVE_PUSH
WORKPULSE_REAL_LINE_ENABLED=TRUE
WORKPULSE_LINE_REPLY_ENABLED=FALSE
WORKPULSE_LINE_PUSH_ENABLED=TRUE
WORKPULSE_LINE_VERIFY_ONLY=FALSE

## Cloudflare Worker Secrets

Required keys:

- LINE_CHANNEL_SECRET
- GAS_WEBAPP_URL

Example safe values:

LINE_CHANNEL_SECRET=your-line-channel-secret
GAS_WEBAPP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?wp_secret=YOUR_DIRECT_WEBHOOK_SECRET

## LINE Developers

Webhook URL should point to the Cloudflare Worker URL, not directly to Google Apps Script.

Example:

https://your-worker-name.your-subdomain.workers.dev

## Safety Notes

- Never store real tokens in code.
- Never commit real webhook URLs with secrets.
- Use Cloudflare Worker Secrets for proxy configuration.
- Use Google Apps Script Script Properties for LINE tokens.
