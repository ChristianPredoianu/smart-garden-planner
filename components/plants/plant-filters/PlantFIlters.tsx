'use client';

import SearchInput from '@/components/ui/SearchInput';
import SelectWithIcons from '@/components/ui/SelectWithIcons';
import ViewToggle from '@/components/ui/ViewToggle';
import { Filter } from 'lucide-react';

interface PlantFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  plantTypes: string[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export default function PlantFilters({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  plantTypes,
  viewMode,
  onViewModeChange,
}: PlantFiltersProps) {
  return (
    <div className='bg-white p-4 rounded-xl shadow-lg'>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <SearchInput value={searchTerm} onChange={onSearchChange} />
        </div>
        <SelectWithIcons
          value={selectedType}
          onChange={onTypeChange}
          options={plantTypes}
          placeholder='Filter by type'
          icon={Filter}
        />
        <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>
    </div>
  );
}
