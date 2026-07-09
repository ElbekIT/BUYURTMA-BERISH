# Keen Platform - Setup Guide

## Quick Start

This guide will help you get the Keen platform up and running with Firebase.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a new project"
3. Enter project name: "Keen" (or your preference)
4. Enable Google Analytics (optional)
5. Create the project

## Step 2: Set Up Firebase Services

### Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Save

### Create Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a region close to you
5. Create database

### Set Up Cloud Storage
1. Go to **Storage**
2. Click **Get Started**
3. Choose **Start in test mode**
4. Select the same region as Firestore
5. Create bucket

### Configure Security Rules

#### Firestore Rules
Go to **Firestore** → **Rules** and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create, update: if request.auth.uid == userId;
    }

    // Portfolios
    match /portfolios/{document=**} {
      allow read: if resource.data.published == true || request.auth.uid == resource.data.userId;
      allow create, update, delete: if request.auth.uid == resource.data.userId;
    }

    // Orders
    match /orders/{document=**} {
      allow read, update: if request.auth.uid == resource.data.clientId || request.auth.uid == resource.data.ownerId;
      allow create: if request.auth.uid == request.resource.data.clientId;
    }

    // Services
    match /services/{document=**} {
      allow read;
      allow create, update, delete: if request.auth.uid == resource.data.userId;
    }

    // Messages
    match /messages/{document=**} {
      allow read: if request.auth.uid in resource.data.participants;
      allow create: if request.auth.uid == request.resource.data.senderId;
    }

    // Notifications
    match /notifications/{document=**} {
      allow read, update: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

#### Cloud Storage Rules
Go to **Storage** → **Rules** and replace with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolios/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId && request.resource.size < 10485760;
    }
  }
}
```

## Step 3: Get Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **Your apps** section
3. Click on the web app icon (</> )
4. Copy the Firebase config object

Your config will look like:
```javascript
{
  apiKey: "xxxxx",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "xxxxx",
  appId: "xxxxx"
}
```

## Step 4: Configure Environment Variables

In the project root, create or edit `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_apiKey
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_authDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_projectId
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=your_appId
```

## Step 5: Run Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open http://localhost:3000 in your browser.

## Step 6: Test the Application

### Create Test User
1. Go to http://localhost:3000/signup
2. Create an account (e.g., designer@test.com)
3. You can create a second account for testing client flow

### Test Provider Flow
1. Sign in as provider
2. Go to Dashboard
3. Create a Portfolio
4. Add images (they'll upload to Firebase Cloud Storage)
5. Publish the portfolio

### Test Client Flow
1. Sign in as client (or new account)
2. Go to Browse Portfolios (/explore)
3. Click on a portfolio
4. Place an order
5. View order in My Orders
6. Send messages to provider

## Deployment to Vercel

### Connect Repository
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository

### Add Environment Variables
1. In Vercel Project Settings → Environment Variables
2. Add all 6 Firebase environment variables
3. Redeploy

### Update CORS (if needed)
If you get CORS errors with images, update Cloud Storage CORS:

1. Create a `cors.json` file:
```json
[
  {
    "origin": ["https://your-vercel-domain.vercel.app"],
    "method": ["GET"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
```

2. Run in terminal:
```bash
gsutil cors set cors.json gs://your-project.appspot.com
```

## Troubleshooting

### Firebase Authentication Not Working
- Check that Email/Password is enabled in Authentication settings
- Verify environment variables are correct
- Check browser console for error messages

### Images Not Uploading
- Verify Cloud Storage bucket exists and is in test mode
- Check that user has permission to upload (Firebase Rules)
- Ensure file is under 10MB

### Messages Not Sending
- Check that both users exist in database
- Verify Firestore security rules allow message creation
- Check browser console for errors

### Orders Not Appearing
- Verify both users are authenticated
- Check that order was created (look in Firestore Console)
- Ensure notification document exists

## Database Schema

All collections and their fields are defined in the Firebase Rules above. Key collections:

- **users** - User profiles and info
- **portfolios** - Portfolio pieces with images
- **services** - Services offered by providers
- **orders** - Orders from clients
- **messages** - Chat messages between users
- **notifications** - Real-time notifications

## Next Steps

1. Customize branding and colors
2. Add payment processing (Stripe)
3. Implement reviews and ratings
4. Add email notifications
5. Create admin dashboard
6. Set up analytics

## Support

For issues:
1. Check browser console for errors
2. Look at Firestore Console for data issues
3. Review Firebase Cloud Logs
4. Check Security Rules if permissions are denied

## Production Checklist

- [ ] Update Firebase Security Rules (remove test mode)
- [ ] Enable Firestore backups
- [ ] Set up monitoring and alerts
- [ ] Configure custom domain
- [ ] Enable HTTPS everywhere
- [ ] Set up error tracking (Sentry)
- [ ] Configure email notifications
- [ ] Load test the application
- [ ] Set up analytics
- [ ] Document API endpoints

Good luck building with Keen!
