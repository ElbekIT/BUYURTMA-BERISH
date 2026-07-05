'use client'

import Link from 'next/link'
import { UserProfile } from './UserProfile'

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Dizayn
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/order"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Buyurtma
            </Link>
            <a
              href="https://t.me/yourbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Aloqa
            </a>
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}
