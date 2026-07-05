# Saytni Ishga Tushirish (Setup) Ko'rsatmalari

## Qadam 1: Loyihani Yuklab Olish
```bash
git clone <your-repo-url>
cd <project-directory>
pnpm install
```

## Qadam 2: Firebase Konfiguratsiyasi

### 2.1 .env.local Fayliga Qo'shish
```bash
# Firebase Configuration - Sizning proyektingizdan oling
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...   # Firebase Console dan
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN      # @BotFather dan
CHAT_ID=YOUR_TELEGRAM_CHAT_ID          # /start qilib oling
```

### 2.2 Firebase Console Sozlamalari
1. https://console.firebase.google.com/ ga kiring
2. **Proyektni tanlang**: buyurtma-berish-uchun
3. **Authentication**:
   - Google Sign-In ni enable qilish
4. **Firestore Database**:
   - Collections yaratish:
     - `pricing`
     - `portfolio`
5. **Storage**:
   - Firebase Storage ni enable qilish

## Qadam 3: Telegram Bot Sozlash

### 3.1 Bot Token Olish
1. @BotFather ga Telegram'da yozing
2. `/newbot` komandasini kiriting
3. Bot nomini va username'ni belgilang
4. Token'ni olib, .env.local'ga qo'ying

### 3.2 Chat ID Olish
1. Yangi bot'ingizga `/start` yozing
2. https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates ni browser'da oching
3. `chat.id` qiymatini nusxalang
4. `.env.local`'ga `CHAT_ID=...` qo'ying

## Qadam 4: Ishga Tushirish

### Development Rejimi
```bash
pnpm dev
# Sayt: http://localhost:3000
```

### Production Uchun Build
```bash
pnpm build
pnpm start
```

## Qadam 5: Firebase Collection'larini Sozlash

### Pricing Collection Strukturi
```
Collection: pricing
Documents:
{
  id: "youtube_thumbnail",
  platform: "youtube",
  designType: "thumbnail",
  basePrice: 50000,
  rushPrice: 70000,
  notes: "Professional thumbnail"
}
```

### Portfolio Collection Strukturi
```
Collection: portfolio
Documents:
{
  id: "auto-generated",
  title: "YouTube Thumbnail Example",
  description: "Professional design",
  platform: "youtube",
  designType: "thumbnail",
  imageUrl: "https://...",
  featured: true,
  createdAt: <timestamp>,
  updatedAt: <timestamp>,
  tags: ["creative", "youtube"]
}
```

## Qadam 6: Admin Dashboard'ga Kirish

1. **http://localhost:3000** ga kiring
2. "Buyurtma Berish" tugmasini bosing
3. Google orqali kirish
4. **/dashboard** ga o'ting (admin)
5. Portfolio qo'shish va narx sozlash

## Muhim URLs

### Development
- Bosh Sahifa: http://localhost:3000
- Portfolio: http://localhost:3000/portfolio
- Order: http://localhost:3000/order
- Dashboard: http://localhost:3000/dashboard

### Production
- Domain'ingizni Vercel ga ulang
- https://yourdomain.com

## Environment Variables Checklist

- [ ] NEXT_PUBLIC_FIREBASE_API_KEY
- [ ] BOT_TOKEN
- [ ] CHAT_ID

## Vercel'ga Deploy Qilish

### 1. GitHub'a Push Qilish
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel'da Proyekt Yaratish
1. https://vercel.com/dashboard ga kiring
2. "Add New" → "Project"
3. GitHub repo'ni tanlang
4. Environment variables qo'shish:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - BOT_TOKEN
   - CHAT_ID

### 3. Deploy Qilish
- Vercel avtomatik ishga tushiradi
- URL olishingiz mumkin

## Testing

### Buyurtma Tizimini Test Qilish
1. Google accountdan kirish
2. Order formani to'ldirish
3. Telegram'da xabar tekshirish
4. Dashboard'dan portfolio qo'shish

### Portfolio Management
1. /dashboard/portfolio ga o'tish
2. Yangi portfolio qo'shish
3. /portfolio'da ko'rish

## Muammo Yechish

### Firebase Not Configured
- .env.local'ni tekshiring
- API key to'g'riligi'ni tekshiring

### Telegram Xabar Kelmasin
- Bot token'ni tekshiring
- Chat ID to'g'riligi'ni tekshiring
- @BotFather'da bot.setprivacy'ni tekshiring

### Rasm Yuklanmasa
- Firebase Storage Rules'ni tekshiring
- Rasm format'ini tekshiring (jpg, png, webp)

## Sayt Features Summary

✅ Google Sign-In Authentication
✅ 5 Platform uchun Buyurtma Formlari
✅ Real-time Dynamic Pricing
✅ Portfolio Management Dashboard
✅ Telegram Bot Integration
✅ Firestore Database
✅ Firebase Storage
✅ Mobile Responsive Design
✅ Professional UI/UX
✅ Timeline animatsiyalari

## Support
Muammo bo'lsa, Firebase Console va dev server logs'ni tekshiring!

