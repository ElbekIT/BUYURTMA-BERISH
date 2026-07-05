import { useState, useCallback } from 'react'
import { FormSubmission } from '@/lib/types'

interface UseFormSubmitReturn {
  isLoading: boolean
  error: string | null
  success: boolean
  submitForm: (data: FormSubmission) => Promise<void>
  reset: () => void
}

export const useFormSubmit = (): UseFormSubmitReturn => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitForm = useCallback(async (data: FormSubmission) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Convert to JSON payload
      const payload = {
        fullName: data.fullName,
        phone: data.phone || '',
        telegramUsername: data.telegramUsername,
        platformName: data.platformName,
        profileLink: data.profileLink || '',
        platform: data.platform,
        designType: data.designType,
        gameTitle: data.gameTitle || '',
        previewName: data.previewName || '',
        additionalNotes: data.additionalNotes || '',
        userEmail: data.userEmail || '',
        userName: data.userName || '',
      }

      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Buyurtma yuborishda xato')
      }

      setSuccess(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Noma\'lum xato'
      setError(errorMessage)
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setSuccess(false)
  }, [])

  return {
    isLoading,
    error,
    success,
    submitForm,
    reset,
  }
}
