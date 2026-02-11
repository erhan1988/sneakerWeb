import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Lock,
  Mail,
  User,
  ArrowRight,
  AlertCircle } from
'lucide-react';
import { Button } from '../components/ui/Button';
import { auth, fbCreateUserWithEmailAndPassword, fbUpdateProfile, fbSendEmailVerification, addEmailToRegistry, isFirebaseConfigured } from '../lib/firebase';
interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onAuthChange?: () => void;
}
export function RegisterPage({ onNavigate, onAuthChange }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isFirebaseConfigured) {
      setError('Firebase is not configured. Add VITE_FIREBASE_* values to .env.local and restart the dev server.');
      return;
    }
    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    setIsLoading(true);
    try {
      const userCred = await fbCreateUserWithEmailAndPassword(auth, email, password);
      if (userCred.user) {
        // set display name
        try {
          await fbUpdateProfile(userCred.user, { displayName: name });
        } catch (e) {
          // ignore profile update errors
        }
        // Skip email verification - go directly to home
        if (onAuthChange) {
          onAuthChange();
        }
        onNavigate('home');
        // Add email to registry for forgot password functionality (non-blocking)
        void addEmailToRegistry(email).catch(() => {
          // ignore registry errors
        });
      }
    } catch (err: any) {
      // Check for specific Firebase error codes
      if (err?.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or sign in.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Invalid email address. Please enter a valid email.');
      } else if (err?.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const inputClasses =
  'w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white';
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Registration Form */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="max-w-md w-full space-y-8 bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the community and get exclusive access
          </p>
        </div>

        {error &&
        <motion.div
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">

            <AlertCircle
            className="text-red-500 flex-shrink-0 mt-0.5"
            size={18} />

            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        }

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
                placeholder="Full Name" />

            </div>
            <div className="relative">
              <label htmlFor="reg-email" className="sr-only">
                Email address
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="Email address" />

            </div>
            <div className="relative">
              <label htmlFor="reg-password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="reg-password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="Password (min 6 characters)" />

            </div>
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClasses}
                placeholder="Confirm Password" />

            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />

            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="text-blue-600 hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}>

            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline">

              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>);

}