'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { where } from 'firebase/firestore'
import { getFeaturedPortfolioItems } from '@/lib/firestore'
import { PortfolioItem } from '@/lib/types'
import { Button } from './Button'
import { Card, CardDescription, CardTitle } from './Card'

export function FeaturedPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedItems()
  }, [])

  const loadFeaturedItems = async () => {
    try {
      const data = await getFeaturedPortfolioItems(6)
      setItems(data)
    } catch (error) {
      console.error('[v0] Error loading featured portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Featured Work
            </h2>
            <p className="text-muted-foreground mt-2">
              Showcasing my latest design projects
            </p>
          </div>
          <Link href="/portfolio">
            <Button>View All</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link key={item.id} href={`/portfolio/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                {item.imageUrl && (
                  <div className="relative w-full h-48 bg-secondary overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="text-xs font-semibold text-primary uppercase mb-2">
                    {item.platform} • {item.designType}
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
