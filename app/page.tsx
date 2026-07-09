import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="py-20 md:py-32">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                  Connect with Creative Professionals
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Browse portfolios, place orders, and collaborate seamlessly with designers, developers, and creative experts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href="/explore">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Browse Portfolios
                  </Button>
                </Link>
                <Link href="/signup?role=provider">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl text-primary">👁️</span>
              </div>
              <h3 className="text-lg font-semibold">Explore Portfolios</h3>
              <p className="text-muted-foreground">
                Discover talented creators and view their best work in beautifully curated portfolios.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl text-primary">📝</span>
              </div>
              <h3 className="text-lg font-semibold">Place Orders</h3>
              <p className="text-muted-foreground">
                Choose services or describe your project needs. Communicate directly with providers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl text-primary">💬</span>
              </div>
              <h3 className="text-lg font-semibold">Real-time Messaging</h3>
              <p className="text-muted-foreground">
                Stay connected with instant notifications and seamless communication throughout your project.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
