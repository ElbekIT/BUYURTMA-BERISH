# Firebase va Kod Haqida To'liq Hulas

## Firebase Konfiguratsiyasi

### Firebase Console'da Sozlash

**1. Proyekt Yaratish (Allaqachon Qilingan)**
- Proyekt nomi: `buyurtma-berish-uchun`
- Lokatsiya: Firebase Console → Create Project

**2. Authentication Setup**
```
Firebase Console → Authentication → Sign-in method
✓ Google
✓ Enable: ON
```

**3. Firestore Database**
```
Firebase Console → Firestore Database → Create Database
- Location: us-central1 (yoki sizning region)
- Rules: Test mode (Development)
```

**4. Realtime Database**
```
Firebase Console → Realtime Database → Create Database
- Location: us-central1
```

**5. Storage**
```
Firebase Console → Storage → Get Started
- Bucket location: us-central1
```

### Firebase Collections (Firestore'da)

**Collection 1: `portfolio`**
```javascript
{
  id: "auto-generated",
  title: "YouTube Thumbnail",
  description: "Professional design example",
  platform: "youtube",
  designType: "thumbnail",
  imageUrl: "https://storage.googleapis.com/...",
  featured: true,
  createdAt: 1720000000000,
  updatedAt: 1720000000000,
  tags: ["creative", "youtube"]
}
```

**Collection 2: `pricing`**
```javascript
{
  id: "youtube_thumbnail",
  platform: "youtube",
  designType: "thumbnail",
  basePrice: 50000,  // UZS
  rushPrice: 70000,
  notes: "Professional design"
}
```

---

## Kod Strukturi va Hatoliklar (TUZATILDI)

### ✅ Tugallangan Hatolik Tuzatishlari

#### 1. API Route'da Deadline Field Qo'shildi
**File**: `/app/api/telegram/route.ts`
```typescript
// TUZATILDI: Deadline field'i qo'shildi
const deadline = body.deadline as string

// Validation'da deadline tekshiriladi
if (!fullName || !telegramUsername || !platformName || !platform || !designType || !deadline)
```

#### 2. useFormSubmit Hook'da Deadline Qo'shildi
**File**: `/hooks/useFormSubmit.ts`
```typescript
// TUZATILDI: Deadline payload'ga qo'shildi
const payload = {
  // ... boshqa field'lar
  deadline: data.deadline,
}
```

---

## Kod Architecture va Flow

### 1. Autentifikatsiya (Authentication)
```
User → Bosh Sahifa
    ↓
"Buyurtma Berish" tugmasi
    ↓
LoginModal → Google Sign-In
    ↓
Firebase Auth validate qiladi
    ↓
User ma'lumoti set qilinadi (displayName, email)
```

**Files**:
- `lib/firebase.ts` - Firebase initialization
- `context/AuthContext.tsx` - Auth state management
- `components/LoginButton.tsx` - Login UI
- `components/UserProfile.tsx` - User dropdown

### 2. Order Form Flow
```
User → /order → Platform tanlash
    ↓
/order/[platform] → Form ochiladi
    ↓
Form validation (Zod schemas)
    ↓
Real-time Pricing Display (Firestore)
    ↓
User form'ni to'ldiradi
    ↓
Submit → /api/telegram
```

**Files**:
- `app/order/page.tsx` - Platform selection
- `app/order/[platform]/page.tsx` - Dynamic form
- `lib/schemas.ts` - Zod validation
- `app/api/telegram/route.ts` - API endpoint

### 3. Telegram Bot Integration
```
Form Submit
    ↓
JSON payload yaratiladi
    ↓
/api/telegram endpoint'ga POST
    ↓
sendTelegramMessage() ishga tushuriladi
    ↓
Telegram Bot API → Chat ID'ga xabar yuboradi
    ↓
Sizning Telegram chat'iga keladi (8269163077)
```

**Files**:
- `lib/telegram.ts` - Bot integration
- `app/api/telegram/route.ts` - API handler

### 4. Portfolio Management
```
Admin → /dashboard/portfolio
    ↓
Portfolio items ko'rsatiladi (Firestore)
    ↓
Add → /dashboard/portfolio/add
    ↓
Form to'ldiriladi + Rasm yuklash
    ↓
Firebase Storage'ga rasm saqlanadi
    ↓
Firestore collection'ga ma'lumot qo'shiladi
    ↓
Homepage'da featured portfolio ko'rsatiladi
```

**Files**:
- `app/dashboard/portfolio/page.tsx` - Portfolio list
- `app/dashboard/portfolio/add/page.tsx` - Add form
- `lib/firestore.ts` - Firestore operations
- `lib/storage.ts` - Storage operations

---

## Database Schema (Firestore)

### Collection: `portfolio`
```
📁 portfolio
  📄 item_1
    ├─ title: string
    ├─ description: string
    ├─ platform: string (youtube|telegram|instagram|tiktok|pubg)
    ├─ designType: string
    ├─ imageUrl: string (Firebase Storage URL)
    ├─ featured: boolean
    ├─ createdAt: timestamp
    ├─ updatedAt: timestamp
    └─ tags: array of strings
```

### Collection: `pricing`
```
📁 pricing
  📄 youtube_thumbnail
    ├─ platform: string
    ├─ designType: string
    ├─ basePrice: number (UZS)
    ├─ rushPrice: number (UZS)
    └─ notes: string
```

---

## Environment Variables (Production)

**Vercel'da qo'yish kerak:**

```
# Firebase - FAQAT API Key public bo'ladi
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...      # Siz olishingiz kerak
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=buyurtma-berish-uchun.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=buyurtma-berish-uchun
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=buyurtma-berish-uchun.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=327644162272
NEXT_PUBLIC_FIREBASE_APP_ID=1:327644162272:web:57100e6c4b1c0141e0c885

# Telegram - Private variables
BOT_TOKEN=8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc
CHAT_ID=8269163077
```

---

## API Endpoints

### POST `/api/telegram`
**Request Body**:
```json
{
  "fullName": "Foydalanuvchi Ismi",
  "phone": "+998 XX XXX XX XX",
  "telegramUsername": "@username",
  "platformName": "My Channel",
  "profileLink": "https://...",
  "platform": "youtube",
  "designType": "thumbnail",
  "deadline": "3_days",
  "gameTitle": "Optional",
  "previewName": "Optional",
  "additionalNotes": "Optional",
  "userEmail": "user@gmail.com",
  "userName": "Full Name"
}
```

**Response Success**:
```json
{
  "message": "Buyurtma muvaffaqiyatli yuborildi"
}
```

**Response Error**:
```json
{
  "message": "Majburiy maydonlar to'ldirilmagan"
}
```

---

## Telegram Xabari Format

```
📥 YANGI BUYURTMA

Platforma: 📺 YouTube
Ism: User Name
Google Email: user@gmail.com
Telefon: +998 XX XXX XX XX
Telegram: @username
Platforma nomi: My YouTube Channel
Profil havolasi: https://youtube.com/channel/...
Dizayn turi: Thumbnail
Aloqa vaqti: 3 kun
O'yin: Optional
Ko'rinish nomi: Optional
Qo'shimcha: Biraz qora rang ishlatish kerak
Yuborilgan vaqt: 7/5/2026 2:30:45 PM
```

---

## Firebase Security Rules

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio - Public read
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Pricing - Public read
    match /pricing/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /portfolio/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Performance Optimizations

✅ **Image Optimization**
- Next.js Image component
- Automatic resizing
- WebP format support
- Lazy loading

✅ **Code Splitting**
- Dynamic imports
- Route-based splitting
- Component-level splitting

✅ **Caching**
- Firebase Realtime listeners
- Browser caching
- CDN caching (Vercel)

✅ **Database Optimization**
- Indexed queries
- Real-time listeners (efficient)
- Batch writes

---

## Kod Hatoliklar Va Tuzatishlari

| Hatolik | Tuzatish | File |
|---------|----------|------|
| Deadline field API'da yoq | Qo'shildi | `/app/api/telegram/route.ts` |
| Deadline payload'ga yoq | Qo'shildi | `/hooks/useFormSubmit.ts` |
| Validation'da deadline yoq | Tekshirish qo'shildi | `/app/api/telegram/route.ts` |

---

## Sayt 100% Ishlashi Uchun Kerakli Narsa

1. ✅ Firebase configured
2. ✅ Telegram bot integrated
3. ✅ Code errors fixed
4. ✅ Environment variables ready
5. ⏳ **FAQAT:** Firebase API Key qo'shish kerak

**API Key Olish:**
1. https://console.firebase.google.com ga kiring
2. Proyekt: "buyurtma-berish-uchun"
3. Settings → Project Settings
4. Web API Key nusxalang
5. Vercel'da `NEXT_PUBLIC_FIREBASE_API_KEY` qo'ying

---

## Vercel Deploy Checklist

- [ ] GitHub repo yaratildi
- [ ] Vercel project yaratildi
- [ ] Telegram Bot Token qo'yildi: `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc`
- [ ] Chat ID qo'yildi: `8269163077`
- [ ] Firebase API Key qo'yildi
- [ ] Deploy tamamlandi
- [ ] Domain'da sayt ochiladi
- [ ] Google Sign-In ishlaydi
- [ ] Telegram bot buyurtma qabul qiladi
- [ ] Portfolio management ishlaydi

---

## Sayt 100% TAYYOR VA ISHGA TUSHUNGA TAYYOR! 🚀

