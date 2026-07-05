import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramMessage, formatSubmissionMessage } from '@/lib/telegram'
import { FormSubmission, Platform } from '@/lib/types'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract form fields
    const fullName = body.fullName as string
    const phone = body.phone as string
    const telegramUsername = body.telegramUsername as string
    const platformName = body.platformName as string
    const profileLink = body.profileLink as string
    const platform = body.platform as Platform
    const designType = body.designType as string
    const gameTitle = body.gameTitle as string
    const previewName = body.previewName as string
    const additionalNotes = body.additionalNotes as string
    const userEmail = body.userEmail as string
    const userName = body.userName as string

    // Validate required fields
    if (!fullName || !telegramUsername || !platformName || !platform || !designType) {
      return NextResponse.json(
        { message: 'Majburiy maydonlar to\'ldirilmagan' },
        { status: 400 }
      )
    }

    // Create submission object with user data
    const submission: FormSubmission = {
      platform,
      fullName,
      phone: phone || undefined,
      telegramUsername,
      platformName,
      profileLink: profileLink || undefined,
      designType,
      gameTitle: gameTitle || undefined,
      previewName: previewName || undefined,
      additionalNotes: additionalNotes || undefined,
      userEmail,
      userName,
    }

    // Format and send message (text-only, no files)
    const message = formatSubmissionMessage(submission)
    await sendTelegramMessage(message)

    return NextResponse.json(
      { message: 'Buyurtma muvaffaqiyatli yuborildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Telegram API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Noma\'lum xato'

    return NextResponse.json(
      {
        message: 'Buyurtmani yuborishda xato: ' + errorMessage,
      },
      { status: 500 }
    )
  }
}
