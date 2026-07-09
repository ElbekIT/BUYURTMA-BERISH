'use client'

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage'
import { storage } from './firebase'

export const uploadPortfolioImage = async (
  file: File,
  portfolioId: string
): Promise<string> => {
  try {
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    const storageRef = ref(storage, `portfolio/${portfolioId}/${fileName}`)

    const snapshot = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)

    return downloadUrl
  } catch (error) {
    console.error('[v0] Error uploading image:', error)
    throw error
  }
}

export const deletePortfolioImage = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl)
    await deleteObject(imageRef)
  } catch (error) {
    console.error('[v0] Error deleting image:', error)
    throw error
  }
}

export const getImageUrl = async (path: string): Promise<string> => {
  try {
    const imageRef = ref(storage, path)
    return await getDownloadURL(imageRef)
  } catch (error) {
    console.error('[v0] Error getting image URL:', error)
    throw error
  }
}

export const listPortfolioImages = async (portfolioId: string) => {
  try {
    const listRef = ref(storage, `portfolio/${portfolioId}`)
    const result = await listAll(listRef)

    const urls = await Promise.all(
      result.items.map((itemRef) => getDownloadURL(itemRef))
    )

    return urls
  } catch (error) {
    console.error('[v0] Error listing portfolio images:', error)
    throw error
  }
}
