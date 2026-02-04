import { plants } from '@/data/plants';
import { getPlantById } from '@/lib/plants/plantQueries';
import { Plant } from '@/lib/types';

export function getCompanionPlants(plantId: number): Plant[] {
  const plant = getPlantById(plantId);
  if (!plant) return [];

  return plants.filter((p) => plant.companionPlants.includes(p.id));
}

export function getAvoidPlants(plantId: number): Plant[] {
  const plant = getPlantById(plantId);
  if (!plant) return [];

  return plants.filter((p) => plant.avoidPlants.includes(p.id));
}
