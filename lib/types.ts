export interface Plant {
  id: number;
  name: string;
  latinName: string;
  type: 'vegetable' | 'fruit' | 'herb' | 'flower';
  family: string;
  description: string;
  sowingSeason: string[];
  plantingSeason: string[];
  harvestSeason: string[];
  sun: 'full' | 'partial' | 'shade';
  water: 'low' | 'moderate' | 'high';
  spacing: number; // in cm
  rowSpacing: number; // in cm
  height: number; // in cm
  color: string;
  growthDays: number;
  germinationDays: number;
  companionPlants: number[];
  avoidPlants: number[];
  notes: string;
}

export interface GardenBed {
  id: string;
  name: string;
  width: number; // in cells
  height: number; // in cells
  cellSize: number; // in cm
  plants: GardenPlant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenPlant {
  id: string;
  plantId: number;
  x: number;
  y: number;
  plantedDate: Date;
  expectedHarvestDate: Date;
  notes: string;
  status: 'planned' | 'planted' | 'growing' | 'harvested';
}

export interface CalendarEvent {
  id: string;
  plantId: number;
  type: 'sowing' | 'planting' | 'harvest' | 'maintenance';
  date: Date;
  title: string;
  description: string;
  completed: boolean;
}

export interface GardenPlan {
  id: string;
  name: string;
  description: string;
  beds: GardenBed[];
  events: CalendarEvent[];
  createdAt: Date;
  updatedAt: Date;
}
