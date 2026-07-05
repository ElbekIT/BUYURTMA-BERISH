'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getPortfolioItem } from '@/lib/firestore'
import { PortfolioItem } from '@/lib/types'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/Button'

export default function PortfolioDetailPage() {
  const params = useParams()
  const [item, setItem] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadItem()
  }, [params.id])

  const loadItem = async () => {
    try {
      if (typeof params.id === 'string') {
        const data = await getPortfolioItem(params.id)
        if (data) {
          setItem(data)
        } else {
          setError('Portfolio item not found')
        }
      }
    } catch (err) {
      setError('Failed to load portfolio item')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </>
    )
  }

  if (error || !item) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{error || 'Item not found'}</p>
            <Link href="/portfolio">
              <Button>Back to Portfolio</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Back Button */}
        <div className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/portfolio" className="text-primary hover:text-primary/80">
              &larr; Back to Portfolio
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Image */}
          {item.imageUrl && (
            <div className="mb-12 rounded-lg overflow-hidden bg-secondary">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Details */}
          <div className="mb-12">
            <div className="mb-4 flex gap-2 flex-wrap">
              <span className="text-xs font-semibold text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
                {item.platform}
              </span>
              <span className="text-xs font-semibold text-muted-foreground uppercase bg-secondary px-3 py-1 rounded-full">
                {item.designType}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {item.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-foreground mb-3">Tags</p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-secondary text-muted-foreground px-3 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8 border-t border-border">
              <Link href="/order">
                <Button size="lg">Order Similar Design</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
          <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
            <p>Interested in custom design work?</p>
            <Link href="/order">
              <Button size="sm" className="mt-4">
                Place an Order
              </Button>
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
