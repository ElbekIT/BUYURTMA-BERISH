'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { subscribeToPortfolioItems, deletePortfolioItem } from '@/lib/firestore'
import { PortfolioItem } from '@/lib/types'
import { Button } from '@/components/Button'
import { Card, CardDescription, CardTitle } from '@/components/Card'

export default function PortfolioManagementPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeToPortfolioItems((portfolioItems) => {
      setItems(portfolioItems)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      await deletePortfolioItem(id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio Items</h1>
          <p className="text-muted-foreground">Manage your design portfolio</p>
        </div>
        <Link href="/dashboard/portfolio/add">
          <Button size="lg">Add New Item</Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading portfolio items...</p>
        </div>
      ) : items.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted-foreground mb-6">No portfolio items yet</p>
          <Link href="/dashboard/portfolio/add">
            <Button>Create Your First Item</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {item.imageUrl && (
                <div className="relative w-full h-48 bg-secondary overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2 mb-3">
                  {item.description}
                </CardDescription>
                <div className="flex gap-2">
                  <Link href={`/dashboard/portfolio/${item.id}/edit`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
