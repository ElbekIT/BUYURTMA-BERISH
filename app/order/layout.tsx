'use client'

import { Navigation } from '@/components/Navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>
    </>
  )
}
