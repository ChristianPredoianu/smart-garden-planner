'use client';

import { useState } from 'react';
import PlantHero from '@/components/plants/PlantHero';
import SearchInput from '@/components/ui/SearchInput';
import SelectWithIcons from '@/components/ui/SelectWithIcons';
import ViewToggle from '@/components/ui/ViewToggle';
import PlantCard from '@/components/cards/PlantCard';
import PlantCollection from '@/components/plants/PlantCollection';
import { getAllPlants } from '@/lib/plants';
import { Filter, Leaf, Sprout } from 'lucide-react';
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

  const plantCards = filteredPlants.map((plant) => (
    <PlantCard key={plant.id} plant={plant} compact={viewMode === 'list'} />
  ));

  return (
    <div className='space-y-6'>
      {/* Hero Section */}
      <PlantHero
        totalPlants={allPlants.length}
        categoryCount={plantTypes.filter((t) => t !== 'all').length}
      />

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
      <PlantCollection plants={filteredPlants} viewMode={viewMode} />
    </div>
  );
}
