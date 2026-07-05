'use client'

interface TimelineItem {
  year: number
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div key={index} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
              {item.year}
            </div>
            {index < items.length - 1 && (
              <div className="w-1 h-16 bg-border mt-2" />
            )}
          </div>
          <div className="pb-8">
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="text-muted-foreground mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
