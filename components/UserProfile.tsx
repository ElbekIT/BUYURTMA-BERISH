'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from './Button'
import { useState } from 'react'

export function UserProfile() {
  const { user, logout, loading } = useAuth()
  const [showLogout, setShowLogout] = useState(false)

  if (!user) return null

  const handleLogout = async () => {
    try {
      await logout()
      setShowLogout(false)
    } catch (err) {
      console.error('[v0] Logout error:', err)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowLogout(!showLogout)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
        disabled={loading}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-8 h-8 rounded-full"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {user.displayName?.charAt(0) || 'U'}
          </div>
        )}
        <span className="text-sm font-medium hidden sm:inline">
          {user.displayName || 'User'}
        </span>
      </button>

      {showLogout && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">
              {user.displayName}
            </p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
          >
            {loading ? 'Chiqmoqda...' : 'Chiqish'}
          </button>
        </div>
      )}
    </div>
  )
}
