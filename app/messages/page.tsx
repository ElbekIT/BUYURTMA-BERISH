'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  User as FirebaseUser,
  getDocs,
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderEmail: string;
  recipientId: string;
  text: string;
  createdAt: Date;
}

interface Conversation {
  userId: string;
  userEmail: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUserId = searchParams?.get('userId') as string | null;

  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!currentUser) return;

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const conversations = new Map<string, Conversation>();

      snapshot.forEach((doc) => {
        const data = doc.data() as any;
        const otherUserId =
          data.senderId === currentUser.uid ? data.recipientId : data.senderId;
        const otherUserEmail =
          data.senderId === currentUser.uid ? data.recipientEmail : data.senderEmail;

        if (!conversations.has(otherUserId)) {
          conversations.set(otherUserId, {
            userId: otherUserId,
            userEmail: otherUserEmail,
            lastMessage: data.text,
            lastMessageTime: data.createdAt?.toDate?.() || new Date(),
          });
        }
      });

      setConversations(Array.from(conversations.values()));
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !selectedUserId) {
      setMessages([]);
      return;
    }

    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList: Message[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as any;
        const otherUserId =
          data.senderId === currentUser.uid ? data.recipientId : data.senderId;

        if (otherUserId === selectedUserId) {
          messagesList.push({
            id: doc.id,
            senderId: data.senderId,
            senderEmail: data.senderEmail,
            recipientId: data.recipientId,
            text: data.text,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          });
        }
      });

      setMessages(messagesList);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
    });

    return unsubscribe;
  }, [currentUser, selectedUserId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !selectedUserId || !messageText.trim()) return;

    setSending(true);

    try {
      const messagesRef = collection(db, 'messages');
      await addDoc(messagesRef, {
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        recipientId: selectedUserId,
        text: messageText.trim(),
        participants: [currentUser.uid, selectedUserId],
        createdAt: Timestamp.now(),
      });

      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-120px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Conversations List */}
          <div className="bg-card border border-border rounded-lg flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {conversations.map((conv) => (
                    <button
                      key={conv.userId}
                      onClick={() =>
                        router.push(`/messages?userId=${conv.userId}`)
                      }
                      className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                        selectedUserId === conv.userId ? 'bg-muted border-l-2 border-accent' : ''
                      }`}
                    >
                      <p className="font-medium text-sm truncate">{conv.userEmail}</p>
                      {conv.lastMessage && (
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {conv.lastMessage}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          {selectedUserId && messages.length >= 0 ? (
            <div className="lg:col-span-2 bg-card border border-border rounded-lg flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <button
                  onClick={() => router.push('/messages')}
                  className="lg:hidden p-2 hover:bg-muted rounded"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="font-bold">
                  {conversations.find((c) => c.userId === selectedUserId)?.userEmail}
                </h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === currentUser.uid
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === currentUser.uid
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.createdAt.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-border flex gap-2"
              >
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={sending}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={sending || !messageText.trim()}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
