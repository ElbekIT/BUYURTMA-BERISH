import axios from 'axios'
import FormData from 'form-data'
import { FormSubmission } from './types'
import { formatDeadline } from './utils'

const BOT_TOKEN = "8848708593:AAExdpagsAufF5S5DZFEIjKefbkmC3UWgyc";
const CHAT_ID = "8269163077";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export const sendTelegramMessage = async (
  message: string
): Promise<boolean> => {
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error('Telegram bot token or chat ID not configured')
  }

  try {
    // Send text message only
    const response = await axios.post(
      `${TELEGRAM_API_URL}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      },
      { timeout: 30000 }
    )

    return response.status === 200
  } catch (error) {
    console.error('[v0] Telegram API error:', error)
    throw error
  }
}

export const formatSubmissionMessage = (data: FormSubmission): string => {
  const date = new Date().toLocaleDateString('uz-UZ')
  const time = new Date().toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const platformNames: Record<string, string> = {
    youtube: '📺 YouTube',
    telegram: '✈️ Telegram',
    instagram: '📷 Instagram',
    tiktok: '🎵 TikTok',
    pubg: '🎮 PUBG',
  }

  const message = `📥 <b>YANGI BUYURTMA</b>

<b>Platforma:</b> ${platformNames[data.platform]}
<b>Ism:</b> ${data.fullName}
<b>Google Email:</b> ${data.userEmail || 'N/A'}
<b>Telefon:</b> ${data.phone || 'Ko\'rsatilmagan'}
<b>Telegram:</b> ${data.telegramUsername}
<b>Platforma nomi:</b> ${data.platformName}
<b>Profil havolasi:</b> ${data.profileLink || 'Ko\'rsatilmagan'}
<b>Dizayn turi:</b> ${data.designType}
<b>Aloqa vaqti:</b> ${formatDeadline(data.deadline)}
${data.gameTitle ? `<b>O'yin:</b> ${data.gameTitle}\n` : ''}${data.previewName ? `<b>Ko'rinish nomi:</b> ${data.previewName}\n` : ''}<b>Qo'shimcha:</b> ${data.additionalNotes || 'Yo\'q'}

<b>Yuborilgan vaqt:</b> ${date} ${time}`

  return message
}
