# Sayt Haqida To'liq Hulas

## Sayt Nomi
**Dizayn Xizmatlari** - Elbek Professional Graphic Designer

## Firebase Konfiguratsiyasi
- **Project ID**: buyurtma-berish-uchun
- **Auth Domain**: buyurtma-berish-uchun.firebaseapp.com
- **Storage Bucket**: buyurtma-berish-uchun.firebasestorage.app
- **Realtime Database**: buyurtma-berish-uchun-default-rtdb.firebaseio.com

## Sayt Strukturasi va Sahifalari

### 1. Asosiy Sahifa (Home - /)
- **Hero Section**: Sizning professional portrait rasi + taqdimot matni
- **5 Xizmat Kartasi**: YouTube, Telegram, Instagram, TikTok, PUBG uchun dizaynlar
- **Afzalliklari Qismi**: 4 ta asosiy faydalar (tezlik, sifat, qo'llab-quvvatlash, reviziya)
- **Buyurtma Jarayoni**: 6 ta bosqichni tushuntiruvchi kartalar
- **Nima Uchun Meni Tanla**: 6 ta benefit + sizning portrait rasi
- **Men Haqimda Qismi**: Elbek haqida qisqacha ma'lumot
- **Tajriba Timeline**: 5 ta asosiy tarixiy o'smalar (2015-2024 yillari)
- **Featured Portfolio**: 6 ta eng yangi portfolio misollar
- **Aloqa Qismi**: Telegram va telefon bog'lash uchun tugmalar
- **CTA Section**: Buyurtma berish uchun asosiy tugmasi

### 2. Portfolio Sahifasi (/portfolio)
- **Public Portfolio Listing**: Barcha portfolio misollarni ko'rish
- **Search va Filtering**: Platform bo'yicha qidirish
- **Lazy Loading**: Tezroq yuklanish uchun rasm optimalashtirlandi
- **Detail Page** (/portfolio/[id]): Har bir portfolio item haqida to'liq ma'lumot

### 3. Buyurtma Sahifalari (/order)
- **Buyurtma Tanlash Sahifasi** (/order): 5 platformani tanlash
- **Platform Formlari** (/order/[platform]): 
  - YouTube, Telegram, Instagram, TikTok, PUBG uchun alohida shakllar
  - Real-time pricing display
  - Deadline tanlash (3 soat - 30 kun)
  - Google sign-in orqali foydalanuvchi ma'lumoti avval to'ldirilgan

### 4. Dashboard (Admin) - /dashboard
**Faqat tizimga kirganlar uchun**

#### Portfolio Management (/dashboard/portfolio)
- Portfolio itemlarni ro'yxati
- Qo'shish, tahrirlash, o'chirish imkoniyati
- Rasm yuklab olish Firebase Storage orqali
- Featured qilish/oqitish

#### Yangi Portfolio Qo'shish (/dashboard/portfolio/add)
- Title, description, platform, designType
- Rasm yuklab olish
- Featured flag
- Tags qo'shish

#### Pricing Management (/dashboard/pricing)
- Har bir platform + designType uchun narx sozlash
- Base price (UZS)
- Rush delivery price
- Real-time update

### 5. Autentifikatsiya
- **Google Sign-In**: Firebase Authentication orqali
- **Session Persistence**: Avtomatik saqlash
- **Protected Routes**: /order/* va /dashboard/* sahifalari faqat tizimga kirganlarga ochiq
- **User Profile**: Navigation'da profil dropdown

## Buyurtma Tizimi

### Forma Maydonlari (Barcha Platformalar)
1. **Shaxsiy Ma'lumot**
   - F.I.Sh (Google accountdan avval to'ldirilgan)
   - Telefon raqami
   - Telegram username

2. **Platforma Tafsiloti**
   - Platforma nomi
   - Profil havolasi

3. **Dizayn Tafsiloti**
   - Dizayn turi (platformaga qarab o'zgaradi)
   - Aloqa vaqti (3 soat - 30 kun) - **YANGI**
   - O'yin nomi (faqat YouTube uchun)
   - Ko'rinish nomi
   - Qo'shimcha eslatmalar

### Telegram Integration
- Barcha buyurtmalar Telegram'ga avtomatik yuboriladi
- Xabari quyidagilarni o'z ichiga oladi:
  - Platforma va dizayn turi
  - Foydalanuvchi ma'lumoti (ism, email, telefon)
  - Aloqa vaqti
  - Qo'shimcha eslatmalar
  - Yuborilgan vaqti

## Dynamic Pricing System

### Firestore Konfiguratsiyasi
**Collections**:
- `pricing` - Har bir platform+designType uchun narx
- `portfolio` - Portfolio misollar

### Pricing Strukturasi
```
{
  platform: "youtube",
  designType: "thumbnail",
  basePrice: 50000,  // UZS
  rushPrice: 70000,
  notes: "Tezkor yetkazish uchun"
}
```

### Order Formada Narx Ko'rsatish
- Real-time Firestore listener
- Tanlangan designType bo'yicha avtomatik narx yangilanadi
- Responsive pricing display

## Portfolio Management

### Portfolio Item Strukturasi
```
{
  title: "YouTube Thumbnail",
  description: "Professional thumbnail",
  platform: "youtube",
  designType: "thumbnail",
  imageUrl: "Firebase Storage URL",
  featured: true,
  createdAt: timestamp,
  tags: ["creative", "professional"]
}
```

### Featured Portfolio
- Homepage'da 6 ta featured item ko'rsatiladi
- Yangi portfolio qo'shilsa real-time update
- Kliklab detailed view ga o'tish mumkin

## Texnologiyalar va Ishlatiladigan Vositalar

### Frontend
- **Next.js 16**: App Router
- **React 19.2**: Hooks va state management
- **TypeScript**: Type safety
- **Tailwind CSS 4.2**: Styling
- **React Hook Form**: Form management
- **Zod**: Validation

### Backend & Database
- **Firebase Authentication**: Google Sign-In
- **Firestore**: Real-time database
- **Firebase Storage**: Rasm saqlash
- **Firebase Realtime Database**: Optional telemetry

### Components & Libraries
- **Framer Motion**: Animatsiyalar
- **Custom Components**: Button, Card, FormField, Modal, Timeline, CheckCard, ProcessCard
- **Image Optimization**: Next.js Image component

## Deployment

### Environment Variables (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
BOT_TOKEN=your_telegram_bot_token
CHAT_ID=your_telegram_chat_id
```

### Firebase Configuration
- **Auth Domain**: buyurtma-berish-uchun.firebaseapp.com
- **Project ID**: buyurtma-berish-uchun
- **Storage**: buyurtma-berish-uchun.firebasestorage.app

## Barcha Sahifalaning URL'lari

| Sahifa | URL | Tavsifi |
|--------|-----|---------|
| Bosh Sahifa | / | Asosiy landing page |
| Portfolio | /portfolio | Barcha portfolio misollar |
| Portfolio Detail | /portfolio/[id] | Portfolio item haqida |
| Buyurtma Tanlash | /order | Platform tanlash |
| YouTube Forma | /order/youtube | YouTube uchun forma |
| Telegram Forma | /order/telegram | Telegram uchun forma |
| Instagram Forma | /order/instagram | Instagram uchun forma |
| TikTok Forma | /order/tiktok | TikTok uchun forma |
| PUBG Forma | /order/pubg | PUBG uchun forma |
| Dashboard | /dashboard | Admin panel |
| Portfolio Management | /dashboard/portfolio | Portfolio boshqarish |
| Yangi Portfolio | /dashboard/portfolio/add | Portfolio qo'shish |
| Pricing Management | /dashboard/pricing | Narx sozlash |

## Dizayn Sistemasi

### Ranglar
- **Primary**: #2563eb (Blue)
- **Background**: #ffffff (White)
- **Foreground**: #111827 (Dark Gray)
- **Secondary**: #f3f4f6 (Light Gray)
- **Muted**: #e5e7eb (Border)

### Tipografiya
- **Font**: Inter (Google Fonts)
- **Heading**: Bold, 2xl-6xl
- **Body**: Regular, sm-lg

### Layout
- **Mobile-first** responsive design
- **Flexbox** asosiy layout usuli
- **Max-width**: 6xl (64rem)

## Xavfsizlik

### Firebase Security Rules
- **Auth**: Faqat tizimga kirganlarga ruxsat
- **Database**: Owner-only write access, public read
- **Storage**: Rassiz fayl yuklash qonun

### Input Validation
- Zod schemas har bir forma uchun
- XSS attack protection
- SQL injection prevention (Firestore orqali)

## Performance Optimizations
- Image lazy loading
- Code splitting
- Realtime listeners (efficient)
- Optimized bundle size

## Status: TAYYOR!
Sayt to'liq ishga tushunga tayyor. Faqat Firebase API key va Telegram bot token kerak!

