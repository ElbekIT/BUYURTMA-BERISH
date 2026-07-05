'use client'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Navigation } from '@/components/Navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-secondary/30">
        <ProtectedRoute>{children}</ProtectedRoute>
      </main>
    </>
  )
}
