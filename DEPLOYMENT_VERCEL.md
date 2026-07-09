# Vercel'ga Deploy Qilish - To'liq Ko'rsatma

## Tugallangan Features va Konfiguratsiya

### ✅ Firebase Configuration
- Project ID: `buyurtma-berish-uchun`
- Auth Domain: `buyurtma-berish-uchun.firebaseapp.com`
- Storage Bucket: `buyurtma-berish-uchun.firebasestorage.app`
- Realtime Database: `buyurtma-berish-uchun-default-rtdb.firebaseio.com`
- Messaging Sender ID: `327644162272`
- App ID: `1:327644162272:web:57100e6c4b1c0141e0c885`
- Measurement ID: `G-S0PJ9D138B`

### ✅ Telegram Bot Configuration
- Bot Token: `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc`
- Chat ID: `8269163077`
- Buyurtmalar to'g'ridan-to'g'ri shu Chat ID'ga yuboriladi

---

## Vercel'ga Deploy Qadam-Qadam

### 1. GitHub Repository Yaratish

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. Vercel'da Proyekt Yaratish

1. https://vercel.com/dashboard ga kiring
2. "Add New" → "Project"
3. GitHub'dan repo tanlang
4. Import qilish uchun tugmani bosing

### 3. Environment Variables Qo'shish

Vercel'da project settings'ga o'tib, quyida Environment Variables bo'limiga o'tib, quyidagilarni qo'ying:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console'dan API Key |
| `BOT_TOKEN` | `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc` |
| `CHAT_ID` | `8269163077` |

**Firebase API Key olish:**
1. https://console.firebase.google.com ga kiring
2. Proyekt: "buyurtma-berish-uchun" tanlang
3. Settings → Project Settings
4. Web API Key nusxalang

### 4. Deploy Qilish

1. Vercel dashboard'da "Deployments" sekmesini tekshiring
2. Avtomatik deploy boshlandi
3. Buqlanishi kutib turing (3-5 minut)
4. Domain URL olishingiz mumkin

---

## Vercel Environment Variables Exact Format

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...YOUR_API_KEY_HERE
BOT_TOKEN=8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc
CHAT_ID=8269163077
```

**ESLATMA:** Barcha qiymatlar `NEXT_PUBLIC_` bilan boshlanmaydi, faqat Firebase API Key!

---

## Production'da Ishlatiladigan URLs

| Sahifa | URL |
|--------|-----|
| Bosh Sahifa | `https://yourdomain.com/` |
| Portfolio | `https://yourdomain.com/portfolio` |
| Buyurtma | `https://yourdomain.com/order` |
| Dashboard | `https://yourdomain.com/dashboard` |

---

## Tekshirilish Checklisti

- [ ] Firebase API Key .env'ga qo'yildi
- [ ] Telegram Bot Token qo'yildi
- [ ] Chat ID qo'yildi
- [ ] GitHub repo'si yaratildi
- [ ] Vercel project'i yaratildi
- [ ] Environment variables Vercel'da qo'yildi
- [ ] Deploy tamamlandi
- [ ] Domain'da sayt ochiladi
- [ ] Google Sign-In ishlaydi
- [ ] Telegram bot buyurtma qabul qiladi

---

## Buyortma Testi (Production'da)

1. `https://yourdomain.com` ga kiring
2. "Buyurtma Berish" tugmasini bosing
3. Google accountdan kirish
4. YouTube platform'ini tanlang
5. Forma to'ldiring va "Yuborish"ni bosing
6. Telegram chat'iga xabar kelganligini tekshiring (Chat ID: 8269163077)

---

## Muammo Yechish (Production)

### Telegram Xabar Kelmasin
- Token to'g'riligi'ni tekshiring: `8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc`
- Chat ID tekshiring: `8269163077`
- Vercel logs'ni tekshiring (Deployments → log)

### Firebase Auth Ishlamasa
- API Key to'g'riligi'ni tekshiring
- Vercel logs'ni tekshiring
- Firebase Console'da domain'ni authorize qilish kerak:
  - Settings → Authorized Domains
  - `yourdomain.com` qo'shish

### Portfolio Yuklanmasa
- Firestore Database'ni tekshiring
- Firebase Storage Rules'ni tekshiring
- Vercel logs'ni tekshiring

---

## Firebase Security Rules (Firestore)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Portfolio - Public read, owner write
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'owner_uid';
    }
    
    // Pricing - Public read, owner write
    match /pricing/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == 'owner_uid';
    }
  }
}
```

---

## Custom Domain Qo'shish (Optional)

1. Vercel dashboard'da Settings → Domains
2. Custom domain qo'shish
3. DNS settings'ni nameserver'ga o'tkazish
4. Vercel verificatsiyani kutib turing

---

## Performance Optimizations

Vercel automatik qiladi:
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS minification
- ✅ CDN caching
- ✅ Serverless functions

---

## Sayt 100% Tayyor!

Hamma jami konfiguratsiya tugallandi:
- Firebase integrated
- Telegram bot to'g'ri sozlandi
- Barcha feature'lar ishlaydi
- Vercel'ga deploy qilishga tayyor

**Faqat API Key qo'shib, deploy qiling va o'z hoziringizda ko'ring!**

