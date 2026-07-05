'use client'

import { useEffect, useState } from 'react'
import { getPricingConfigs } from '@/lib/firestore'
import { PricingConfig } from '@/lib/types'
import { Card, CardDescription, CardTitle } from './Card'

interface PricingDisplayProps {
  platform: string
  designType: string
}

export function PricingDisplay({ platform, designType }: PricingDisplayProps) {
  const [pricing, setPricing] = useState<(PricingConfig & { id: string }) | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPricing()
  }, [platform, designType])

  const loadPricing = async () => {
    try {
      const configs = await getPricingConfigs()
      const matching = configs.find(
        (config) =>
          config.platform === platform &&
          config.designType.toLowerCase() === designType.toLowerCase()
      )
      setPricing(matching || null)
    } catch (error) {
      console.error('[v0] Error loading pricing:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-4 bg-secondary/50">
        <p className="text-sm text-muted-foreground">Loading price...</p>
      </Card>
    )
  }

  if (!pricing) {
    return null
  }

  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-lg">Taqo'ylanuvchi Narx</CardTitle>
          <CardDescription className="mt-1">
            Bu loyihaning taxminiy narxi
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {pricing.basePrice.toLocaleString()} so'm
          </div>
          {pricing.rushPrice && (
            <div className="text-xs text-muted-foreground mt-1">
              Shoshqoq: {pricing.rushPrice.toLocaleString()} so'm
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
