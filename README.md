# Keen - Portfolio & Orders Platform

A modern platform for creative professionals to showcase their portfolios and receive orders from clients. Built with Next.js 16, Firebase, and Tailwind CSS.

## Features

### For Clients
- **Browse Portfolios**: Discover talented designers and creative professionals
- **View Portfolio Details**: See project images, descriptions, and available services
- **Place Orders**: Create custom orders with flexible service selection and descriptions
- **Track Orders**: Monitor order status in real-time (pending, accepted, in progress, completed)
- **Real-time Messaging**: Chat directly with service providers
- **Notifications**: Receive instant updates about order status changes

### For Service Providers
- **Manage Portfolios**: Create, edit, and publish portfolio pieces
- **Upload Images**: Add up to 5 images per portfolio piece to Firebase Cloud Storage
- **Define Services**: Set up predefined services with pricing
- **Dashboard**: View statistics about orders and portfolios
- **Order Management**: Accept, decline, or update the status of incoming orders
- **Client Communication**: Message clients in real-time
- **Notifications**: Get alerted when new orders arrive

### Core Features
- **Real-time Database**: Firestore for instant data synchronization
- **Image Storage**: Firebase Cloud Storage for portfolio images
- **Authentication**: Firebase Authentication with email/password
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode**: Built-in light/dark mode support
- **Real-time Notifications**: Instant alerts for orders and messages

## Tech Stack

- **Frontend**: Next.js 16 (App Router)
- **Backend**: Firebase (Firestore, Authentication, Cloud Storage)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Database**: Firestore with real-time listeners

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Firebase project with:
  - Authentication enabled
  - Firestore database
  - Cloud Storage

### Environment Variables

Add these environment variables to your `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup

### Firestore Collections

The app uses the following Firestore collections:

#### Users
```typescript
{
  id: string (uid)
  email: string
  name: string
  role: 'client' | 'provider'
  bio: string (optional)
  createdAt: timestamp
}
```

#### Portfolios
```typescript
{
  id: string (auto)
  userId: string
  ownerName: string
  ownerEmail: string
  title: string
  description: string
  details: string (optional)
  images: string[] (URLs to Cloud Storage)
  rating: number
  published: boolean
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Orders
```typescript
{
  id: string (auto)
  clientId: string
  clientEmail: string
  ownerId: string
  serviceId: string (optional)
  customDescription: string
  budget: number (optional)
  deadline: timestamp
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Services
```typescript
{
  id: string (auto)
  userId: string
  name: string
  description: string
  price: number
  createdAt: timestamp
}
```

#### Messages
```typescript
{
  id: string (auto)
  senderId: string
  senderEmail: string
  recipientId: string
  recipientEmail: string
  text: string
  participants: string[]
  createdAt: timestamp
}
```

#### Notifications
```typescript
{
  id: string (auto)
  userId: string
  type: string
  message: string
  read: boolean
  createdAt: timestamp
}
```

### Firebase Security Rules

#### Firestore Security Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - can read own, write own
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == request.resource.data.id;
      allow update: if request.auth.uid == userId;
    }

    // Portfolios - public read for published, owner can edit
    match /portfolios/{document=**} {
      allow read: if resource.data.published == true;
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    // Orders - owner and client can read/write
    match /orders/{document=**} {
      allow read: if request.auth.uid == resource.data.clientId || request.auth.uid == resource.data.ownerId;
      allow create: if request.auth.uid == request.resource.data.clientId;
      allow update: if request.auth.uid == resource.data.clientId || request.auth.uid == resource.data.ownerId;
    }

    // Services - public read, owner can edit
    match /services/{document=**} {
      allow read;
      allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    // Messages - participants can read/write
    match /messages/{document=**} {
      allow read: if request.auth.uid in resource.data.participants;
      allow create: if request.auth.uid == request.resource.data.senderId;
    }

    // Notifications - user can read own
    match /notifications/{document=**} {
      allow read, update: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

#### Cloud Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload to their own portfolio folder
    match /portfolios/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId && request.resource.size < 10485760;
    }
  }
}
```

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── explore/             # Browse portfolios
│   ├── portfolio/
│   │   ├── [id]/            # Portfolio detail
│   │   ├── [id]/edit/       # Edit portfolio
│   │   └── create/          # Create new portfolio
│   ├── order/
│   │   ├── page.tsx         # Create order
│   │   └── [id]/            # Order detail
│   ├── my-orders/           # Client's orders
│   ├── orders-received/     # Provider's received orders
│   ├── messages/            # Real-time messaging
│   └── dashboard/           # Provider dashboard
├── components/
│   ├── navigation.tsx       # Navigation bar
│   ├── notifications.tsx    # Notifications dropdown
│   └── ui/                  # shadcn UI components
├── lib/
│   ├── firebase.ts          # Firebase configuration
│   ├── types.ts             # TypeScript types
│   └── auth-context.tsx     # Auth context provider
└── public/                  # Static assets
```

## Key Pages

### Client User Flow
1. **Landing Page** (`/`) - Introduction and CTAs
2. **Explore** (`/explore`) - Browse all published portfolios
3. **Portfolio Detail** (`/portfolio/[id]`) - View full portfolio and services
4. **Create Order** (`/order?portfolioId=...`) - Place an order
5. **My Orders** (`/my-orders`) - Track personal orders
6. **Messages** (`/messages`) - Chat with service providers

### Provider User Flow
1. **Dashboard** (`/dashboard`) - Overview of portfolios and orders
2. **Create Portfolio** (`/portfolio/create`) - Add new portfolio
3. **Edit Portfolio** (`/portfolio/[id]/edit`) - Update existing portfolio
4. **Orders Received** (`/orders-received`) - Manage incoming orders
5. **Messages** (`/messages`) - Chat with clients

## Real-time Features

### Firebase Listeners
- **Portfolio updates**: Real-time changes to portfolio data
- **Order status**: Instant updates when order status changes
- **Messages**: Real-time message delivery
- **Notifications**: Instant notifications for new orders and status changes

### Auto-cleanup
All Firestore listeners are properly cleaned up when components unmount to prevent memory leaks.

## Development

### Run tests
```bash
pnpm test
```

### Build for production
```bash
pnpm build
```

### Deploy to Vercel
```bash
vercel deploy
```

## Deployment Considerations

1. **Environment Variables**: Set Firebase credentials in Vercel project settings
2. **CORS**: Ensure Firebase Cloud Storage CORS is properly configured for your domain
3. **Security**: Review Firebase security rules before deploying
4. **Rate Limiting**: Consider adding rate limiting for API calls

## Future Enhancements

- Payment processing (Stripe integration)
- Review and rating system
- Advanced search and filtering
- Portfolio analytics
- Order timeline with milestones
- File attachment support
- Email notifications
- Admin dashboard

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
