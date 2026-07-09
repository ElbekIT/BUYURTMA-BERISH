# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

### 3. Get Telegram Bot Credentials

#### Step 1: Create Bot
1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Answer the questions:
   - Bot name (e.g., "Dizayn Orders")
   - Bot username (e.g., "dizayn_orders_bot")
4. Copy the token you receive

#### Step 2: Get Chat ID
1. Send `/start` to your newly created bot
2. Open this URL in your browser (replace YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. You'll see a JSON response. Look for `"chat":{"id":XXXX}`
4. Copy that number (XXXX)

### 3. Configure Environment
Edit `.env.local`:
```
BOT_TOKEN=123456789:ABCDefGhIjKlMnOpQrStUvWxYz_your_token
CHAT_ID=987654321
```

### 4. Run Development Server
```bash
pnpm dev
```

Visit http://localhost:3000

## Testing the Form

1. Go to http://localhost:3000
2. Click "Buyurtma Berish"
3. Select a platform (YouTube, Telegram, Instagram, TikTok, PUBG)
4. Fill in the form with test data:
   - Full Name: Test User
   - Telegram: @testuser (or @yourname)
   - Platform Name: Test Channel
   - Design Type: Select from dropdown
   - Additional Notes: Test submission
5. Click submit
6. Check your Telegram chat for the order message

## What to Expect

### Successful Submission
- Green success modal appears
- Form clears automatically
- Message sent to your Telegram chat with:
  - Order details
  - User information
  - Any uploaded files

### What You'll Get in Telegram
A formatted message showing:
```
📥 NEW ORDER

Platform: ✈️ Telegram
Name: Test User
Phone: [if provided]
Telegram: @testuser
Platform Name: Test Channel
Profile Link: [if provided]
Design Type: Logo
Additional Notes: Test submission
Date: 04.07.2026
Time: 14:30
```

## Deployment

### To Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `BOT_TOKEN`
   - `CHAT_ID`
4. Deploy

### Manual Server
```bash
pnpm build
pnpm start
```

## Troubleshooting

### Bot Not Receiving Messages
- Check `BOT_TOKEN` is correct
- Check `CHAT_ID` is a number (no @)
- Verify bot username and token with `@BotFather`

### Form Not Submitting
- Check browser console for errors
- Verify all required fields are filled
- Check file size if uploading (max 20MB)

### Pages Not Loading
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `pnpm dev`
- Check console for TypeScript errors

## Features Ready to Use

- 5 Platform-specific forms
- File upload (JPG, PNG, WebP, PDF, ZIP, RAR)
- Form validation with Zod
- Error handling with modals
- Responsive mobile design
- Dark/light mode ready
- Telegram bot integration

## Next Steps

1. Customize the Telegram contact link in `/components/Navigation.tsx`
2. Update footer links in `/app/page.tsx`
3. Add your branding/colors in `/app/globals.css`
4. Deploy to Vercel

## Support

- All code is TypeScript with strict type checking
- Uses React Hook Form for forms
- Tailwind CSS for styling
- Next.js 16 with App Router
