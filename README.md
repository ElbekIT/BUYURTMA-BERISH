# Dizayn Buyurtmasi - Design Order Platform

Professional design order platform for YouTube, Telegram, Instagram, TikTok, and PUBG. Built with Next.js 16, React Hook Form, Zod, and Telegram Bot API integration.

## Features

- **Firebase Google Sign-In**: Secure authentication with Google accounts
- **Protected Routes**: Order pages require authentication
- **5 Platform Support**: YouTube, Telegram, Instagram, TikTok, PUBG
- **Platform-Specific Forms**: Each platform has tailored fields and validation
- **Real-time Validation**: Zod schemas for bulletproof form validation
- **Telegram Integration**: Automatic order delivery with user info
- **User Profile**: Display logged-in user info in navigation
- **Responsive Design**: Mobile-first, works on all devices
- **Professional UI**: Clean, minimal, Stripe-like aesthetic
- **Error Handling**: Comprehensive error messages and modals

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Auth (Google Sign-In)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS 4.2
- **Components**: Custom reusable components
- **API**: Next.js API Routes
- **Notifications**: Telegram Bot API
- **Animations**: Framer Motion
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Firebase Project (Google Cloud)
- Telegram Bot Token
- Telegram Chat ID

### Installation

1. Clone and install dependencies:
```bash
pnpm install
```

2. Set up Firebase (see [Firebase Setup Guide](./FIREBASE_SETUP.md)):
   - Create Firebase project
   - Enable Google Sign-In
   - Copy Firebase configuration

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Telegram Bot Configuration
BOT_TOKEN=your_bot_token_from_botfather
CHAT_ID=your_telegram_chat_id
```

### Get Telegram Credentials

1. **Bot Token**:
   - Open Telegram and find [@BotFather](https://t.me/botfather)
   - Send `/newbot` and follow instructions
   - Copy your bot token

2. **Chat ID**:
   - Send `/start` to your new bot
   - Open this in your browser (replace BOT_TOKEN):
     ```
     https://api.telegram.org/botBOT_TOKEN/getUpdates
     ```
   - Find the `chat_id` in the JSON response
   - Copy it to `CHAT_ID`

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
/app
  ├── layout.tsx              # Root layout
  ├── page.tsx                # Home page
  ├── globals.css             # Global styles & design tokens
  ├── order/
  │   ├── layout.tsx          # Order layout
  │   ├── page.tsx            # Platform selection page
  │   └── [platform]/
  │       └── page.tsx        # Form for each platform
  └── api/
      └── telegram/
          └── route.ts        # Telegram API endpoint

/components
  ├── Navigation.tsx          # Header navigation
  ├── Button.tsx              # Button component
  ├── Card.tsx                # Card components
  ├── FormField.tsx           # Form input fields
  └── Modal.tsx               # Success/error modals

/lib
  ├── types.ts                # TypeScript types
  ├── schemas.ts              # Zod validation schemas
  ├── telegram.ts             # Telegram bot utilities
  └── utils.ts                # Utility functions

/hooks
  └── useFormSubmit.ts        # Form submission hook
```

## Platforms & Features

### YouTube
- Design types: Thumbnail, Channel Art, Video Intro, End Screen, Subscribe Button, Playlist Cover, Stream Overlay
- Game selector: 40+ popular games
- Optional: Preview name, channel link

### Telegram
- Design types: Logo, Banner, Avatar, Sticker
- Channel/group support
- Profile link optional

### Instagram
- Design types: Profile Picture, Post Template, Stories Template, Feed Layout, Highlight Cover, Bio Section
- Username required
- Profile link optional

### TikTok
- Design types: Profile Picture, Cover Video, Watermark, Effect Design, Transition Template
- Username required
- Profile link optional

### PUBG
- Design types: Clan Logo, Team Banner, Profile Picture, Stream Overlay
- Nickname and PUBG ID required
- Esports support

## Form Submission Flow

1. User fills platform-specific form
2. Client-side Zod validation
3. Form data sent to `/api/telegram`
4. Server validates and formats message
5. File uploaded (if present)
6. Message sent to Telegram via bot API
7. Success modal shown to user
8. Form resets

## Telegram Message Format

```
📥 NEW ORDER

Platform: [platform name]
Name: [full name]
Phone: [phone]
Telegram: [@username]
Platform Name: [channel/profile name]
Profile Link: [url]
Design Type: [type]
Game: [if applicable]
Preview Name: [if applicable]
Additional Notes: [notes]
Date: [date]
Time: [time]

[File attachment if present]
```

## Validation Rules

- **Full Name**: 2-100 characters
- **Phone**: Optional, must be valid format if provided
- **Telegram Username**: Required, must be valid
- **Platform Name**: 1-100 characters
- **Design Type**: Required, platform-specific
- **File**: Optional, max 20MB, accepted formats: JPG, PNG, WebP, PDF, ZIP, RAR
- **Additional Notes**: Max 1000 characters

## Design System

### Colors
- **Primary**: #2563eb (Blue)
- **Background**: #ffffff (White)
- **Foreground**: #111827 (Dark Gray)
- **Border**: #e5e7eb (Light Gray)
- **Muted**: #6b7280 (Gray)

### Typography
- **Font**: Inter (system default)
- **Headings**: Bold weights
- **Body**: Regular weight, 16px line-height

### Spacing
- Uses Tailwind spacing scale
- Base unit: 4px (0.25rem)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in project settings
4. Deploy automatically on push

### Manual Deployment

```bash
pnpm build
pnpm start
```

## Error Handling

- **Validation Errors**: Client-side, shown inline in form
- **Submission Errors**: Modal with error message and retry option
- **Telegram API Errors**: Caught and displayed to user
- **File Upload Errors**: Size and format validation

## Performance

- Next.js automatic code splitting
- Image optimization
- CSS-in-JS with Tailwind
- Optimized for 95+ Lighthouse score
- Mobile-first responsive design

## Accessibility

- Semantic HTML
- ARIA labels for form fields
- Keyboard navigation support
- High contrast colors
- Readable font sizes

## Future Enhancements

- Email notifications
- Order history/dashboard
- Payment integration
- Multi-language support
- Automated responses
- Admin panel for order management

## Troubleshooting

### Telegram API Errors
- Verify BOT_TOKEN is correct
- Verify CHAT_ID is correct format (integer)
- Check bot has permission to send messages to chat

### Form Validation
- Check Zod schemas for field requirements
- Ensure file size < 20MB
- Verify file format is accepted

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Rebuild: `pnpm build`

## License

MIT

## Support

For issues or questions, contact via Telegram.
