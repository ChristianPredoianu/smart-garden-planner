'use client';

import { Plant } from '@/lib/types';
import { Sprout, Sun, Droplets, Calendar, Info } from 'lucide-react';
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
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className='bg-white rounded-lg shadow p-3 cursor-pointer border border-green-100 hover:border-green-300 transition-colors'
      >
        <div className='flex items-center'>
          <div
            className='w-8 h-8 rounded-full mr-3 flex items-center justify-center'
            style={{ backgroundColor: plant.color }}
          >
            <Sprout className='h-4 w-4 text-white' />
          </div>
          <div>
            <h4 className='font-semibold text-gray-800'>{plant.name}</h4>
            <p className='text-xs text-gray-500'>{plant.latinName}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleClick}
      className='bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer border border-green-100 hover:border-green-400 transition-all'
    >
      <div className='p-5'>
        <div className='flex justify-between items-start mb-4'>
          <div>
            <h3 className='text-xl font-bold text-gray-800'>{plant.name}</h3>
            <p className='text-sm text-gray-500 italic'>{plant.latinName}</p>
          </div>
          <div
            className='w-12 h-12 rounded-full flex items-center justify-center'
            style={{ backgroundColor: plant.color }}
          >
            <Sprout className='h-6 w-6 text-white' />
          </div>
        </div>

        <p className='text-gray-600 mb-4'>{plant.description}</p>

        <div className='grid grid-cols-2 gap-3 mb-4'>
          <div className='flex items-center'>
            <Sun className='h-4 w-4 text-yellow-500 mr-2' />
            <span className='text-sm capitalize'>{plant.sun} sun</span>
          </div>
          <div className='flex items-center'>
            <Droplets className='h-4 w-4 text-blue-500 mr-2' />
            <span className='text-sm capitalize'>{plant.water} water</span>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center text-sm'>
            <Calendar className='h-4 w-4 text-green-600 mr-2' />
            <span>Sow: {plant.sowingSeason.join(', ')}</span>
          </div>
          <div className='flex items-center text-sm'>
            <Calendar className='h-4 w-4 text-blue-600 mr-2' />
            <span>Plant: {plant.plantingSeason.join(', ')}</span>
          </div>
          <div className='flex items-center text-sm'>
            <Calendar className='h-4 w-4 text-orange-600 mr-2' />
            <span>Harvest: {plant.harvestSeason.join(', ')}</span>
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-gray-100'>
          <div className='flex justify-between text-sm text-gray-500'>
            <span>Spacing: {plant.spacing}cm</span>
            <span>Height: {plant.height}cm</span>
            <span>{plant.growthDays} days</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
