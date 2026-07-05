'use client'

import Link from 'next/link'
import { Button } from '@/components/Button'
import { Card, CardDescription, CardTitle } from '@/components/Card'

export default function DashboardPage() {
  const sections = [
    {
      title: 'Portfolio Management',
      description: 'Add, edit, and manage your portfolio items',
      href: '/dashboard/portfolio',
      icon: '🎨',
    },
    {
      title: 'Pricing Management',
      description: 'Configure pricing for different design types',
      href: '/dashboard/pricing',
      icon: '💰',
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your portfolio and pricing configurations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-4">{section.icon}</div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription className="mb-4">{section.description}</CardDescription>
              <Button size="sm">Open</Button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
