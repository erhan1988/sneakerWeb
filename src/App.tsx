import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { VideoGallery } from './components/VideoGallery';
import { SneakerShop } from './components/SneakerShop';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutSuccessPage } from './pages/CheckoutSuccessPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ViewAllProductsPage } from './pages/ViewAllProductsPage';
import { AccountPage } from './pages/AccountPage';
import { auth, onAuthStateChanged, fbSignOut as signOut } from './lib/firebase';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  quantity: number;
}
export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  // Check for existing session on mount (Firebase)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Initialize products in Firebase on first load
  useEffect(() => {
    const initProducts = async () => {
      try {
        // You can trigger this manually or on first load
        // Uncomment the line below to auto-initialize on first load
        // await initializeProductsInFirebase();
      } catch (error) {
        console.error('Error initializing products:', error);
      }
    };
    
    // Store a flag in localStorage to check if we've already initialized
    const hasInitialized = localStorage.getItem('firebaseProductsInitialized');
    if (!hasInitialized) {
      // Uncomment to auto-initialize
      // initProducts();
      // localStorage.setItem('firebaseProductsInitialized', 'true');
    }
  }, []);
  // compute current page from location for header active state
  const pathToPage = (path: string) => {
    const p = path.replace(/\/$/, '');
    switch (p) {
      case '':
      case '/':
      case '/home':
        return 'home';
      case '/about':
        return 'about';
      case '/contact':
        return 'contact';
      case '/login':
        return 'login';
      case '/register':
        return 'register';
      case '/forgot-password':
        return 'forgot-password';
      case '/checkout':
        return 'checkout';
      case '/checkout-success':
        return 'checkout-success';
      case '/viewall':
        return 'viewall';
      case '/account':
        return 'account';
      default:
        return 'home';
    }
  };

  const currentPage = pathToPage(location.pathname);

  const handleNavigate = (page: string) => {
    const pageToPath = (p: string) => {
      switch (p) {
        case 'home':
          return '/';
        case 'about':
          return '/about';
        case 'contact':
          return '/contact';
        case 'login':
          return '/login';
        case 'register':
          return '/register';
        case 'forgot-password':
          return '/forgot-password';
        case 'checkout':
          return '/checkout';
        case 'checkout-success':
          return '/checkout-success';
        case 'viewall':
          return '/viewall';
        case 'account':
          return '/account';
        default:
          return '/';
      }
    };
    const path = pageToPath(page);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
    handleNavigate('home');
  };
  const refreshAuth = async () => {
    setUser(auth.currentUser ?? null);
    if (auth.currentUser) {
      handleNavigate('home');
    }
  };
  const addToCart = (product: any) => {
    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Product exists, increase quantity
      setCartItems(prev =>
        prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Product doesn't exist, add new item
      setCartItems(prev => [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
    
    handleNavigate('checkout');
  };
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    })
    );
  };
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -10
    }
  };
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
        onShowLoginModal={() => setShowLoginModal(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login first to add items to your cart and complete your purchase.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  handleNavigate('login');
                }}
                className="flex-1 px-4 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                Go to Login
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={(
                <motion.div
                  key="home"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  {searchQuery === '' && (
                    <>
                      <HeroCarousel />
                      <VideoGallery />
                    </>
                  )}
                  <SneakerShop onAddToCart={addToCart} searchQuery={searchQuery} onNavigate={handleNavigate} />
                </motion.div>
              )}
            />
            <Route
              path="/home"
              element={<Route path="/" />} />
            <Route
              path="/about"
              element={(
                <motion.div
                  key="about"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <AboutPage onNavigate={handleNavigate} />
                </motion.div>
              )}
            />
            <Route
              path="/contact"
              element={(
                <motion.div
                  key="contact"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <ContactPage />
                </motion.div>
              )}
            />
            <Route
              path="/login"
              element={(
                <motion.div
                  key="login"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <LoginPage onNavigate={handleNavigate} onAuthChange={refreshAuth} />
                </motion.div>
              )}
            />
            <Route
              path="/register"
              element={(
                <motion.div
                  key="register"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <RegisterPage onNavigate={handleNavigate} onAuthChange={refreshAuth} />
                </motion.div>
              )}
            />
            <Route
              path="/forgot-password"
              element={(
                <motion.div
                  key="forgot-password"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <ForgotPasswordPage onNavigate={handleNavigate} />
                </motion.div>
              )}
            />
            <Route
              path="/checkout"
              element={(
                <motion.div
                  key="checkout"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <CheckoutPage cartItems={cartItems} onNavigate={handleNavigate} onUpdateQuantity={updateQuantity} />
                </motion.div>
              )}
            />
            <Route
              path="/checkout-success"
              element={(
                <motion.div
                  key="checkout-success"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <CheckoutSuccessPage cartItems={cartItems} onNavigate={handleNavigate} />
                </motion.div>
              )}
            />
            <Route
              path="/privacy"
              element={(
                <motion.div
                  key="privacy"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <PrivacyPage />
                </motion.div>
              )}
            />
            <Route
              path="/viewall"
              element={(
                <motion.div
                  key="viewall"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <ViewAllProductsPage onNavigate={handleNavigate} onAddToCart={addToCart} />
                </motion.div>
              )}
            />
            <Route
              path="/account"
              element={(
                <motion.div
                  key="account"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.3 }}>
                  <AccountPage onNavigate={handleNavigate} user={user} onAuthChange={refreshAuth} />
                </motion.div>
              )}
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}