'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, query, where, getDocs, addDoc, Timestamp, User as FirebaseUser } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Service } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';

export default function OrderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ownerId = searchParams?.get('ownerId') as string;
  const portfolioId = searchParams?.get('portfolioId') as string;

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [customDescription, setCustomDescription] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [error, setError] = useState<string>('');

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
    if (!ownerId) return;

    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, 'services');
        const q = query(servicesRef, where('userId', '==', ownerId));
        const servicesSnap = await getDocs(q);
        const servicesList: Service[] = [];
        servicesSnap.forEach((doc) => {
          servicesList.push({ ...doc.data(), id: doc.id } as Service);
        });
        setServices(servicesList);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [ownerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('Please sign in to place an order');
      return;
    }

    if (!selectedService && !customDescription) {
      setError('Please select a service or describe your project');
      return;
    }

    if (!deadline) {
      setError('Please provide a deadline');
      return;
    }

    setSubmitting(true);

    try {
      const ordersRef = collection(db, 'orders');
      await addDoc(ordersRef, {
        clientId: currentUser.uid,
        clientEmail: currentUser.email,
        ownerId,
        portfolioId,
        serviceId: selectedService || null,
        customDescription,
        budget: budget ? parseFloat(budget) : null,
        deadline: new Date(deadline),
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      // Create initial notification for owner
      const notificationsRef = collection(db, 'notifications');
      await addDoc(notificationsRef, {
        userId: ownerId,
        type: 'new_order',
        message: `New order from ${currentUser.email}`,
        read: false,
        createdAt: Timestamp.now(),
      });

      router.push('/my-orders');
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8">Place an Order</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
                {error}
              </div>
            )}

            {/* Service Selection */}
            {services.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold">Select a Service (Optional)</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">${service.price}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Description */}
            <div className="space-y-3">
              <label htmlFor="description" className="block text-sm font-semibold">
                Project Description
              </label>
              <textarea
                id="description"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Describe your project in detail..."
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <label htmlFor="budget" className="block text-sm font-semibold">
                Budget (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-3">
              <label htmlFor="deadline" className="block text-sm font-semibold">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || loading}
                className="flex-1"
              >
                {submitting ? 'Creating Order...' : 'Create Order'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
