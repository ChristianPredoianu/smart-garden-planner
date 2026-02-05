'use client';

import { useState, useMemo } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import PlantCard from '@/components/cards/PlantCard';
import { getAllPlants, getPlantsByType } from '@/lib/plants';
import { Plant } from '@/lib/types';
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlantFilters } from '@/hooks/filters/usePlantFilters';

export default function PlantsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allPlants = getAllPlants();

  const { filteredPlants, plantTypes } = usePlantFilters(
    allPlants,
    searchTerm,
    selectedType,
  );

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-green-800 mb-2'>Plant Database</h1>
        <p className='text-gray-600'>
          Browse and learn about different vegetables, herbs, and flowers
        </p>
      </div>

      {/* Filters and Search */}
      <div className='bg-white p-4 rounded-xl shadow-lg'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search */}
          <div className='flex-1'>
            <SearchInput value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Type Filter */}
          <div className='relative'>
            <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10' />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className='pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
            >
              {plantTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          </div>

          {/* View Toggle */}
          <div className='flex bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md flex items-center ${
                viewMode === 'grid' ? 'bg-white shadow' : ''
              }`}
            >
              <Grid className='h-4 w-4 mr-2' />
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md flex items-center ${
                viewMode === 'list' ? 'bg-white shadow' : ''
              }`}
            >
              <List className='h-4 w-4 mr-2' />
              List
            </button>
          </div>
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
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key='list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='space-y-4'
          >
            {filteredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} compact />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filteredPlants.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <Search className='h-16 w-16 mx-auto' />
          </div>
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>No plants found</h3>
          <p className='text-gray-500'>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
