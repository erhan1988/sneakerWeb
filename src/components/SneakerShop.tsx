import React, { useState } from 'react';
import { ShoppingCart, Heart, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
// TODO: Fetch products from Supabase
// const { data: products } = await supabase.from('products').select('*')
const products = [
{
  id: 1,
  name: 'Nike Air Max 90',
  price: '8,990 МКД',
  priceNum: 8990,
  category: 'Running',
  image:
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  isNew: true
},
{
  id: 2,
  name: 'Adidas Ultraboost',
  price: '10,490 МКД',
  priceNum: 10490,
  category: 'Performance',
  image:
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
  isNew: false
},
{
  id: 3,
  name: 'Puma RS-X',
  price: '6,290 МКД',
  priceNum: 6290,
  category: 'Lifestyle',
  image:
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop',
  isNew: true
},
{
  id: 4,
  name: 'Vans Old Skool',
  price: '4,590 МКД',
  priceNum: 4590,
  category: 'Skate',
  image:
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
  isNew: false
},
{
  id: 5,
  name: 'New Balance 574',
  price: '5,990 МКД',
  priceNum: 5990,
  category: 'Classic',
  image:
  'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop',
  isNew: false
},
{
  id: 6,
  name: 'Jordan Retro High',
  price: '12,990 МКД',
  priceNum: 12990,
  category: 'Basketball',
  image:
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop',
  isNew: true
},
{
  id: 7,
  name: 'Reebok Club C',
  price: '4,990 МКД',
  priceNum: 4990,
  category: 'Retro',
  image:
  'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1000&auto=format&fit=crop',
  isNew: false
},
{
  id: 8,
  name: 'Converse Chuck 70',
  price: '5,290 МКД',
  priceNum: 5290,
  category: 'Casual',
  image:
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop',
  isNew: false
}];

interface SneakerShopProps {
  onAddToCart?: (product: (typeof products)[0]) => void;
  searchQuery?: string;
  onNavigate?: (page: string) => void;
}
export function SneakerShop({ onAddToCart, searchQuery = '', onNavigate }: SneakerShopProps) {
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  
  // Filter products based on search query from Header
  const filteredProducts = searchQuery.trim() === '' 
    ? products 
    : products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop Our Collection
            </h2>
            <p className="text-gray-600 max-w-xl">
              Discover the latest drops and timeless classics. Premium footwear
              for every style and occasion.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('viewall')}
            className="hidden md:block text-blue-600 font-medium hover:text-blue-700 hover:underline mt-4 md:mt-0">

            View All Products &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) =>
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05,
              duration: 0.5
            }}
            viewport={{
              once: true
            }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

              <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden p-6 flex items-center justify-center">
                {product.isNew &&
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
              }
                <button className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Heart size={18} />
                </button>
                <img
                src={product.image}
                alt={product.name}
                onClick={() => setSelectedImage({ url: product.image, name: product.name })}
                className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500 cursor-pointer" />

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
            )
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No sneakers found matching "{searchQuery}"</p>
              <button
                onClick={() => {}}
                disabled
                className="mt-4 text-gray-400 font-medium cursor-not-allowed">
                Use the search in the header to view all products
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onNavigate?.('viewall')}>
            View All Products
          </Button>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4"
            onClick={() => setSelectedImage(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors">
                <X size={24} className="text-gray-700" />
              </button>
              
              <div className="p-8">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                />
                <h3 className="text-2xl font-bold text-gray-900 mt-6 text-center">
                  {selectedImage.name}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>);

}