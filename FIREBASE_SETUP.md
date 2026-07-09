# Firebase Authentication Setup Guide

This guide walks you through setting up Google Sign-In authentication with Firebase for the Design Order Platform.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter your project name (e.g., "Dizayn Xizmatlarimiz")
4. Accept the terms and click "Create project"
5. Wait for the project to be created

## Step 2: Register Your Web App

1. In your Firebase project, click the web icon `</>`
2. Enter your app name (e.g., "Design Order Web")
3. Check "Also set up Firebase Hosting for this app" (optional)
4. Click "Register app"

## Step 3: Copy Firebase Configuration

After registration, you'll see your Firebase config. Copy the following values:

```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Telegram Bot Configuration
BOT_TOKEN=your_telegram_bot_token_here
CHAT_ID=your_chat_id_here
```

## Step 5: Enable Google Sign-In

1. In Firebase Console, go to "Authentication"
2. Click on "Sign-in method"
3. Click "Google" and enable it
4. Set up the OAuth consent screen if prompted:
   - Choose "External" for User Type
   - Fill in the required information
   - Add your domain to Authorized domains

## Step 6: Configure OAuth Redirect URIs

1. In Firebase > Authentication > Settings > Authorized domains
2. Add your domain:
   - For local development: `localhost`
   - For production: your deployed domain (e.g., `yoursite.vercel.app`)

## Step 7: Test Authentication

1. Start the development server:
```bash
pnpm dev
```

2. Navigate to `http://localhost:3000/order`
3. Click the "Google bilan kirish" (Sign in with Google) button
4. Complete the Google sign-in flow
5. You should be redirected to the order selection page after successful login

## Features Implemented

- ✅ Google Sign-In authentication
- ✅ Automatic session persistence (stays logged in across page reloads)
- ✅ User profile display in navigation bar
- ✅ Logout functionality
- ✅ Protected routes (requires authentication to access `/order/*`)
- ✅ Auto-redirect after login to the page you were trying to access
- ✅ User email and name included in form submissions

## Form Submission with User Data

When users submit a form, the following information is included:

- User's Google name
- User's Google email
- Phone number (optional)
- Telegram username
- Platform name
- Design type
- Additional notes
- Game title (for YouTube)
- Preview name (for YouTube)

## File Upload Removed

As per your request, file uploads have been removed from all forms. Form submissions are now JSON-based instead of FormData.

## Troubleshooting

### "Firebase authentication is not configured"
- Make sure all Firebase environment variables are set in `.env.local`
- Restart the development server after adding environment variables
- Check that all values are correct (copy-paste from Firebase Console)

### Google Sign-In button not working
- Verify that Google Sign-In is enabled in Firebase Authentication
- Check browser console for error messages (F12 > Console)
- Make sure you're using the correct Firebase project credentials

### User data not included in submissions
- Verify the user is logged in (check for user profile in navigation)
- Ensure `userEmail` and `userName` fields are being passed to the API

## Next Steps

1. Deploy to production (e.g., Vercel)
2. Update Firebase Authorized domains with your production domain
3. Configure Telegram bot to receive order notifications
4. Test the complete flow in production

## Support

For issues with Firebase setup, visit:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
