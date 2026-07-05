import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GAMES = [
  'Clash of Clans',
  'Clash Royale',
  'Brawl Stars',
  'Supercell Make',
  'Hay Day',
  'PUBG Mobile',
  'Call of Duty',
  'Fortnite',
  'Minecraft',
  'Roblox',
  'Among Us',
  'Candy Crush',
  'Subway Surfers',
  'Temple Run',
  'Pokemon Go',
  'Zynga Poker',
  'FarmVille',
  'Gardenscapes',
  'Plants vs. Zombies',
  'Angry Birds',
  'Dota 2',
  'League of Legends',
  'Valorant',
  'Counter-Strike 2',
  'Rainbow Six Siege',
  'Overwatch 2',
  'Apex Legends',
  'Warzone',
  'Battlefield 2042',
  'Destiny 2',
  'Final Fantasy XIV',
  'World of Warcraft',
  'Elder Scrolls Online',
  'Guild Wars 2',
  'Lost Ark',
  'New World',
  'Tera',
  'Tree of Savior',
  'MapleStory',
  'Black Desert Online',
]

export const YOUTUBE_DESIGN_TYPES = [
  'Thumbnail',
  'Channel Art',
  'Video Intro',
  'End Screen',
  'Subscribe Button',
  'Playlist Cover',
  'Stream Overlay',
]

export const TELEGRAM_DESIGN_TYPES = [
  'Logo',
  'Banner',
  'Avatar',
  'Sticker',
]

export const INSTAGRAM_DESIGN_TYPES = [
  'Profile Picture',
  'Post Template',
  'Stories Template',
  'Feed Layout',
  'Highlight Cover',
  'Bio Section',
]

export const TIKTOK_DESIGN_TYPES = [
  'Profile Picture',
  'Cover Video',
  'Watermark',
  'Effect Design',
  'Transition Template',
]

export const PUBG_DESIGN_TYPES = [
  'Clan Logo',
  'Team Banner',
  'Profile Picture',
  'Stream Overlay',
]

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

export const validateTelegramUsername = (username: string): boolean => {
  if (username.startsWith('@')) {
    return /^@[a-zA-Z0-9_]{5,32}$/.test(username)
  }
  return /^[a-zA-Z0-9_]{5,32}$/.test(username)
}

export const DEADLINE_OPTIONS = [
  { value: '3_hours', label: '3 soat' },
  { value: '1_day', label: '1 kun' },
  { value: '3_days', label: '3 kun' },
  { value: '1_week', label: '1 hafta' },
  { value: '2_weeks', label: '2 hafta' },
  { value: '30_days', label: '30 kun' },
]

export const formatDeadline = (deadline: string): string => {
  const option = DEADLINE_OPTIONS.find(opt => opt.value === deadline)
  return option?.label || deadline
}
