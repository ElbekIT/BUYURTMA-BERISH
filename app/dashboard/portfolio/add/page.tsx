'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addPortfolioItem, updatePortfolioItem } from '@/lib/firestore'
import { uploadPortfolioImage } from '@/lib/storage'
import { Button } from '@/components/Button'
import { FormField, Input, TextArea, Select } from '@/components/FormField'
import { PortfolioItem } from '@/lib/types'

const portfolioSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  platform: z.enum(['youtube', 'telegram', 'instagram', 'tiktok', 'pubg']),
  designType: z.string().min(1, 'Please select a design type'),
  featured: z.boolean().optional(),
  tags: z.string().optional(),
})

type PortfolioFormData = z.infer<typeof portfolioSchema>

const platformDesignTypes: Record<string, string[]> = {
  youtube: ['Thumbnail', 'Channel Art', 'Video Intro', 'End Screen'],
  telegram: ['Logo', 'Banner', 'Avatar', 'Sticker'],
  instagram: ['Post', 'Story', 'Reel', 'Feed Layout'],
  tiktok: ['Profile Picture', 'Video Cover', 'Watermark', 'Transition'],
  pubg: ['Clan Logo', 'Team Banner', 'Profile Picture', 'Stream Overlay'],
}

export default function AddPortfolioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState('youtube')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      platform: 'youtube',
      designType: '',
      featured: false,
    },
  })

  const onSubmit = async (data: PortfolioFormData) => {
    setLoading(true)
    setError(null)

    try {
      if (!imageFile) {
        setError('Please upload an image')
        setLoading(false)
        return
      }

      // Create portfolio item first
      const tempId = Date.now().toString()
      let imageUrl = ''

      // Upload image
      imageUrl = await uploadPortfolioImage(imageFile, tempId)

      // Add portfolio item
      const docId = await addPortfolioItem({
        title: data.title,
        description: data.description,
        platform: data.platform as any,
        designType: data.designType,
        imageUrl,
        featured: data.featured || false,
        tags: data.tags?.split(',').map(t => t.trim()) || [],
      })

      router.push('/dashboard/portfolio')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add portfolio item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Add Portfolio Item</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <FormField label="Title" required>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="e.g., YouTube Channel Thumbnail"
                error={errors.title}
              />
            )}
          />
        </FormField>

        {/* Description */}
        <FormField label="Description" required>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Describe your design..."
                rows={4}
                error={errors.description}
              />
            )}
          />
        </FormField>

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
                onChange={(e) => {
                  field.onChange(e)
                  setSelectedPlatform(e.target.value)
                }}
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
              <Select
                options={platformDesignTypes[selectedPlatform]?.map((type) => ({
                  value: type.toLowerCase(),
                  label: type,
                })) || []}
                {...field}
                error={errors.designType}
              />
            )}
          />
        </FormField>

        {/* Image Upload */}
        <FormField label="Portfolio Image" required helperText="Recommended: 1200x800px">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {imageFile ? (
                <div>
                  <p className="text-sm font-medium text-foreground">{imageFile.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-foreground">Click to upload image</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP up to 5MB
                  </p>
                </div>
              )}
            </label>
          </div>
        </FormField>

        {/* Tags */}
        <FormField label="Tags" helperText="Comma separated (e.g., modern, colorful)">
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="e.g., modern, minimalist, colorful"
              />
            )}
          />
        </FormField>

        {/* Featured */}
        <FormField label="Featured" helperText="Show on homepage">
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                {...field}
                className="w-4 h-4 rounded border-border"
              />
            )}
          />
        </FormField>

        {/* Submit */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="flex-1"
          >
            {loading ? 'Adding...' : 'Add Item'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
