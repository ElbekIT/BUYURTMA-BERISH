'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, User as FirebaseUser } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { User as UserType, Portfolio } from '@/lib/types';
import { ChevronRight, Star } from 'lucide-react';

export default function ExplorePage() {
  const [portfolios, setPortfolios] = useState<(Portfolio & { ownerName: string; ownerEmail: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const portfoliosRef = collection(db, 'portfolios');
    const q = query(portfoliosRef, where('published', '==', true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const portfolioList: (Portfolio & { ownerName: string; ownerEmail: string })[] = [];

      snapshot.forEach((doc) => {
        const portfolio = doc.data() as Portfolio;
        portfolioList.push({
          ...portfolio,
          ownerName: portfolio.ownerName || 'Designer',
          ownerEmail: portfolio.ownerEmail || '',
        });
      });

      setPortfolios(portfolioList);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">Explore Portfolios</h1>
          <p className="text-lg text-muted-foreground">
            Browse amazing work from talented designers and creative professionals
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-lg overflow-hidden animate-pulse h-96"
              >
                <div className="bg-muted h-48 w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">No portfolios available yet</p>
            {currentUser ? (
              <p className="text-sm text-muted-foreground">Check back soon!</p>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Sign in to place orders</p>
                <div className="flex justify-center gap-4">
                  <Link href="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Create Account</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Link
                key={portfolio.id}
                href={`/portfolio/${portfolio.id}`}
                className="group"
              >
                <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-colors h-full flex flex-col">
                  {portfolio.images && portfolio.images.length > 0 && (
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={portfolio.images[0]}
                        alt={portfolio.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {portfolio.description}
                      </p>
                    </div>
                    <div className="space-y-3 pt-3 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {portfolio.ownerName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-xs text-muted-foreground">
                            {portfolio.rating || 0}
                          </span>
                        </div>
                      </div>
                      <Button
                        className="w-full gap-2"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
