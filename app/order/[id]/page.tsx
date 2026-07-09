'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc, User as FirebaseUser } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Clock, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  clientId: string;
  clientEmail: string;
  ownerId: string;
  customDescription: string;
  budget?: number;
  deadline: Date;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

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
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (orderSnap.exists()) {
          const data = orderSnap.data();
          setOrder({
            id: orderSnap.id,
            clientId: data.clientId,
            clientEmail: data.clientEmail,
            ownerId: data.ownerId,
            customDescription: data.customDescription,
            budget: data.budget,
            deadline: data.deadline?.toDate?.() || new Date(data.deadline),
            status: data.status,
            createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-32" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </main>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Order not found</p>
          </div>
        </main>
      </div>
    );
  }

  const isOwner = currentUser?.uid === order.ownerId;
  const isClient = currentUser?.uid === order.clientId;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Order Details</h1>
                <p className="text-muted-foreground">Order ID: {order.id}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Description */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Project Description</h2>
                <p className="text-foreground whitespace-pre-wrap">{order.customDescription}</p>
              </div>

              {/* Timeline */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Timeline</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="font-medium">{formatDate(order.deadline)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-muted-foreground">Days Remaining</span>
                    <span className="font-medium">
                      {Math.ceil(
                        (order.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Info */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {isClient ? 'Designer' : 'Client'}
                  </p>
                  <p className="font-medium">{isClient ? order.ownerId : order.clientEmail}</p>
                </div>

                {order.budget && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-1">Budget</p>
                    <p className="text-2xl font-bold text-accent">${order.budget}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <Link
                    href={`/messages?userId=${isClient ? order.ownerId : order.clientId}`}
                    className="block"
                  >
                    <Button className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Contact {isClient ? 'Designer' : 'Client'}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Status Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Status</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    This order is currently{' '}
                    <span className="font-medium text-foreground">
                      {order.status.replace('_', ' ')}
                    </span>
                  </p>
                  {order.status === 'pending' && isOwner && (
                    <p className="text-muted-foreground pt-2">
                      Check your messages to discuss details with the client.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
