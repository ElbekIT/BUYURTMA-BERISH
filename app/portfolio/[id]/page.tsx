'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs, User as FirebaseUser } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Portfolio, User as UserType, Service } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Star } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function PortfolioDetailPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [portfolio, setPortfolio] = useState<(Portfolio & { ownerName: string; ownerEmail: string; ownerId: string }) | null>(null);
  const [owner, setOwner] = useState<UserType | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!portfolioId) return;

    const fetchPortfolio = async () => {
      try {
        const portfolioRef = doc(db, 'portfolios', portfolioId);
        const portfolioSnap = await getDoc(portfolioRef);

        if (portfolioSnap.exists()) {
          const portfolioData = portfolioSnap.data() as Portfolio;
          const ownerId = portfolioData.userId;

          setPortfolio({
            ...portfolioData,
            ownerId,
            ownerName: portfolioData.ownerName || 'Designer',
            ownerEmail: portfolioData.ownerEmail || '',
          });

          // Fetch owner info
          const userRef = doc(db, 'users', ownerId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setOwner(userSnap.data() as UserType);
          }

          // Fetch services
          const servicesRef = collection(db, 'services');
          const q = query(servicesRef, where('userId', '==', ownerId));
          const servicesSnap = await getDocs(q);
          const servicesList: Service[] = [];
          servicesSnap.forEach((doc) => {
            servicesList.push({ ...doc.data(), id: doc.id } as Service);
          });
          setServices(servicesList);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-96 bg-muted rounded" />
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Portfolio not found</p>
          </div>
        </main>
      </div>
    );
  }

  const canContact = currentUser && currentUser.uid !== portfolio.ownerId;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Images */}
            {portfolio.images && portfolio.images.length > 0 && (
              <div className="space-y-4">
                <div className="relative h-96 md:h-[500px] w-full overflow-hidden rounded-lg bg-muted border border-border">
                  <Image
                    src={portfolio.images[0]}
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {portfolio.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {portfolio.images.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-24 w-full overflow-hidden rounded bg-muted border border-border cursor-pointer hover:border-accent transition-colors"
                      >
                        <Image
                          src={img}
                          alt={`${portfolio.title} ${idx + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Portfolio Details */}
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 text-balance">{portfolio.title}</h1>
                <p className="text-lg text-muted-foreground">{portfolio.description}</p>
              </div>

              {portfolio.details && (
                <div className="prose prose-invert max-w-none bg-card p-6 rounded-lg border border-border">
                  <p className="whitespace-pre-wrap">{portfolio.details}</p>
                </div>
              )}
            </div>

            {/* Services */}
            {services.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Available Services</h2>
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <span className="text-lg font-bold text-accent">
                          ${service.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Owner Card */}
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{portfolio.ownerName}</h3>
                    <p className="text-sm text-muted-foreground">{owner?.role || 'Creative Professional'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 border-y border-border">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold">{portfolio.rating || 0} rating</span>
                </div>

                {owner?.bio && (
                  <p className="text-sm text-muted-foreground">{owner.bio}</p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                {canContact ? (
                  <>
                    <Link href={`/messages?userId=${portfolio.ownerId}`} className="block">
                      <Button className="w-full gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Contact Designer
                      </Button>
                    </Link>
                    <Link
                      href={`/order?portfolioId=${portfolio.id}&ownerId=${portfolio.ownerId}`}
                      className="block"
                    >
                      <Button variant="outline" className="w-full">
                        Place Order
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-4">Sign in to contact this designer</p>
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
