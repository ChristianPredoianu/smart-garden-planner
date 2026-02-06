'use client';

import { Plant } from '@/lib/types';
import {
  Sprout,
  Sun,
  Droplets,
  CalendarDays,
  Leaf,
  Ruler,
  CircleDot,
  Trees,
  Wheat,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PlantCardProps {
  plant: Plant;
  onClick?: (plant: Plant) => void;
  compact?: boolean;
}

export default function PlantCard({ plant, onClick, compact = false }: PlantCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(plant);
    }
  };

  if (compact) {
    return (
      <motion.button
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className='group w-full bg-white rounded-xl p-4 text-left transition-all duration-200 hover:bg-gray-50 hover:shadow-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
      >
        <div className='flex items-center gap-3'>
          <div
            className='w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110'
            style={{
              backgroundColor: plant.color,
              boxShadow: `0 4px 12px ${plant.color}40`,
            }}
          >
            <Sprout className='h-5 w-5 text-white' />
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='font-semibold text-gray-900 truncate'>{plant.name}</h4>
            <p className='text-xs text-gray-500 truncate'>{plant.latinName}</p>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className='group bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-full'
    >
      {/* Header with gradient */}
      <div
        className='h-2 w-full flex-shrink-0'
        style={{
          background: `linear-gradient(90deg, ${plant.color} 0%, ${plant.color}80 100%)`,
        }}
      />

      <div className='p-6 flex-grow flex flex-col'>
        {/* Title section */}
        <div className='flex items-start justify-between mb-6'>
          <div className='flex-1 min-w-0'>
            <h3 className='text-2xl font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors'>
              {plant.name}
            </h3>
            <p className='text-sm text-gray-500 font-mono'>{plant.latinName}</p>
          </div>
          <div
            className='w-14 h-14 rounded-xl flex items-center justify-center ml-4 transition-transform group-hover:scale-110'
            style={{
              backgroundColor: plant.color,
              boxShadow: `0 8px 20px ${plant.color}40`,
            }}
          >
            <Sprout className='h-7 w-7 text-white' />
          </div>
        </div>

        {/* Description */}
        <p className='text-gray-600 mb-6 leading-relaxed line-clamp-2 flex-grow-0'>
          {plant.description}
        </p>

        {/* Quick stats */}
        <div className='grid grid-cols-3 gap-4 mb-6 flex-grow-0'>
          <div className='bg-gray-50 rounded-lg p-3 text-center group-hover:bg-gray-100 transition-colors'>
            <Sun className='h-5 w-5 text-amber-500 mx-auto mb-2' />
            <span className='text-sm font-medium capitalize text-gray-700'>
              {plant.sun}
            </span>
          </div>
          <div className='bg-gray-50 rounded-lg p-3 text-center group-hover:bg-gray-100 transition-colors'>
            <Droplets className='h-5 w-5 text-blue-500 mx-auto mb-2' />
            <span className='text-sm font-medium capitalize text-gray-700'>
              {plant.water}
            </span>
          </div>
          <div className='bg-gray-50 rounded-lg p-3 text-center group-hover:bg-gray-100 transition-colors'>
            <Leaf className='h-5 w-5 text-green-500 mx-auto mb-2' />
            <span className='text-sm font-medium text-gray-700'>
              {plant.growthDays} days
            </span>
          </div>
        </div>

        {/* Seasons */}
        <div className='space-y-3 mb-6 flex-grow-0'>
          <div className='flex items-center'>
            <CircleDot className='h-4 w-4 text-green-600 mr-2 flex-shrink-0' />
            <div className='flex flex-wrap gap-1.5'>
              {plant.sowingSeason.map((season) => (
                <span
                  key={`sow-${season}`}
                  className='px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full'
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <Trees className='h-4 w-4 text-blue-600 mr-2 flex-shrink-0' />
            <div className='flex flex-wrap gap-1.5'>
              {plant.plantingSeason.map((season) => (
                <span
                  key={`plant-${season}`}
                  className='px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full'
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <Wheat className='h-4 w-4 text-amber-600 mr-2 flex-shrink-0' />
            <div className='flex flex-wrap gap-1.5'>
              {plant.harvestSeason.map((season) => (
                <span
                  key={`harvest-${season}`}
                  className='px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full'
                >
                  {season}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider - This will push to bottom */}
        <div className='mt-auto pt-4 border-t border-gray-100'>
          <div className='flex items-center justify-between text-sm text-gray-500'>
            <div className='flex items-center'>
              <Ruler className='h-4 w-4 mr-1.5' />
              <span>{plant.height}cm</span>
            </div>
            <div className='text-gray-400'>•</div>
            <span>Spacing: {plant.spacing}cm</span>
            <div className='text-gray-400'>•</div>
            <span>{plant.growthDays} days</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
