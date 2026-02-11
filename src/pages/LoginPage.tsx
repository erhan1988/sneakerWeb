import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { auth, fbSignInWithEmailAndPassword } from '../lib/firebase';
interface LoginPageProps {
  onNavigate: (page: string) => void;
  onAuthChange?: () => void;
}
export function LoginPage({ onNavigate, onAuthChange }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const userCred = await fbSignInWithEmailAndPassword(auth, email, password);
      if (userCred.user) {
        onAuthChange?.();
        onNavigate('home');
      }
    } catch (err: any) {
      // Check for specific Firebase error codes
      if (err?.code === 'auth/user-not-found') {
        setError('No account found with this email. Please register first.');
      } else if (err?.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Invalid email address. Please enter a valid email.');
      } else if (err?.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else if (err?.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const inputClasses =
  'w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white';
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
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

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
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
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="Password" />

            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />

              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900">

                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}>

            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => onNavigate('register')}
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline">

              Register now
            </button>
          </p>
        </div>
      </motion.div>
    </div>);

}