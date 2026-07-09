'use client'

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore'
import { db } from './firebase'
import { PortfolioItem, PricingConfig } from './types'

// Portfolio operations
export const addPortfolioItem = async (item: Omit<PortfolioItem, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'portfolio'), {
      ...item,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('[v0] Error adding portfolio item:', error)
    throw error
  }
}

export const updatePortfolioItem = async (id: string, item: Partial<PortfolioItem>) => {
  try {
    await updateDoc(doc(db, 'portfolio', id), {
      ...item,
      updatedAt: Date.now(),
    })
  } catch (error) {
    console.error('[v0] Error updating portfolio item:', error)
    throw error
  }
}

export const deletePortfolioItem = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'portfolio', id))
  } catch (error) {
    console.error('[v0] Error deleting portfolio item:', error)
    throw error
  }
}

export const getPortfolioItem = async (id: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'portfolio', id))
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PortfolioItem
    }
    return null
  } catch (error) {
    console.error('[v0] Error getting portfolio item:', error)
    throw error
  }
}

export const getPortfolioItems = async (constraints: QueryConstraint[] = []) => {
  try {
    const q = query(
      collection(db, 'portfolio'),
      orderBy('createdAt', 'desc'),
      ...constraints
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PortfolioItem[]
  } catch (error) {
    console.error('[v0] Error getting portfolio items:', error)
    throw error
  }
}

export const getFeaturedPortfolioItems = async (count = 6) => {
  try {
    const q = query(
      collection(db, 'portfolio'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(count)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as PortfolioItem[]
  } catch (error) {
    console.error('[v0] Error getting featured portfolio items:', error)
    throw error
  }
}

export const subscribeToPortfolioItems = (
  callback: (items: PortfolioItem[]) => void,
  constraints: QueryConstraint[] = []
) => {
  const q = query(
    collection(db, 'portfolio'),
    orderBy('createdAt', 'desc'),
    ...constraints
  )
  return onSnapshot(
    q,
    (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PortfolioItem[]
      callback(items)
    },
    (error) => {
      console.error('[v0] Error subscribing to portfolio items:', error)
    }
  )
}

// Pricing operations
export const addPricingConfig = async (config: PricingConfig) => {
  try {
    const docRef = await addDoc(collection(db, 'pricing'), config)
    return docRef.id
  } catch (error) {
    console.error('[v0] Error adding pricing config:', error)
    throw error
  }
}

export const updatePricingConfig = async (id: string, config: Partial<PricingConfig>) => {
  try {
    await updateDoc(doc(db, 'pricing', id), config)
  } catch (error) {
    console.error('[v0] Error updating pricing config:', error)
    throw error
  }
}

export const getPricingConfigs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'pricing'))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (PricingConfig & { id: string })[]
  } catch (error) {
    console.error('[v0] Error getting pricing configs:', error)
    throw error
  }
}

export const subscribeToPricingConfigs = (
  callback: (configs: (PricingConfig & { id: string })[]) => void
) => {
  return onSnapshot(
    collection(db, 'pricing'),
    (querySnapshot) => {
      const configs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (PricingConfig & { id: string })[]
      callback(configs)
    },
    (error) => {
      console.error('[v0] Error subscribing to pricing configs:', error)
    }
  )
}
