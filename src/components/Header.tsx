import React, { useState } from 'react';
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  User,
  LogOut,
  ChevronDown } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user?: any | null;
  onLogout?: () => void;
  onShowLoginModal?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}
export function Header({
  onNavigate,
  currentPage,
  user,
  onLogout,
  onShowLoginModal,
  searchQuery = '',
  onSearchChange
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
  {
    name: 'Home',
    page: 'home',
    href: '#'
  },
  {
    name: 'Shop',
    page: 'home',
    href: '#shop'
  },
  {
    name: 'About',
    page: 'about',
    href: '#'
  },
  {
    name: 'Contact Us',
    page: 'contact',
    href: '#'
  }];

  const handleNavClick = (link: (typeof navLinks)[0]) => {
    if (link.name === 'Shop') {
      onNavigate('home');
      setTimeout(() => {
        const shopSection = document.getElementById('shop');
        if (shopSection) {
          shopSection.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      onNavigate(link.page);
    }
    setIsMobileMenuOpen(false);
  };
  const handleAccount = () => {
    onNavigate('account');
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };
  const handleLogout = () => {
    onLogout?.();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };
  // Get display name from Firebase user or email
  const displayName =
  user?.displayName || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2">

              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <ShoppingBag size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                SNEAKER<span className="text-blue-600">STUDIO</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page && link.name !== 'Shop';
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>

                  {link.name}
                  {isActive &&
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }} />

                  }
                </button>);

            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <input
                  type="text"
                  placeholder="Search sneakers..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  onBlur={() => {
                    if (searchQuery === '') {
                      setIsSearchOpen(false);
                    }
                  }}
                  autoFocus
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm w-48"
                />
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Search size={20} />
                </button>
              )}
            </div>
            
            {/* Checkout/Cart Button */}
            <button 
              onClick={() => {
                if (!user) {
                  onShowLoginModal?.();
                } else {
                  onNavigate('checkout');
                }
              }}
              className="text-gray-500 hover:text-blue-600 transition-colors relative">
              <ShoppingBag size={20} />
            </button>
            
            <div className="h-4 w-px bg-gray-300"></div>

            {user /* Logged-in state */ ?
            <div className="relative">
                <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">

                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold uppercase">
                    {displayName.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown
                  size={16}
                  className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />

                </button>

                <AnimatePresence>
                  {isUserMenuOpen &&
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95
                  }}
                  transition={{
                    duration: 0.15
                  }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">

                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userEmail}
                        </p>
                      </div>
                      <button
                    onClick={handleAccount}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">

                        <User size={16} />
                        Account
                      </button>
                      <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">

                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                }
                </AnimatePresence>
              </div> /* Logged-out state */ :

            <div className="flex items-center space-x-4">
                <button
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">

                  Login
                </button>
                <button
                onClick={() => onNavigate('register')}
                className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">

                  Register
                </button>
              </div>
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
              aria-label="Toggle menu">

              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden bg-white border-t border-gray-100 overflow-hidden">

            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) =>
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentPage === link.page && link.name !== 'Shop' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>

                  {link.name}
                </button>
            )}
              
              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  if (!user) {
                    onShowLoginModal?.();
                  } else {
                    onNavigate('checkout');
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                <ShoppingBag size={20} />
                <span>My Cart</span>
              </button>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col space-y-3 px-3">
                {user ?
              <>
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold uppercase">
                        {displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                      </div>
                    </div>
                    <button
                  onClick={handleAccount}
                  className="flex items-center justify-center bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium w-full hover:bg-gray-100 transition-colors">

                      <User size={18} className="mr-2" />
                      Account
                    </button>
                    <button
                  onClick={handleLogout}
                  className="flex items-center justify-center bg-red-50 text-red-600 px-4 py-3 rounded-lg font-medium w-full hover:bg-red-100 transition-colors">

                      <LogOut size={18} className="mr-2" />
                      Sign Out
                    </button>
                  </> :

              <>
                    <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center text-gray-700 font-medium w-full text-left">

                      <User size={18} className="mr-2" /> Login
                    </button>
                    <button
                  onClick={() => {
                    onNavigate('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-lg font-medium w-full">

                      Create Account
                    </button>
                  </>
              }
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}