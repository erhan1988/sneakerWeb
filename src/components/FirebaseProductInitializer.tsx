import React, { useState } from 'react';
import { initializeProductsInFirebase } from '../services/productService';

/**
 * Development component to initialize Firebase products
 * Add this to your app temporarily to populate Firebase with products
 * Then remove it after initialization
 */
export function FirebaseProductInitializer() {
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = async () => {
    if (window.confirm('This will add all products to Firebase. Continue?')) {
      setIsLoading(true);
      try {
        await initializeProductsInFirebase();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg z-40">
      <button
        onClick={handleInitialize}
        disabled={isLoading}
        className="px-4 py-2 bg-white text-blue-600 rounded font-bold hover:bg-gray-100 disabled:opacity-50">
        {isLoading ? 'Adding Products...' : '🔧 Initialize Firebase Products'}
      </button>
      <p className="text-sm mt-2">Click to populate Firebase with products</p>
    </div>
  );
}
