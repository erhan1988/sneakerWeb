import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { auth, fbUpdateProfile } from '../lib/firebase';

interface AccountPageProps {
  onNavigate: (page: string) => void;
  user?: any | null;
  onAuthChange?: () => void;
}

export function AccountPage({ onNavigate, user, onAuthChange }: AccountPageProps) {
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const [name, setName] = useState(displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  const handleSave = async () => {
    if (!auth.currentUser) {
      setError('Please sign in to update your profile.');
      return;
    }
    if (!name.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    setError('');
    setSuccess('');
    setIsSaving(true);
    try {
      await fbUpdateProfile(auth.currentUser, { displayName: name.trim() });
      onAuthChange?.();
      setIsEditing(false);
      setSuccess('Username updated.');
    } catch (e) {
      setError('Failed to update username. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-sm  text-gray-900  hover:underline">
            &gt; Return Home
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold uppercase">
              {displayName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account</h1>
              <p className="text-sm text-gray-500">Your profile info</p>
            </div>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                {success}
              </div>
            )}
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Username</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">{displayName}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{userEmail}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave} isLoading={isSaving}>
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setName(displayName);
                    setIsEditing(false);
                    setError('');
                    setSuccess('');
                  }}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Username</Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
