import { useMemo } from 'react';
import { Plant } from '@/lib/types';

export function usePlantFilters(
  plants: Plant[],
  searchTerm: string,
  selectedType: string,
) {
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || plant.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [plants, searchTerm, selectedType]);

  const plantTypes = useMemo(
    () => ['all', ...Array.from(new Set(plants.map((p) => p.type)))],
    [plants],
  );

  return { filteredPlants, plantTypes };
}
