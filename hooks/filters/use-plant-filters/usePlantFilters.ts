import { Plant } from '@/lib/types';

export function usePlantFilters(
  plants: Plant[],
  searchTerm: string,
  selectedType: string,
) {
  function matchesFilters(plant: Plant) {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.latinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || plant.type === selectedType;

    return matchesSearch && matchesType;
  }

  const filteredPlants = plants.filter(matchesFilters);

  const plantTypes = ['all', ...Array.from(new Set(plants.map((p) => p.type)))];

  return { filteredPlants, plantTypes };
}
