import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  quantity: number;
}
interface CheckoutSuccessPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
}
export function CheckoutSuccessPage({
  cartItems,
  onNavigate
}: CheckoutSuccessPageProps) {
  const [orderId, setOrderId] = useState('');
  useEffect(() => {
    // Generate random order ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderId(`SNK-${randomId}`);
  }, []);
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.5
        }}
        className="max-w-lg w-full text-center">

        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">

          <CheckCircle size={48} strokeWidth={3} />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <span className="text-gray-500">Order Number</span>
            <span className="font-mono font-bold text-gray-900">{orderId}</span>
          </div>

          <div className="space-y-3 mb-4">
            {cartItems.map((item) =>
            <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-800">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium text-gray-900">
                  {(item.priceNum * item.quantity).toLocaleString()} МКД
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="font-bold text-gray-900">Total Paid</span>
            <span className="font-bold text-blue-600 text-lg">
              {total.toLocaleString()} МКД
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
          Your order is being prepared and will be shipped within 2-3 business
          days. You will receive a confirmation email shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => onNavigate('home')}
            size="lg"
            leftIcon={<ShoppingBag size={20} />}>

            Continue Shopping
          </Button>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<FileText size={20} />}
            onClick={() => {}} // Non-functional
          >
            View Order Details
          </Button>
        </div>
      </motion.div>
    </div>);

}