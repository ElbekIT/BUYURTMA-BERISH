'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User as FirebaseUser, addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [router]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files].slice(0, 5);
    setImages(newFiles);

    const previews: string[] = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === newFiles.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      setError('Please sign in to create a portfolio');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Please fill in required fields');
      return;
    }

    setSubmitting(true);

    try {
      const uploadedImageUrls: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const storageRef = ref(storage, `portfolios/${currentUser.uid}/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedImageUrls.push(url);
      }

      const portfoliosRef = collection(db, 'portfolios');
      await addDoc(portfoliosRef, {
        userId: currentUser.uid,
        ownerName: currentUser.displayName || currentUser.email?.split('@')[0],
        ownerEmail: currentUser.email,
        title: title.trim(),
        description: description.trim(),
        details: details.trim(),
        images: uploadedImageUrls,
        rating: 0,
        published,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating portfolio:', error);
      setError('Failed to create portfolio. Please try again.');
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
          <h1 className="text-3xl font-bold mb-8">Create Portfolio</h1>

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
                placeholder="e.g., Brand Identity Design"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                placeholder="Brief description of this portfolio piece"
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
                placeholder="More detailed information about the project"
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Images */}
            <div className="space-y-3">
              <label htmlFor="images" className="block text-sm font-semibold">
                Images (Max 5)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag images here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {imagePreviews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden bg-muted h-32"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <span className="text-white text-sm font-medium">Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                Publish immediately (make visible to clients)
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
                {submitting ? 'Creating...' : 'Create Portfolio'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
