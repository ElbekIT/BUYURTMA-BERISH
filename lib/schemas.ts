import { z } from 'zod'

const baseSchema = z.object({
  fullName: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak').max(100),
  phone: z.string().optional().refine(
    (val) => !val || /^\+?[\d\s\-()]{10,}$/.test(val),
    'Telefon raqami noto\'g\'ri formatda'
  ),
  telegramUsername: z.string()
    .min(1, 'Telegram foydalanuvchi nomini kiriting')
    .refine((val) => val.startsWith('@') || val.match(/^[a-zA-Z0-9_]{5,32}$/), 'Telegram username noto\'g\'ri'),
  platformName: z.string().min(1, 'Platforma nomini kiriting').max(100),
  profileLink: z.string().url('To\'g\'ri URL kiriting').optional().or(z.literal('')),
  designType: z.string().min(1, 'Dizayn turini tanlang'),
  deadline: z.enum(['3_hours', '1_day', '3_days', '1_week', '2_weeks', '30_days'], {
    errorMap: () => ({ message: 'Aloqa vaqtini tanlang' })
  }),
  additionalNotes: z.string().max(1000).optional(),
})

export const youtubeSchema = baseSchema.extend({
  gameTitle: z.string().min(1, 'O\'yin turini tanlang').max(100),
  previewName: z.string().optional(),
})

export const telegramSchema = baseSchema.extend({
  designType: z.enum(['logo', 'banner', 'avatar', 'sticker'], {
    errorMap: () => ({ message: 'Dizayn turini tanlang' })
  }),
})

export const instagramSchema = baseSchema.extend({
  designType: z.string().min(1, 'Dizayn turini tanlang').max(100),
})

export const tiktokSchema = baseSchema.extend({
  designType: z.string().min(1, 'Dizayn turini tanlang').max(100),
})

export const pubgSchema = baseSchema.extend({
  designType: z.enum(['clan_logo', 'team_banner', 'profile_pic', 'stream_overlay'], {
    errorMap: () => ({ message: 'Dizayn turini tanlang' })
  }),
})

export type YoutubeFormInputs = z.infer<typeof youtubeSchema>
export type TelegramFormInputs = z.infer<typeof telegramSchema>
export type InstagramFormInputs = z.infer<typeof instagramSchema>
export type TiktokFormInputs = z.infer<typeof tiktokSchema>
export type PubgFormInputs = z.infer<typeof pubgSchema>
