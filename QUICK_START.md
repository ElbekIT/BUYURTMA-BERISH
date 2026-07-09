# Quyosh Tezkor Boshlash (Quick Start)

## Telegram Bot Tafsilotlari
- **Bot Token**: `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc`
- **Chat ID**: `8269163077`
- **Bot Username**: @your_bot_username

## Saytni Ishga Tushirish (3 ta qadam)

### 1. .env.local Fayli Yaratish
Proyekt root'ida `.env.local` fayli yarating va quyidagini qo'ying:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=buyurtma-berish-uchun.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=buyurtma-berish-uchun
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=buyurtma-berish-uchun.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=327644162272
NEXT_PUBLIC_FIREBASE_APP_ID=1:327644162272:web:57100e6c4b1c0141e0c885

# Telegram Bot (Allaqachon sozlangan)
BOT_TOKEN=8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc
CHAT_ID=8269163077
```

### 2. Dependencies Yuklash
```bash
pnpm install
```

### 3. Dev Server Ishga Tushirish
```bash
pnpm dev
```

Browser'da oching: **http://localhost:3000**

---

## Saytning URL'lari

| Turi | URL | Tavsif |
|------|-----|--------|
| Bosh Sahifa | / | Landing page |
| Portfolio | /portfolio | Portfolio ga'leryasi |
| Buyurtma | /order | Buyurtma formasi |
| Dashboard | /dashboard | Admin panel |

---

## Firebase API Key Olish

1. https://console.firebase.google.com ga kiring
2. Proyekt tanlang: **buyurtma-berish-uchun**
3. Settings → Project Settings
4. API key'ni nusxalang va `.env.local`'ga qo'ying

---

## Test Qilish

1. http://localhost:3000 ga kiring
2. "Buyurtma Berish" tugmasini bosing
3. Google accountdan kirish
4. YouTube platform'ini tanlang va forma to'ldiring
5. Telegram'da xabar kelganligini tekshiring (Chat ID: 8269163077)

---

## Buyurtma Texti (Telegram'da Ko'rinadigan)

Har bir buyurtma quyidagi format'da keladi:

```
📥 YANGI BUYURTMA

Platforma: 📺 YouTube
Ism: Foydalanuvchi Ismi
Google Email: user@gmail.com
Telefon: +998 XX XXX XX XX
Telegram: @username
Platforma nomi: My Channel
Profil havolasi: https://youtube.com/channel/...
Dizayn turi: Thumbnail
Aloqa vaqti: 3 kun
Qo'shimcha: Biraz qora rang ishlatish kerak
Yuborilgan vaqt: 5/7/2026 2:30:45 PM
```

---

## Muammo Yechish

### Buyurtma Telegram'ga Kelmasin?
- Token'ni tekshiring: `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc`
- Chat ID tekshiring: `8269163077`
- Dev server logs'ni tekshiring: `pnpm dev`

### Firebase Auth Ishlamasa
- API key to'g'riligi'ni tekshiring
- Network connection tekshiring
- Firestore Database'ni tekshiring

### Rasm Yuklanmasa
- Firebase Storage Rules'ni tekshiring
- Rasm format'ini tekshiring (jpg, png, webp)
- File size tekshiring (20MB dan kam)

---

## Production'ga Deploy (Vercel)

1. GitHub'a push qilish
2. Vercel'da environment variables qo'shish:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - BOT_TOKEN=8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc
   - CHAT_ID=8269163077

---

## Sayt Tayyor!
Barcha feature'lar ishga tushunga tayyor. Faqat Firebase API key qo'shing va o'z hoziringizda ishga tushiring!

