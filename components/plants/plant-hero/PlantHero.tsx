'use client';

import { motion } from 'framer-motion';
import { Sprout, Leaf } from 'lucide-react';

interface PlantHeroProps {
  totalPlants: number;
  categoryCount: number;
}

export default function PlantHero({ totalPlants, categoryCount }: PlantHeroProps) {
  return (
    <div className='relative overflow-hidden py-8 md:py-12'>
      <div className='relative max-w-4xl mx-auto text-center'>
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className='inline-flex mb-6'
        >
          <div className='relative'>
            <div className='absolute inset-0 bg-green-400/20 rounded-full blur-xl' />
            <div className='relative bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg shadow-green-500/25'>
              <Sprout className='h-8 w-8 text-white' />
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-green-800 via-green-600 to-emerald-600 bg-clip-text text-transparent'
        >
          Plant Database
        </motion.h1>

        {/* Subheading with decorative line */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='relative pb-8'
        >
          <h2 className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Browse and learn about different vegetables, herbs, and flowers
          </h2>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='absolute left-1/2 bottom-0 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 rounded-full'
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='flex flex-wrap items-center justify-center gap-4 mt-10'
        >
          <div className='flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-green-100'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            <span className='text-sm font-medium text-gray-700'>
              {totalPlants} plants available
            </span>
          </div>

          <div className='flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-green-100'>
            <Leaf className='h-4 w-4 text-green-600' />
            <span className='text-sm font-medium text-gray-700'>
              {categoryCount} categories
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
