import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className }: CardProps) => {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h3 className={cn('text-xl font-bold text-foreground', className)}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className }: CardProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground mt-2', className)}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={cn('', className)}>{children}</div>
}
