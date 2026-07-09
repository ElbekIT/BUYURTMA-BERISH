'use client'

interface ProcessCardProps {
  number: number
  title: string
  description: string
  icon: string
}

export const ProcessCard = ({ number, title, description, icon }: ProcessCardProps) => {
  return (
    <div className="relative p-6 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all">
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
        {number}
      </div>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
