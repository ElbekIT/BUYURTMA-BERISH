'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/Button'
import { Card, CardDescription, CardTitle } from '@/components/Card'
import { Timeline } from '@/components/Timeline'
import { CheckCard } from '@/components/CheckCard'
import { ProcessCard } from '@/components/ProcessCard'
import { FeaturedPortfolio } from '@/components/FeaturedPortfolio'

export default function Page() {
  const services = [
    {
      id: 'youtube',
      title: '📺 YouTube',
      description: "Thumbnail, banner va boshqa YouTube dizaynlari",
      href: '/order/youtube',
    },
    {
      id: 'telegram',
      title: '✈️ Telegram',
      description: 'Logo, banner, avatar va stiker dizaynlari',
      href: '/order/telegram',
    },
    {
      id: 'instagram',
      title: '📷 Instagram',
      description: 'Post, story va profil dizaynlari',
      href: '/order/instagram',
    },
    {
      id: 'tiktok',
      title: '🎵 TikTok',
      description: 'Profil va cover video dizaynlari',
      href: '/order/tiktok',
    },
    {
      id: 'pubg',
      title: '🎮 PUBG',
      description: 'Clan logo va team banner dizaynlari',
      href: '/order/pubg',
    },
  ]

  const advantages = [
    {
      title: 'Tez Yetkazish',
      description: 'Ko‘pchilik buyurtmalarni 24 soat ichida yetkazamiz',
    },
    {
      title: 'Yuqori Sifat',
      description: 'Har bir ish professional darajada tekshiriladi',
    },
    {
      title: 'Doimiy Qo‘llab-quvvatlash',
      description: 'Savollaringizga tez javob va maslahat beramiz',
    },
    {
      title: 'Reviziyalar Kafolati',
      description: 'Istalgan o‘zgartirishlar amalga oshiriladi',
    },
  ]

  const orderingProcess = [
    {
      number: 1,
      title: 'Buyurtma berish',
      description: "Shaklni to‘ldiring va dizayn turini belgilang",
      icon: '📝',
    },
    {
      number: 2,
      title: 'Tasdiqlash',
      description: "Buyurtma tekshiriladi va boshlash uchun tasdiqlanadi",
      icon: '✅',
    },
    {
      number: 3,
      title: 'Ishlab chiqish',
      description: 'Mutaxassislar talablaringiz asosida dizayn yaratadi',
      icon: '🎨',
    },
    {
      number: 4,
      title: 'Reviziya',
      description: "Sizdan fikr olib, kerakli o'zgartirishlar kiritiladi",
      icon: '🔄',
    },
    {
      number: 5,
      title: 'Tayyorlash',
      description: 'Yakuniy fayllar tayyorlanib topshiriladi',
      icon: '📥',
    },
    {
      number: 6,
      title: 'NATIJA',
      description: 'Sizning kanalingiz yoki profilingiz yangilanadi',
      icon: '🚀',
    },
  ]

  const whyChooseMe = [
    '8+ yillik grafik dizayn tajribasi',
    'Tez va ishonchli xizmat',
    'Cheksiz reviziyalar (shartlar bilan)',
    'Zamonaviy va optimallashtirilgan dizaynlar',
    'Professional va ijodiy yondashuv',
    'Barcha platformalar uchun moslashtirilgan',
  ]

  const timeline = [
    {
      year: 2015,
      title: 'CorelDRAW bilan boshlash',
      description: "Grafik dizaynni o'rganib, ilk loyihalarni yaratish",
    },
    {
      year: 2017,
      title: 'Photoshop va Illustrator',
      description: "Adobe vositalarida professional ko'nikmalar hosil bo'ldi",
    },
    {
      year: 2019,
      title: 'Freelance faoliyati',
      description: "YouTube va Telegram uchun dizaynlarni yetkazish boshlandi",
    },
    {
      year: 2021,
      title: 'Web va UI/UX',
      description: "Veb dizayn va foydalanuvchi interfeyslariga e'tibor qaratildi",
    },
    {
      year: 2024,
      title: 'Mutaxassislik va jamoa',
      description: "Professional xizmatlar ko'lamini kengaytirib, ko'plab loyihalarni yakunladim",
    },
  ]

  return (
    <>
      <Head>
        <title>Elbek — Professional Dizayn Xizmatlari | YouTube, Telegram, Instagram</title>
        <meta name="description" content="YouTube, Telegram, Instagram, TikTok va boshqa platformalar uchun professional dizayn xizmatlari. Tez, sifatli va moslashuvchan." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Elbek",
              "jobTitle": "Grafik dizayner",
              "url": "https://your-site.example", // o'zgartiring
              "sameAs": [
                "https://t.me/elbekdesign_va_webdasturchi"
              ],
              "description": "YouTube, Telegram, Instagram va boshqa platformalar uchun professional grafik dizayn xizmatlari."
            })
          }}
        />
      </Head>

      <Navigation />

      <main className="bg-background" id="main">
        {/* Hero */}
        <section aria-labelledby="hero-title" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-gradient-to-br from-background to-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Professional dizayn
                  <br />
                  <span className="text-primary">Sizning brendingiz uchun</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                  YouTube, Telegram, Instagram, TikTok va boshqa platformalar uchun yuqori sifatli dizaynlar. Biz bilan brendingiz yanada esda qolarli bo‘ladi.
                </p>
                <Link href="/order" className="inline-block">
                  <Button size="lg" className="px-8">
                    Buyurtma berish
                  </Button>
                </Link>
              </div>

              <div className="relative w-full h-64 sm:h-80">
                <Image
                  src="/images/hero-designer.jpg"
                  alt="Elbek — professional grafik dizayner ish jarayonida"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section aria-labelledby="services-title" className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 id="services-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Xizmatlarimiz
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <Link key={service.id} href={service.href} className="group">
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section aria-labelledby="advantages-title" className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 id="advantages-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Nima uchun biz?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv) => (
                <Card key={adv.title}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center" aria-hidden>
                      <span className="text-primary-foreground font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{adv.title}</CardTitle>
                      <CardDescription>{adv.description}</CardDescription>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ordering Process */}
        <section aria-labelledby="process-title" className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 id="process-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Buyurtma jarayoni
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderingProcess.map((step) => (
                <ProcessCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me */}
        <section aria-labelledby="why-title" className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 id="why-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                  Nima uchun meni tanlashadi?
                </h2>
                <div className="space-y-3">
                  {whyChooseMe.map((reason, idx) => (
                    <CheckCard key={idx} title={reason} />
                  ))}
                </div>
              </div>
              <div className="relative w-full h-96">
                <Image
                  src="/images/hero-designer.jpg"
                  alt="Elbek — professional dizayner portreti"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section aria-labelledby="about-title" className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 id="about-title" className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Men haqimda
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Elbek</h3>
                <p className="text-muted-foreground mb-4">
                  Men grafik dizaynerman — 8+ yillik tajriba bilan turli platformalar uchun samarali va zamonaviy dizaynlar yarataman.
                </p>
                <p className="text-muted-foreground mb-6">
                  CorelDRAW, Adobe Photoshop va Illustratorda mukammal ishlayman. Har bir loyiha uchun individual yondashuv va sifat kafolati taqdim etaman.
                </p>
                <div className="flex gap-4">
                  <a href="https://t.me/elbekdesign_va_webdasturchi" target="_blank" rel="noopener noreferrer">
                    <Button className="px-6">
                      Telegram
                    </Button>
                  </a>
                  <a href="tel:+998904063090" aria-label="Telefon raqam">
                    <Button variant="secondary">
                      +998 90 406 30 90
                    </Button>
                  </a>
                </div>
              </div>

              <div>
                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Tajribam</h4>
                  <Timeline items={timeline} />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Portfolio */}
        <FeaturedPortfolio />

        {/* Contact */}
        <section aria-labelledby="contact-title" className="px-4 sm:px-6 lg:px-8 py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="contact-title" className="text-3xl sm:text-4xl font-bold mb-8">
              Bog‘lanish
            </h2>
            <p className="text-lg mb-12 text-primary-foreground/90">
              Savollaringiz yoki maxsus talablaringiz bo‘lsa, bemalol yozing — yordam beramiz.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a href="https://t.me/elbekdesign_va_webdasturchi" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Telegram
                </Button>
              </a>
              <a href="tel:+998904063090">
                <Button size="lg" variant="secondary" className="w-full">
                  Qo‘ng‘iroq qilish
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Bugun dizayn buyurtma qiling
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Tezkor va sifatli dizaynlar — sizning brendingiz uchun.
            </p>
            <Link href="/order">
              <Button variant="secondary" size="lg" className="px-8 text-primary">
                Buyurtma berish
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Elbek — Professional dizayn. Barcha huquqlar himoyalangan.</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://t.me/elbekdesign_va_webdasturchi" className="hover:text-primary transition-colors">
                Telegram
              </a>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title="Tez orada ochiladi"
                className="text-muted-foreground cursor-not-allowed"
              >
                Instagram
              </button>
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title="Tez orada ochiladi"
                className="text-muted-foreground cursor-not-allowed"
              >
                YouTube
              </button>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}