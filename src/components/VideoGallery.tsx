import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoModal } from './VideoModal';
const videos = [
{
  id: 1,
  title: 'Nike & Adidas Sneakers',
  image:
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
  duration: '3:15',
  videoUrl: 'https://www.youtube.com/embed/bYG2URoquF8'
},
{
  id: 2,
  title: 'Adidas Sneaker Collection',
  image:
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
  duration: '4:30',
  videoUrl: 'https://www.youtube.com/embed/pom-Oq0DixI'
},
{
  id: 3,
  title: 'Puma Sneakers',
  image:
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop',
  duration: '2:45',
  videoUrl: 'https://www.youtube.com/embed/NBn-CbjC7mw'
}];

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(
    null
  );
  // Supabase integration:
  // const { data: videos } = await supabase.from('videos').select('*')
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Watch & Explore
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dive deeper into the culture of sneakers and street fashion with our
            curated video series.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) =>
          <motion.div
            key={video.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5
            }}
            viewport={{
              once: true
            }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}>

              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video mb-4">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <img
                src={video.image}
                alt={video.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-20 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
            </motion.div>
          )}
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ''}
        title={selectedVideo?.title || ''} />

    </section>);

}