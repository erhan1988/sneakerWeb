import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { allProducts as fallbackProducts } from '../data/products';
import { fetchProductsFromFirebase, Product } from '../services/productService';

interface ViewAllProductsPageProps {
  onNavigate: (page: string) => void;
  onAddToCart?: (product: Product) => void;
}

const ITEMS_PER_PAGE = 8;

export function ViewAllProductsPage({ onNavigate, onAddToCart }: ViewAllProductsPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products from Firebase on component mount
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const firebaseProducts = await fetchProductsFromFirebase();
      
      // Use Firebase products if available, otherwise use fallback
      if (firebaseProducts.length > 0) {
        setAllProducts(firebaseProducts);
      } else {
        setAllProducts(fallbackProducts);
      }
      
      setIsLoading(false);
    };
    
    getProducts();
  }, []);

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Sneakers
          </h1>
          <p className="text-gray-600 text-lg">
            {isLoading ? 'Loading products...' : `Showing ${startIndex + 1}-${Math.min(endIndex, allProducts.length)} of ${allProducts.length} products`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                
                <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden p-6 flex items-center justify-center">
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Heart size={18} />
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
                      aria-label="Add to cart"
                      onClick={() => onAddToCart?.(product)}>
                      <ShoppingCart size={18} className="text-white" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}>
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
