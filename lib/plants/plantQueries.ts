import { plants } from '@/data/plants';
import { Plant } from '@/lib/types';

export function getAllPlants(): Plant[] {
  return plants;
}

export function getPlantById(id: number): Plant | undefined {
  return plants.find((plant) => plant.id === id);
}

export function getPlantsByType(type: Plant['type']): Plant[] {
  return plants.filter((plant) => plant.type === type);
}

export function getPlantsBySeason(month: string): Plant[] {
  return plants.filter(
    (plant) =>
      plant.sowingSeason.includes(month) ||
      plant.plantingSeason.includes(month) ||
      plant.harvestSeason.includes(month),
  );
}
