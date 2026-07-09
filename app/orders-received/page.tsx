'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, User as FirebaseUser, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  clientId: string;
  clientEmail: string;
  customDescription: string;
  budget?: number;
  deadline: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
}

export default function OrdersReceivedPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [updatingId, setUpdatingId] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) {
        router.push('/login');
      }
    });
    return unsubscribe;
  }, [router]);

  useEffect(() => {
    if (!currentUser) return;

    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('ownerId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList: Order[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ordersList.push({
          id: doc.id,
          clientId: data.clientId,
          clientEmail: data.clientEmail,
          customDescription: data.customDescription,
          budget: data.budget,
          deadline: data.deadline?.toDate?.() || new Date(data.deadline),
          status: data.status,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        });
      });

      ordersList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(ordersList);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdatingId('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'accepted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const otherOrders = orders.filter((o) => o.status !== 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Received Orders</h1>
          <p className="text-muted-foreground">Manage orders from clients</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 h-24 animate-pulse"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-lg">
            <p className="text-lg text-muted-foreground mb-4">No orders yet</p>
            <p className="text-sm text-muted-foreground">
              Orders from clients will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h2 className="text-xl font-bold">Pending Review ({pendingOrders.length})</h2>
                </div>
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {order.customDescription.substring(0, 50)}
                              {order.customDescription.length > 50 ? '...' : ''}
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                            <span>From: {order.clientEmail}</span>
                            {order.budget && <span>Budget: ${order.budget}</span>}
                            <span>Deadline: {formatDate(order.deadline)}</span>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleUpdateStatus(order.id, 'accepted')}
                              disabled={updatingId === order.id}
                              className="gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              disabled={updatingId === order.id}
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/messages?userId=${order.clientId}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <MessageCircle className="w-4 h-4" />
                              Message
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Orders */}
            {otherOrders.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">All Orders</h2>
                <div className="space-y-4">
                  {otherOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-card border border-border rounded-lg p-4 hover:border-accent transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {order.customDescription.substring(0, 50)}
                              {order.customDescription.length > 50 ? '...' : ''}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(order.status)}`}>
                              {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>From: {order.clientEmail}</span>
                            {order.budget && <span>Budget: ${order.budget}</span>}
                            <span>Deadline: {formatDate(order.deadline)}</span>
                          </div>
                        </div>
                        <Link href={`/messages?userId=${order.clientId}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
