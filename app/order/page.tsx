'use client'

import Link from 'next/link'
import { Card, CardDescription, CardTitle } from '@/components/Card'

export default function OrderPage() {
  const platforms = [
    {
      name: 'YouTube',
      icon: '📺',
      description: 'Thumbnail, banner, intro va boshqa YouTube dizaynlari',
      href: '/order/youtube',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      description: 'Logo, banner, avatar va stiker dizaynlari',
      href: '/order/telegram',
    },
    {
      name: 'Instagram',
      icon: '📷',
      description: 'Post, stories va profil dizaynlari',
      href: '/order/instagram',
    },
    {
      name: 'TikTok',
      icon: '🎵',
      description: 'Profil, cover video va watermark dizaynlari',
      href: '/order/tiktok',
    },
    {
      name: 'PUBG',
      icon: '🎮',
      description: 'Clan logo, team banner va profil dizaynlari',
      href: '/order/pubg',
    },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Dizayn Turini Tanlang
          </h1>
          <p className="text-lg text-muted-foreground">
            Qaysi platforma uchun dizayn kerak bo&apos;lsa, uni tanlang
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {platforms.map((platform) => (
            <Link key={platform.href} href={platform.href}>
              <Card className="h-full hover:border-primary hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {platform.icon}
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <CardDescription className="text-xs">
                  {platform.description}
                </CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
