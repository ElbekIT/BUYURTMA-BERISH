'use client'

import { useAuth } from '@/context/AuthContext'
import { LoginButton } from './LoginButton'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface LoginModalProps {
  isOpen: boolean
  onClose?: () => void
  redirectTo?: string
}

export function LoginModal({
  isOpen,
  onClose,
  redirectTo,
}: LoginModalProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user && isOpen) {
      onClose?.()
      if (redirectTo) {
        router.push(redirectTo)
      }
    }
  }, [user, isOpen, onClose, redirectTo, router])

  if (!mounted) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Xush kelibsiz
          </h2>
          <p className="text-muted-foreground">
            Dizayn buyurtmasi berish uchun hisobingizga kiring
          </p>
        </div>

        <LoginButton
          onLoginSuccess={() => {
            onClose?.()
            if (redirectTo) {
              router.push(redirectTo)
            }
          }}
        />

        <p className="text-xs text-muted-foreground text-center mt-4">
          Google bilan kirish orqali siz shartlar va maxfiylik siyosatiga rozisiz
        </p>
      </div>
    </div>
  )
}
