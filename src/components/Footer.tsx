import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ShoppingBag } from
'lucide-react';
export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                <ShoppingBag size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                SNEAKER<span className="text-blue-500">STUDIO</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your premier destination for authentic sneakers and streetwear. We
              bring you the latest drops from top brands worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300">

                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300">

                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300">

                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Contact'].map((item) =>
                item === 'About Us' ? (
                  <li key={item}>
                    <button
                      onClick={() => {
                        navigate('/about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </button>
                  </li>
                ) : item === 'Contact' ? (
                  <li key={item}>
                    <button
                      onClick={() => {
                        navigate('/contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </button>
                  </li>
                ) : (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Customer Care</h3>
            <ul className="space-y-4">
              {[
                'Shop Collection',
                'Privacy Policy'
              ].map((item) =>
                item === 'Shop Collection' ? (
                  <li key={item}>
                    <button
                      onClick={() => {
                        navigate('/viewall');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </button>
                  </li>
                ) : item === 'Privacy Policy' ? (
                  <li key={item}>
                    <button
                      onClick={() => {
                        navigate('/privacy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-left text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </button>
                  </li>
                ) : (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                   Sneaker Street, Fashion District
                  <br />
                  Bitola 7000, Macedonia
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+389 76 835 635</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  demirov.erhan1988@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sneaker Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>);

}