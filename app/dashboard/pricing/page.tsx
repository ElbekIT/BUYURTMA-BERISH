'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getPricingConfigs, addPricingConfig, updatePricingConfig } from '@/lib/firestore'
import { Button } from '@/components/Button'
import { Card, CardDescription, CardTitle } from '@/components/Card'
import { FormField, Input, Select } from '@/components/FormField'
import { PricingConfig } from '@/lib/types'

const pricingSchema = z.object({
  platform: z.enum(['youtube', 'telegram', 'instagram', 'tiktok', 'pubg']),
  designType: z.string().min(1, 'Design type required'),
  basePrice: z.number().min(1000, 'Price must be at least 1000 UZS'),
  rushPrice: z.number().optional(),
})

type PricingFormData = z.infer<typeof pricingSchema>

export default function PricingManagementPage() {
  const [configs, setConfigs] = useState<(PricingConfig & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PricingFormData>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      platform: 'youtube',
      designType: '',
      basePrice: 35000,
    },
  })

  useEffect(() => {
    loadConfigs()
  }, [])

  const loadConfigs = async () => {
    try {
      const data = await getPricingConfigs()
      setConfigs(data)
    } catch (error) {
      console.error('Error loading pricing configs:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: PricingFormData) => {
    setSaving(true)
    try {
      if (editingId) {
        await updatePricingConfig(editingId, data)
      } else {
        await addPricingConfig(data)
      }
      reset()
      setEditingId(null)
      await loadConfigs()
    } catch (error) {
      console.error('Error saving pricing:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (config: PricingConfig & { id: string }) => {
    setEditingId(config.id)
    reset({
      platform: config.platform,
      designType: config.designType,
      basePrice: config.basePrice,
      rushPrice: config.rushPrice,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-2">Pricing Management</h1>
      <p className="text-muted-foreground mb-8">Configure pricing for your design services</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {editingId ? 'Edit Pricing' : 'Add Pricing'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Platform */}
              <FormField label="Platform" required>
                <Controller
                  name="platform"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={[
                        { value: 'youtube', label: 'YouTube' },
                        { value: 'telegram', label: 'Telegram' },
                        { value: 'instagram', label: 'Instagram' },
                        { value: 'tiktok', label: 'TikTok' },
                        { value: 'pubg', label: 'PUBG' },
                      ]}
                      {...field}
                      error={errors.platform}
                    />
                  )}
                />
              </FormField>

              {/* Design Type */}
              <FormField label="Design Type" required>
                <Controller
                  name="designType"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="e.g., Thumbnail, Logo"
                      error={errors.designType}
                    />
                  )}
                />
              </FormField>

              {/* Base Price */}
              <FormField label="Base Price (UZS)" required>
                <Controller
                  name="basePrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="35000"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      error={errors.basePrice}
                    />
                  )}
                />
              </FormField>

              {/* Rush Price */}
              <FormField label="Rush Price (UZS)" helperText="Optional, for urgent orders">
                <Controller
                  name="rushPrice"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="50000"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </FormField>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={saving} size="sm" className="flex-1">
                  {saving ? 'Saving...' : editingId ? 'Update' : 'Add'}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setEditingId(null)
                      reset()
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-muted-foreground">Loading pricing configurations...</p>
          ) : configs.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No pricing configurations yet
            </Card>
          ) : (
            <div className="space-y-4">
              {configs.map((config) => (
                <Card key={config.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">
                        {config.platform.charAt(0).toUpperCase() + config.platform.slice(1)} -{' '}
                        {config.designType}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Base: {config.basePrice.toLocaleString()} UZS
                        {config.rushPrice && (
                          <> • Rush: {config.rushPrice.toLocaleString()} UZS</>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(config)}
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
