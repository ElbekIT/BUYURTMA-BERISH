'use client'

interface CheckCardProps {
  title: string
  description?: string
}

export const CheckCard = ({ title, description }: CheckCardProps) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-primary transition-colors">
      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
        <span className="text-primary-foreground text-sm font-bold">✓</span>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  )
}
