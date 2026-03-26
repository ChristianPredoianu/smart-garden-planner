'use client';

import { useState } from 'react';
import PlantHero from '@/components/plants/plant-hero/PlantHero';
import PlantFilters from '@/components/plants/plant-filters/plantFilters';
import PlantCollection from '@/components/plants/plant-collection/PlantCollection';
import { getAllPlants } from '@/lib/plants';
import { usePlantFilters } from '@/hooks/filters/use-plant-filters/usePlantFilters';

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
      <PlantHero
        totalPlants={allPlants.length}
        categoryCount={plantTypes.filter((t) => t !== 'all').length}
      />

      <PlantFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        plantTypes={plantTypes}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className='flex justify-between items-center'>
        <p className='text-gray-600'>
          Showing {filteredPlants.length} of {allPlants.length} plants
        </p>
      </div>

      <PlantCollection plants={filteredPlants} viewMode={viewMode} />
    </div>
  );
}
