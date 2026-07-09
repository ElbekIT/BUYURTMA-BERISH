'use client'

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
      title: '📺 YouTube',
      description: 'Thumbnail, banner va boshqa YouTube dizaynlari',
      href: '/order/youtube',
    },
    {
      title: '✈️ Telegram',
      description: 'Logo, banner, avatar va stiker dizaynlari',
      href: '/order/telegram',
    },
    {
      title: '📷 Instagram',
      description: 'Post, stories va profil dizaynlari',
      href: '/order/instagram',
    },
    {
      title: '🎵 TikTok',
      description: 'Profil va cover video dizaynlari',
      href: '/order/tiktok',
    },
    {
      title: '🎮 PUBG',
      description: 'Clan logo va team banner dizaynlari',
      href: '/order/pubg',
    },
  ]

  const advantages = [
    {
      title: 'Tezkor Yetkazish',
      description: '24 soat ichida buyurtmangizni tayyorlash',
    },
    {
      title: 'Yuqori Sifat',
      description: 'Professional dizaynerlar tomonidan bajariladi',
    },
    {
      title: 'Yetkazuvchi Xizmat',
      description: '24/7 qo\'llab-quvvatlash va maslahat',
    },
    {
      title: 'Muddatli Reviziya',
      description: 'Ishingiz butun muddatga kafolatlangan',
    },
  ]

  const orderingProcess = [
    {
      number: 1,
      title: 'Buyurtma Berish',
      description: 'Shaklni to\'ldiring va dizayn turini tanlang',
      icon: '📝',
    },
    {
      number: 2,
      title: 'Tasdiqlash',
      description: 'Buyurtmangiz qabul qilinadi va qayta ko\'rib chiqiladi',
      icon: '✅',
    },
    {
      number: 3,
      title: 'Loyihalar',
      description: 'Bizning mutaxassislar sizni qo\'llamaydigan loyihalar yaratadi',
      icon: '🎨',
    },
    {
      number: 4,
      title: 'Reviziya',
      description: 'Takliflarni ko\'rib chiqing va o\'zgartirishni so\'rang',
      icon: '🔄',
    },
    {
      number: 5,
      title: 'Tayyorlik',
      description: 'Yakuniy versiyoni olish va fayllarni yuklab olish',
      icon: '📥',
    },
    {
      number: 6,
      title: 'Muvaffaqiyat',
      description: 'O\'zingizning dizayn fayllari bilan kanalingizni yangilang',
      icon: '🚀',
    },
  ]

  const whyChooseMe = [
    'Dizaynga 8.9+ yillik tajriba',
    'Tez va ishonchli xizmat',
    '100% reviziyada tayyor',
    'Zamonaviy dizayn stillar',
    'Professional va yaratuvchi',
    'Barcha platformalar uchun optimallangan',
  ]

  const timeline = [
    {
      year: 2015,
      title: 'Coreldraw X7 dan Boshlash',
      description: 'Grafik dizaynni o\'rganish va birinchi loyihalarni yaratish',
    },
    {
      year: 2017,
      title: 'Adobe Photoshop Kasaliligi',
      description: 'Photoshopda professional darajadagi ko\'nikmalarga erishish',
    },
    {
      year: 2019,
      title: 'Freelanceda Boshlash',
      description: 'YouTube va Telegram kanallariga professional dizayn yetkazishni boshlash',
    },
    {
      year: 2021,
      title: 'Web Dizayniga Kirish',
      description: 'UI/UX dizayn va veb-saytlar uchun dizayn qabila ko\'nikmasini oshirish',
    },
    {
      year: 2024,
      title: 'Mutaxassislik Darajasi',
      description: 'O\'zning professional dizayn kompaniyasini yaratish va ko\'plab loyihalarni bajarish',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-gradient-to-br from-background to-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Professional Dizayn
                  <br />
                  <span className="text-primary">Xizmatlarimiz</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                  YouTube, Telegram, Instagram, TikTok va PUBG uchun professional dizayn xizmatlarini taqdim etamiz. Sizning kanalning imijini oshiring!
                </p>
                <Link href="/order">
                  <Button size="lg" className="px-8">
                    Buyurtma Berish
                  </Button>
                </Link>
              </div>
              <div className="relative w-full h-64 sm:h-80">
                <Image
                  src="/images/hero-designer.jpg"
                  alt="Professional designer portrait"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Xizmatlarimiz
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <Link key={service.href} href={service.href}>
                  <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Nima Uchun Bizni Tanla?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, idx) => (
                <Card key={idx}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{advantage.title}</CardTitle>
                      <CardDescription>{advantage.description}</CardDescription>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ordering Process Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Dizayn Buyurtmasi Jarayoni
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

        {/* Why Choose Me Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                  Nima Uchun Meni Tanla?
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
                  alt="Elbek - Professional Designer"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
              Men Haqimda
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Elbek</h3>
                <p className="text-muted-foreground mb-4">
                  Men professional grafik dizayner bo\'lib, 8.9+ yildan ortiq tajriba bor. YouTube, Telegram, Instagram, TikTok va boshqa platformalar uchun high-quality dizayn yaratishda mutaxassismanman.
                </p>
                <p className="text-muted-foreground mb-6">
                  Coreldraw va Adobe Photoshop, Illustrator kabi zamonaviy dizayn vositalarida professional darajadagi ko\'nikmalarga egaman. Har bir loyiha bilan men siz bilan birga ishlaydi va sizning fikirlaringizni amalga ashiramiz.
                </p>
                <div className="flex gap-4">
                  <Button className="px-6">
                    <a href="https://t.me/elbekdesign_va_webdasturchi" target="_blank" rel="noopener noreferrer">
                      Telegram
                    </a>
                  </Button>
                  <Button variant="secondary">
                    +998 90 406 30 90
                  </Button>
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

        {/* Featured Portfolio Section */}
        <FeaturedPortfolio />

        {/* Contact Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Men Bilan Bog\'lanish
            </h2>
            <p className="text-lg mb-12 text-primary-foreground/90">
              Sizda savollar bormi yoki maslahat kerekmi? Quyidagi kanallari orqali men bilan bog\'laning
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a href="https://t.me/elbekdesign_va_webdasturchi" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Telegram
                </Button>
              </a>
              <a href="tel:+998904063090">
                <Button size="lg" variant="secondary" className="w-full">
                  Qo\'ng\'iroq Qilish
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Bugun O&apos;zingizning Dizaynni Buyurtma Qiling
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              24 soat ichida sizga mukammal dizayn tayyorlashga tayyor
            </p>
            <Link href="/order">
              <Button
                variant="secondary"
                size="lg"
                className="px-8 text-primary"
              >
                Buyurtma Berish
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
            <p>&copy; 2026 Dizayn Xizmatlarimiz. Barcha huquqlar himoyalangan.</p>
            <div className="flex justify-center gap-6 mt-6">
              <a href="https://t.me/elbekdesign_va_webdasturchi" className="hover:text-primary transition-colors">
                Telegram
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('HALI OCHILMAGAN')
                }}
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  alert('HALI OCHILMAGAN')
                }}
                className="hover:text-primary transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
