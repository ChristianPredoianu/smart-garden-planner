'use client';

import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import SelectWithIcons from '@/components/ui/SelectWithIcons';
import ViewToggle from '@/components/ui/ViewToggle';
import PlantCard from '@/components/cards/PlantCard';
import EmptyResults from '@/components/ui/EmptyResults';
import { getAllPlants } from '@/lib/plants';
import { Filter, Leaf, Sprout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlantFilters } from '@/hooks/filters/usePlantFilters';

export default function PlantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('grid');

  const allPlants = getAllPlants();

  const { filteredPlants, plantTypes } = usePlantFilters(
    allPlants,
    searchTerm,
    selectedType,
  );

  const plantCards = filteredPlants.map((plant) => (
    <PlantCard key={plant.id} plant={plant} compact={viewMode === 'list'} />
  ));

  return (
    <div className='space-y-6'>
      {/* Hero Section */}
      <div className='relative overflow-hidden py-8 md:py-12'>
        {/* Content */}
        <div className='relative max-w-4xl mx-auto text-center'>
          {/* Icon with animations */}
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

          {/* Main heading with gradient */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-green-800 via-green-600 to-emerald-600 bg-clip-text text-transparent'
          >
            Plant Database
          </motion.h1>

          {/* Subheading with decoration*/}
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

          {/* Stats - Show all plants */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='flex flex-wrap items-center justify-center gap-4 mt-10'
          >
            <div className='flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-green-100'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              <span className='text-sm font-medium text-gray-700'>
                {allPlants.length} plants available
              </span>
            </div>

            <div className='flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-green-100'>
              <Leaf className='h-4 w-4 text-green-600' />
              <span className='text-sm font-medium text-gray-700'>
                {plantTypes.filter((t) => t !== 'all').length} categories
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white p-4 rounded-xl shadow-lg'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1'>
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>
          {/* Type Filter */}
          <SelectWithIcons
            value={selectedType}
            onChange={setSelectedType}
            options={plantTypes}
            placeholder='Filter by type'
            icon={Filter}
          />
          {/* View Toggle */}
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      {/* Results Count */}
      <div className='flex justify-between items-center'>
        <p className='text-gray-600'>
          Showing {filteredPlants.length} of {allPlants.length} plants
        </p>
      </div>

      {/* Plants Grid/List */}
      <AnimatePresence mode='wait'>
        {viewMode === 'grid' ? (
          <motion.div
            key='grid'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          >
            {plantCards}
          </motion.div>
        ) : (
          <motion.div
            key='list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='space-y-4'
          >
            {plantCards}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredPlants.length === 0 && (
        <EmptyResults
          title='No plants found'
          description='Try adjusting your search or filters'
        />
      )}
    </div>
  );
}
