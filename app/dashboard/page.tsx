'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as FirebaseUser, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut, Plus, BarChart3, Inbox } from 'lucide-react';
import { User as UserType, Portfolio, Order } from '@/lib/types';

interface OrderWithStatus extends Order {
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [orders, setOrders] = useState<OrderWithStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch user data
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserType);
      }

      setLoading(false);
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch portfolios
    const portfoliosRef = collection(db, 'portfolios');
    const portfoliosQuery = query(portfoliosRef, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(portfoliosQuery, (snapshot) => {
      const portfoliosList: Portfolio[] = [];
      snapshot.forEach((doc) => {
        portfoliosList.push({ ...doc.data(), id: doc.id } as Portfolio);
      });
      setPortfolios(portfoliosList);
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch orders where current user is owner
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(ordersRef, where('ownerId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersList: OrderWithStatus[] = [];
      snapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() } as OrderWithStatus);
      });

      ordersList.sort(
        (a, b) =>
          (b.createdAt?.toDate?.()?.getTime() || 0) -
          (a.createdAt?.toDate?.()?.getTime() || 0)
      );
      setOrders(ordersList);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {userData?.name || currentUser.email}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-bold">{totalOrders}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl font-bold">{pendingOrders}</p>
              </div>
              <Inbox className="w-8 h-8 text-accent" />
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Portfolios</p>
                <p className="text-3xl font-bold">{portfolios.length}</p>
              </div>
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolios Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Portfolios</h2>
              <Link href="/portfolio/create">
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Portfolio
                </Button>
              </Link>
            </div>

            {portfolios.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground mb-4">No portfolios yet</p>
                <Link href="/portfolio/create">
                  <Button>Create Portfolio</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{portfolio.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {portfolio.description}
                        </p>
                        <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                          <span>
                            {portfolio.published ? '🟢 Published' : '⚪ Draft'}
                          </span>
                        </div>
                      </div>
                      <Link href={`/portfolio/${portfolio.id}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

            {orders.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <p className="text-muted-foreground text-sm">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">
                          {order.customDescription?.substring(0, 40) || 'Order'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.clientEmail}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-muted rounded whitespace-nowrap">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/orders-received">
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
