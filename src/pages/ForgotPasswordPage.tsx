import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { auth, fbSendPasswordResetEmail, emailExists } from '../lib/firebase';

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Check if email exists in our registry
      const exists = await emailExists(email);
      
      if (!exists) {
        setError('No account found with this email address. Please register first.');
        setIsLoading(false);
        return;
      }

      // Email exists, send reset email
      await fbSendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err: any) {
      if (err?.code === 'auth/invalid-email') {
        setError('Invalid email address. Please enter a valid email.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    'w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white';

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to{' '}
            <span className="font-medium text-gray-900">{email}</span>.
            Please check your inbox and follow the instructions to reset your password.
          </p>
          
          <Button onClick={() => onNavigate('login')} className="w-full">
            Back to Login
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag size={24} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-700">{error}</p>
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="Email address"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}>
            Send Reset Link
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mx-auto">
            <ArrowLeft size={16} />
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
