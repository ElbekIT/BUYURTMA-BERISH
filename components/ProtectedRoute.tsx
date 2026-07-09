'use client'

import { useAuth } from '@/context/AuthContext'
import { LoginModal } from './LoginModal'
import { useState, useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      setShowLoginModal(true)
    }
  }, [isAuthenticated, loading, mounted])

  if (!mounted) {
    return fallback || <div className="min-h-screen" />
  }

  if (loading) {
    return fallback || <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="mt-4 text-muted-foreground">Yuklanmoqda...</p>
      </div>
    </div>
  }

  if (!isAuthenticated) {
    return (
      <>
        {fallback}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    )
  }

  return <>{children}</>
}
