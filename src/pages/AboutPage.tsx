import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
interface AboutPageProps {
  onNavigate: (page: string) => void;
}
export function AboutPage({ onNavigate }: AboutPageProps) {
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5
    }
  };
  return (
    <div className="min-h-screen bg-white pt-0 pb-0">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">SneakerStudio</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are more than just a sneaker store. We are a community of
              enthusiasts, collectors, and trendsetters dedicated to the culture
              of footwear.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeIn}
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">

              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop"
                alt="Sneaker store interior"
                className="w-full h-full object-cover" />

            </motion.div>
            <motion.div
              {...fadeIn}
              transition={{
                delay: 0.2
              }}>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded in 2025 in the heart of Bitola, SneakerStudio began
                  with a simple mission: to bring authentic, high-heat sneakers
                  to the Balkans without the hassle of international shipping
                  and customs.
                </p>
                <p>
                  What started as a small Instagram page has grown into the
                  region's premier destination for streetwear culture. We've
                  built relationships with top suppliers worldwide to ensure
                  every pair we sell is 100% authentic and verified.
                </p>
                <p>
                  Today, we serve thousands of customers across Macedonia and
                  beyond, but our core values remain the same: authenticity,
                  community, and passion for the game.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      {/*
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core principles that guide every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
            {
              icon: <ShieldCheck className="w-10 h-10 text-blue-500" />,
              title: '100% Authenticity',
              desc: 'Every item is rigorously inspected by our expert team. We guarantee authenticity or your money back.'
            },
            {
              icon: <Users className="w-10 h-10 text-blue-500" />,
              title: 'Community First',
              desc: "We support local creators, artists, and athletes. We're building a culture, not just a customer base."
            },
            {
              icon: <Heart className="w-10 h-10 text-blue-500" />,
              title: 'Passion for Quality',
              desc: 'We only stock products we believe in. From limited drops to everyday essentials, quality is paramount.'
            }].
            map((item, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.1
              }}
              className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">

                <div className="mb-6 bg-gray-900 w-16 h-16 rounded-xl flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      */}

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet The Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The sneakerheads behind the scenes making it all happen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            {
              name: 'Erhan D.',
              role: 'Founder & CEO',
              img: '/images/image.jpeg'
            },
            {
              name: 'Sarah M.',
              role: 'Head of Buying',
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
            },
            {
              name: 'Elena T.',
              role: 'Community Manager',
              img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
            }].
            map((member, idx) =>
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: idx * 0.1
              }}
              className="group text-center">

                <div className="relative mb-4 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900 mb-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to find your next pair?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse our curated collection of the latest drops and timeless
            classics.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-blue-700 text-white hover:bg-blue-800 shadow-lg font-bold"
            onClick={() => onNavigate('viewall')}>

            Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>);

}