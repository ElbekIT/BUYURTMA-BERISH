export type Platform = 'youtube' | 'telegram' | 'instagram' | 'tiktok' | 'pubg'

export type FileType = 'jpg' | 'jpeg' | 'png' | 'webp' | 'pdf' | 'zip' | 'rar'

export interface FormSubmission {
  platform: Platform
  fullName: string
  phone?: string
  telegramUsername: string
  platformName: string
  profileLink?: string
  designType: string
  deadline: string
  gameTitle?: string
  previewName?: string
  additionalNotes?: string
  file?: File
  userEmail?: string
  userName?: string
}

export interface YouTubeFormData extends FormSubmission {
  platform: 'youtube'
  gameTitle: string
  previewName?: string
}

export interface TelegramFormData extends FormSubmission {
  platform: 'telegram'
  designType: 'logo' | 'banner' | 'avatar' | 'sticker'
}

export interface InstagramFormData extends FormSubmission {
  platform: 'instagram'
  designType: string
}

export interface TikTokFormData extends FormSubmission {
  platform: 'tiktok'
  designType: string
}

export interface PUBGFormData extends FormSubmission {
  platform: 'pubg'
  designType: 'clan_logo' | 'team_banner' | 'profile_pic' | 'stream_overlay'
}

export interface TelegramMessage {
  chat_id: number
  text?: string
  document?: {
    file_id: string
    file_size: number
  }
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  platform: Platform
  designType: string
  imageUrl: string
  thumbnailUrl?: string
  featured: boolean
  createdAt: number
  updatedAt: number
  category?: string
  tags?: string[]
}

export interface PricingConfig {
  platform: Platform
  designType: string
  basePrice: number // in UZS
  rushPrice?: number
  notes?: string
}

export interface PricingData {
  [key: string]: PricingConfig
}
