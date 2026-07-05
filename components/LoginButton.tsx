'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from './Button'
import { useState } from 'react'

export function LoginButton({
  onLoginSuccess,
}: {
  onLoginSuccess?: () => void
}) {
  const { signInWithGoogle, loading } = useAuth()
  const [error, setError] = useState<string>('')

  const handleLogin = async () => {
    try {
      setError('')
      await signInWithGoogle()
      onLoginSuccess?.()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign in'
      setError(errorMessage)
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleLogin}
        disabled={loading}
        size="lg"
        className="w-full"
      >
        {loading ? 'Signing in...' : 'Google bilan kirish'}
      </Button>
      {error && <p className="text-sm text-destructive text-center">{error}</p>}
    </div>
  )
}
