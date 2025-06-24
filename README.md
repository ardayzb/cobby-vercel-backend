# Telegram Mini App Backend (Vercel)

## Endpoints

- `/api/log`: Receives user data and logs it to Google Sheets
- `/api/webhook`: Handles Telegram /start command

## Setup

1. Connect this repo to Vercel
2. Deploy
3. Set Telegram webhook to:
   https://<your-vercel-url>/api/webhook
