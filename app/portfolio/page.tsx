'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { where } from 'firebase/firestore'
import { getPortfolioItems } from '@/lib/firestore'
import { PortfolioItem, Platform } from '@/lib/types'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/Button'
import { Card, CardDescription, CardTitle } from '@/components/Card'

const PLATFORMS: Platform[] = ['youtube', 'telegram', 'instagram', 'tiktok', 'pubg']

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPortfolioItems()
  }, [])

  const loadPortfolioItems = async () => {
    try {
      const data = await getPortfolioItems()
      setItems(data)
      setFilteredItems(data)
    } catch (error) {
      console.error('Error loading portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = items

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter((item) => item.platform === selectedPlatform)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.designType.toLowerCase().includes(term)
      )
    }

    setFilteredItems(filtered)
  }, [selectedPlatform, searchTerm, items])

  return (
    <>
      <Navigation />
      <main className="bg-background">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              My Portfolio
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore my latest design work across different platforms
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Platform Filter */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">
                  Filter by Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPlatform('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPlatform === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-border'
                    }`}
                  >
                    All
                  </button>
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform)}
                      className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                        selectedPlatform === platform
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-border'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div>
                <label className="text-sm font-semibold text-foreground block mb-3">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Search portfolio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading portfolio...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Link key={item.id} href={`/portfolio/${item.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                      {item.imageUrl && (
                        <div className="relative w-full h-64 bg-secondary overflow-hidden">
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
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {item.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
          <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
            <p>Interested in working together?</p>
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
