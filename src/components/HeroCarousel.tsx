import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
const slides = [
{
  id: 1,
  image:
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop',
  title: 'Step Into The Future',
  subtitle: 'New Arrival Collection 2025',
  cta: 'Shop Now',
  color: 'text-white'
},
{
  id: 2,
  image:
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2000&auto=format&fit=crop',
  title: 'Run With Purpose',
  subtitle: 'Performance Gear for Athletes',
  cta: 'Explore Running',
  color: 'text-white'
},
{
  id: 3,
  image:
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=2000&auto=format&fit=crop',
  title: 'Urban Street Style',
  subtitle: 'Redefine Your Everyday Look',
  cta: 'View Collection',
  color: 'text-white'
},
{
  id: 4,
  image:
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop',
  title: 'Limited Editions',
  subtitle: 'Exclusive Drops Every Week',
  cta: 'Get Access',
  color: 'text-white'
}];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.7
          }}
          className="absolute inset-0 w-full h-full">

          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover object-center" />


          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto">
              <motion.span
                initial={{
                  y: 20,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5
                }}
                className="inline-block py-1 px-3 rounded-full bg-blue-600/90 text-white text-sm font-bold tracking-wider mb-6">

                NEW SEASON
              </motion.span>
              <motion.h1
                initial={{
                  y: 20,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5
                }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">

                {slides[currentIndex].title}
              </motion.h1>
              <motion.p
                initial={{
                  y: 20,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.5
                }}
                className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">

                {slides[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{
                  y: 20,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5
                }}>

                <Button
                  size="lg"
                  className="rounded-full px-10 py-6 text-lg shadow-xl shadow-blue-900/20">

                  {slides[currentIndex].cta}{' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) =>
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-white/50 hover:bg-white'}`}
          aria-label={`Go to slide ${index + 1}`} />

        )}
      </div>
    </div>);

}