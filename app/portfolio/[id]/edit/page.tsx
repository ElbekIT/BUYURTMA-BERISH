'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User as FirebaseUser, doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X } from 'lucide-react';
import { Portfolio } from '@/lib/types';

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params?.id as string;

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

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
    if (!portfolioId || !currentUser) return;

    const fetchPortfolio = async () => {
      try {
        const portfolioRef = doc(db, 'portfolios', portfolioId);
        const portfolioSnap = await getDoc(portfolioRef);

        if (portfolioSnap.exists()) {
          const data = portfolioSnap.data() as Portfolio;

          // Check authorization
          if (data.userId !== currentUser.uid) {
            setError('Unauthorized');
            return;
          }

          setPortfolio(data);
          setTitle(data.title);
          setDescription(data.description);
          setDetails(data.details || '');
          setImages(data.images || []);
          setPublished(data.published);
        } else {
          setError('Portfolio not found');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [portfolioId, currentUser]);

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = images.length + newImages.length + files.length;

    if (total > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    const newFiles = [...newImages, ...files];
    setNewImages(newFiles);

    const previews: string[] = [];
    let loaded = 0;

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        loaded++;
        if (loaded === newFiles.length) {
          setNewImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    const newFiles = newImages.filter((_, i) => i !== index);
    const newPreviews = newImagePreviews.filter((_, i) => i !== index);
    setNewImages(newFiles);
    setNewImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentUser || !portfolio) {
      setError('Please sign in to edit a portfolio');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Please fill in required fields');
      return;
    }

    setSubmitting(true);

    try {
      let allImages = [...images];

      // Upload new images
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
        const storageRef = ref(storage, `portfolios/${currentUser.uid}/${Date.now()}-${i}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        allImages.push(url);
      }

      const portfolioRef = doc(db, 'portfolios', portfolioId);
      await updateDoc(portfolioRef, {
        title: title.trim(),
        description: description.trim(),
        details: details.trim(),
        images: allImages,
        published,
        updatedAt: Timestamp.now(),
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating portfolio:', error);
      setError('Failed to update portfolio. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">{error || 'Portfolio not found'}</p>
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
          <h1 className="text-3xl font-bold mb-8">Edit Portfolio</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-semibold">
                Portfolio Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label htmlFor="description" className="block text-sm font-semibold">
                Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Details */}
            <div className="space-y-3">
              <label htmlFor="details" className="block text-sm font-semibold">
                Details
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Existing Images */}
            {images.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold">Existing Images</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden bg-muted h-32"
                    >
                      <img
                        src={image}
                        alt={`Portfolio ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            {images.length + newImages.length < 5 && (
              <div className="space-y-3">
                <label htmlFor="new-images" className="block text-sm font-semibold">
                  Add New Images ({images.length + newImages.length}/5)
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="new-images"
                    multiple
                    accept="image/*"
                    onChange={handleAddImages}
                    className="hidden"
                  />
                  <label htmlFor="new-images" className="cursor-pointer">
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag images here
                    </p>
                  </label>
                </div>
              </div>
            )}

            {newImagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {newImagePreviews.map((preview, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-lg overflow-hidden bg-muted h-32"
                  >
                    <img
                      src={preview}
                      alt={`New ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Published */}
            <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                Published (visible to clients)
              </label>
            </div>

            {/* Submit */}
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
                disabled={submitting}
                className="flex-1"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
