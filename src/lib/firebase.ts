import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut as fbSignOut,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  sendEmailVerification as fbSendEmailVerification,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  fetchSignInMethodsForEmail as fbFetchSignInMethodsForEmail
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { onAuthStateChanged, fbSignOut, fbSignInWithEmailAndPassword, fbCreateUserWithEmailAndPassword, fbUpdateProfile, fbSendEmailVerification, fbSendPasswordResetEmail, fbFetchSignInMethodsForEmail };

// Helper function to add email to registered users list
export const addEmailToRegistry = async (email: string) => {
  try {
    await setDoc(doc(collection(db, 'registered_emails'), email.toLowerCase()), {
      email: email.toLowerCase(),
      createdAt: new Date()
    });
  } catch (error) {
    console.error('Error adding email to registry:', error);
  }
};

// Helper function to check if email exists in registry
export const emailExists = async (email: string): Promise<boolean> => {
  try {
    const q = query(collection(db, 'registered_emails'), where('email', '==', email.toLowerCase()));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
};
