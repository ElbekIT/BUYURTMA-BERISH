'use client'

import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyATIFGP4ImY-OH_QP34jGa7iwpbgoscgh8",
  authDomain: "buyurtma-berish-uchun.firebaseapp.com",
  databaseURL: "https://buyurtma-berish-uchun-default-rtdb.firebaseio.com",
  projectId: "buyurtma-berish-uchun",
  storageBucket: "buyurtma-berish-uchun.firebasestorage.app",
  messagingSenderId: "327644162272",
  appId: "1:327644162272:web:57100e6c4b1c0141e0c885",
  measurementId: "G-S0PJ9D138B"
};

// Validate configuration
const isConfigured = Object.values(firebaseConfig).every(val => val && val !== 'undefined')

// Initialize Firebase (only once)
let app
let auth
let db
let storage
let googleProvider

if (isConfigured) {
  // Initialize app only if not already initialized
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

  // Initialize Auth
  auth = getAuth(app)

  // Initialize Firestore
  db = getFirestore(app)

  // Initialize Storage
  storage = getStorage(app)

  // Set persistence
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('[v0] Error setting auth persistence:', error)
  })

  // Google Auth Provider
  googleProvider = new GoogleAuthProvider()
  googleProvider.addScope('profile')
  googleProvider.addScope('email')
}

export { app, auth, db, storage, googleProvider, isConfigured }
