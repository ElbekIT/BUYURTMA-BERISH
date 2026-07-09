export interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'provider'
  createdAt: Date
}

export interface Portfolio {
  id: string
  userId: string
  title: string
  description: string
  images: string[]
  services: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  portfolioId: string
  name: string
  price: number
  description: string
}

export interface Order {
  id: string
  clientId: string
  providerId: string
  portfolioId: string
  serviceId: string
  title: string
  description: string
  customDetails: string
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  orderId: string
  senderId: string
  content: string
  attachmentUrl?: string
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: 'order' | 'message' | 'status-update'
  message: string
  orderId?: string
  read: boolean
  createdAt: Date
}
