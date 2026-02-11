import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}
export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title
}: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" />


          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20
            }}
            className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl pointer-events-auto relative">

              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 bg-gradient-to-b from-black/60 to-transparent">
                <h3 className="text-white font-medium text-lg drop-shadow-md hidden sm:block">
                  {title}
                </h3>
                <button
                onClick={onClose}
                className="ml-auto text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors backdrop-blur-md"
                aria-label="Close modal">

                  <X size={24} />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                src={`${videoUrl}?autoplay=1&rel=0`}
                title={title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />

              </div>
            </motion.div>
          </div>
        </>
      }
    </AnimatePresence>);

}