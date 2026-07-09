'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

import {
  youtubeSchema,
  telegramSchema,
  instagramSchema,
  tiktokSchema,
  pubgSchema,
  YoutubeFormInputs,
  TelegramFormInputs,
  InstagramFormInputs,
  TiktokFormInputs,
  PubgFormInputs,
} from '@/lib/schemas'
import {
  YOUTUBE_DESIGN_TYPES,
  TELEGRAM_DESIGN_TYPES,
  INSTAGRAM_DESIGN_TYPES,
  TIKTOK_DESIGN_TYPES,
  PUBG_DESIGN_TYPES,
  GAMES,
  DEADLINE_OPTIONS,
} from '@/lib/utils'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { FormField, Input, TextArea, Select } from '@/components/FormField'
import { SuccessModal, ErrorModal } from '@/components/Modal'
import { PricingDisplay } from '@/components/PricingDisplay'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { Platform } from '@/lib/types'

type FormInputs = YoutubeFormInputs | TelegramFormInputs | InstagramFormInputs | TiktokFormInputs | PubgFormInputs

const platformConfigs = {
  youtube: {
    title: 'YouTube Dizayni',
    description: 'YouTube kanalingiz uchun professional dizayn',
    schema: youtubeSchema,
    designTypes: YOUTUBE_DESIGN_TYPES,
    hasGameTitle: true,
    hasPreviewName: true,
    color: 'bg-red-500',
  },
  telegram: {
    title: 'Telegram Dizayni',
    description: 'Telegram kanali yoki guruhi uchun dizayn',
    schema: telegramSchema,
    designTypes: TELEGRAM_DESIGN_TYPES,
    hasGameTitle: false,
    hasPreviewName: false,
    color: 'bg-blue-500',
  },
  instagram: {
    title: 'Instagram Dizayni',
    description: 'Instagram profilingiz uchun dizayn',
    schema: instagramSchema,
    designTypes: INSTAGRAM_DESIGN_TYPES,
    hasGameTitle: false,
    hasPreviewName: false,
    color: 'bg-pink-500',
  },
  tiktok: {
    title: 'TikTok Dizayni',
    description: 'TikTok profilingiz uchun dizayn',
    schema: tiktokSchema,
    designTypes: TIKTOK_DESIGN_TYPES,
    hasGameTitle: false,
    hasPreviewName: false,
    color: 'bg-black',
  },
  pubg: {
    title: 'PUBG Dizayni',
    description: 'PUBG klani yoki profili uchun dizayn',
    schema: pubgSchema,
    designTypes: PUBG_DESIGN_TYPES,
    hasGameTitle: false,
    hasPreviewName: false,
    color: 'bg-yellow-600',
  },
}

export default function PlatformFormPage() {
  const params = useParams()
  const platform = (params?.platform as Platform) || 'youtube'
  const router = useRouter()
  const { user } = useAuth()
  const { isLoading, error, success, submitForm, reset } = useFormSubmit()
  const [showErrorModal, setShowErrorModal] = useState(false)

  const config = platformConfigs[platform] || platformConfigs.youtube

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(config.schema),
    defaultValues: {
      platform,
      fullName: user?.displayName || '',
      phone: '',
      telegramUsername: '',
      platformName: '',
      profileLink: '',
      designType: '',
      deadline: '3_days',
      gameTitle: '',
      previewName: '',
      additionalNotes: '',
    },
  })

  const onSubmit = async (data: FormInputs) => {
    try {
      await submitForm({
        ...data,
        platform,
        userEmail: user?.email || '',
        userName: user?.displayName || data.fullName,
      })
      resetForm()
    } catch (err) {
      setShowErrorModal(true)
    }
  }

  if (!Object.keys(platformConfigs).includes(platform)) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Platforma topilmadi
          </h1>
          <Button onClick={() => router.push('/order')}>
            Orqaga qaytish
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className={`${config.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-4`}>
            <span className="text-xl">→</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {config.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {config.description}
          </p>
        </div>

        {/* Pricing Display */}
        <div className="mb-8">
          <PricingDisplay platform={platform} designType={watch('designType') || ''} />
        </div>

        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField label="To'liq Ismingiz" required>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="John Doe"
                    {...field}
                    error={errors.fullName}
                  />
                )}
              />
            </FormField>

            {/* Phone */}
            <FormField label="Telefon Raqamingiz" helperText="Ixtiyoriy (WhatsApp, Telegram)">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="+998 90 123 45 67"
                    {...field}
                    error={errors.phone}
                  />
                )}
              />
            </FormField>

            {/* Telegram Username */}
            <FormField label="Telegram Foydalanuvchi Nomi" required>
              <Controller
                name="telegramUsername"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="@yourname yoki username"
                    {...field}
                    error={errors.telegramUsername}
                  />
                )}
              />
            </FormField>

            {/* Platform Name */}
            <FormField
              label={`${config.title.split(' ')[1]} Nomingiz`}
              required
              helperText={`${platform === 'youtube' ? 'Kanal nomi' : platform === 'telegram' ? 'Kanal/Guruh nomi' : 'Profil nomi'}`}
            >
              <Controller
                name="platformName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Sizning nomingiz"
                    {...field}
                    error={errors.platformName}
                  />
                )}
              />
            </FormField>

            {/* Profile Link */}
            <FormField label="Profil/Kanal Havolasi" helperText="Ixtiyoriy">
              <Controller
                name="profileLink"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="https://..."
                    type="url"
                    {...field}
                    error={errors.profileLink}
                  />
                )}
              />
            </FormField>

            {/* Design Type */}
            <FormField label="Dizayn Turi" required>
              <Controller
                name="designType"
                control={control}
                render={({ field }) => (
                  <Select
                    options={config.designTypes.map((type) => ({
                      value: type.toLowerCase().replace(/\s+/g, '_'),
                      label: type,
                    }))}
                    {...field}
                    error={errors.designType}
                  />
                )}
              />
            </FormField>

            {/* Deadline */}
            <FormField label="Aloqa Vaqti" required helperText="Qachon tayyorligini xohlaysiz?">
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <Select
                    options={DEADLINE_OPTIONS}
                    {...field}
                    error={errors.deadline}
                  />
                )}
              />
            </FormField>

            {/* Game Title - Only for YouTube */}
            {config.hasGameTitle && (
              <FormField label="O'yin Turini Tanlang" required>
                <Controller
                  name="gameTitle"
                  control={control}
                  render={({ field }) => (
                    <Select
                      options={GAMES.map((game) => ({
                        value: game.toLowerCase().replace(/\s+/g, '_'),
                        label: game,
                      }))}
                      {...field}
                      error={errors.gameTitle}
                    />
                  )}
                />
              </FormField>
            )}

            {/* Preview Name - Optional for YouTube */}
            {config.hasPreviewName && (
              <FormField label="Ko'rinish Nomi" helperText="Ixtiyoriy">
                <Controller
                  name="previewName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Video/Thumbnail nomi"
                      {...field}
                      error={errors.previewName}
                    />
                  )}
                />
              </FormField>
            )}

            {/* Additional Notes */}
            <FormField label="Qo'shimcha Malumot" helperText="Dizayn haqida batafsil ayt">
              <Controller
                name="additionalNotes"
                control={control}
                render={({ field }) => (
                  <TextArea
                    placeholder="Ranglar, stil, muhim tafsilotlar..."
                    rows={4}
                    {...field}
                    error={errors.additionalNotes}
                  />
                )}
              />
            </FormField>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Yuborilmoqda...' : 'Buyurtmani Yuborish'}
            </Button>
          </form>
        </Card>
      </div>

      {/* Modals */}
      <SuccessModal
        isOpen={success}
        onClose={() => {
          reset()
          router.push('/order')
        }}
      />
      <ErrorModal
        isOpen={showErrorModal || !!error}
        onClose={() => {
          setShowErrorModal(false)
          reset()
        }}
        message={error || 'Xato yuz berdi. Iltimos qayta urinib ko\'ring.'}
      />
    </div>
  )
}
