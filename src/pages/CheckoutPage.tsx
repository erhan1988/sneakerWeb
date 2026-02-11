import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  MapPin,
  Mail,
  User,
  Minus,
  Plus,
  Trash2 } from
'lucide-react';
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
interface CheckoutPageProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}
export function CheckoutPage({
  cartItems,
  onNavigate,
  onUpdateQuantity
}: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onNavigate('checkout-success');
    }, 2000);
  };
  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;
  const inputClasses =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1';
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-20 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any sneakers yet.
          </p>
          <Button onClick={() => onNavigate('home')}>Start Shopping</Button>
        </div>
      </div>);

  }
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Back Link */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">

            <ArrowLeft size={20} className="mr-2" />
            Back to Shop
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          {/* LEFT COLUMN - Order Summary (2/5 width on desktop) */}
          <div className="lg:col-span-2 mb-8 lg:mb-0 order-1">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">

              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  Order Summary
                  <span className="ml-auto text-sm font-normal text-gray-500">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items
                  </span>
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {cartItems.map((item) =>
                <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2" />

                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900 whitespace-nowrap">
                          {(item.priceNum * item.quantity).toLocaleString()} МКД
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-50 text-gray-500 transition-colors"
                          disabled={item.quantity <= 1}>

                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-50 text-gray-500 transition-colors">

                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{subtotal.toLocaleString()} МКД</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{total.toLocaleString()} МКД</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                  <ShieldCheck
                    className="text-blue-600 flex-shrink-0 mt-0.5"
                    size={20} />

                  <div>
                    <h4 className="text-sm font-bold text-blue-900">
                      Secure Checkout
                    </h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Your payment information is encrypted and processed
                      securely.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN - Payment Form (3/5 width on desktop) */}
          <div className="lg:col-span-3 order-2">
            <motion.form
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              onSubmit={handleSubmit}
              className="space-y-6">

              {/* Shipping Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Truck size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="name" className={labelClasses}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />

                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={`${inputClasses} pl-10`}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange} />

                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className={labelClasses}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />

                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`${inputClasses} pl-10`}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange} />

                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClasses}>
                      Address
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />

                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        className={`${inputClasses} pl-10`}
                        placeholder="123 Street Name"
                        value={formData.address}
                        onChange={handleInputChange} />

                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className={labelClasses}>
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      className={inputClasses}
                      placeholder="Skopje"
                      value={formData.city}
                      onChange={handleInputChange} />

                  </div>

                  <div>
                    <label htmlFor="postalCode" className={labelClasses}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      className={inputClasses}
                      placeholder="1000"
                      value={formData.postalCode}
                      onChange={handleInputChange} />

                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <CreditCard size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Details
                  </h2>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <div className="bg-white p-1 rounded border border-gray-200 shadow-sm">
                    <CreditCard size={16} className="text-gray-500" />
                  </div>
                  <div className="text-sm text-gray-600 font-mono">
                    <p>
                      Test card:{' '}
                      <span className="font-bold text-gray-900">
                        4242 4242 4242 4242
                      </span>
                    </p>
                    <p>
                      Exp:{' '}
                      <span className="font-bold text-gray-900">12/28</span> |
                      CVV: <span className="font-bold text-gray-900">123</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className={labelClasses}>
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18} />

                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        required
                        className={`${inputClasses} pl-10`}
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange} />

                    </div>
                  </div>

                  <div>
                    <label htmlFor="expiry" className={labelClasses}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      required
                      className={inputClasses}
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange} />

                  </div>

                  <div>
                    <label htmlFor="cvv" className={labelClasses}>
                      CVV
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={16} />

                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        className={`${inputClasses} pl-10`}
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange} />

                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full py-4 text-lg shadow-lg shadow-blue-600/20"
                isLoading={isProcessing}
                leftIcon={<Lock size={20} />}>

                Pay {total.toLocaleString()} МКД
              </Button>

              <div className="flex justify-center gap-6 pt-4 opacity-60 grayscale">
                {/* Trust badges placeholders using text/icons since we don't have images */}
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                  <ShieldCheck size={14} /> Secure Payment
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                  <Truck size={14} /> Fast Shipping
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>);

}