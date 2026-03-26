import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePlantFilters } from './usePlantFilters';
import { Plant } from '@/lib/types';

// Mock plant data (complete enough for the hook)
const mockPlants: Plant[] = [
  {
    id: 1,
    name: 'Tomato',
    latinName: 'Solanum lycopersicum',
    description: 'A delicious fruit',
    type: 'vegetable',
    family: 'Solanaceae',
    sowingSeason: ['March'],
    plantingSeason: ['May'],
    harvestSeason: ['August'],
    sun: 'full',
    water: 'moderate',
    spacing: 40,
    rowSpacing: 60,
    height: 100,
    color: '#FF0000',
    growthDays: 70,
    germinationDays: 7,
    companionPlants: [],
    avoidPlants: [],
    notes: '',
  },
  {
    id: 2,
    name: 'Basil',
    latinName: 'Ocimum basilicum',
    description: 'Aromatic herb',
    type: 'herb',
    family: 'Lamiaceae',
    sowingSeason: ['April'],
    plantingSeason: ['June'],
    harvestSeason: ['July'],
    sun: 'full',
    water: 'moderate',
    spacing: 20,
    rowSpacing: 30,
    height: 30,
    color: '#00FF00',
    growthDays: 60,
    germinationDays: 5,
    companionPlants: [],
    avoidPlants: [],
    notes: '',
  },
  {
    id: 3,
    name: 'Rose',
    latinName: 'Rosa spp',
    description: 'Beautiful flower',
    type: 'flower',
    family: 'Rosaceae',
    sowingSeason: ['February'],
    plantingSeason: ['April'],
    harvestSeason: ['June'],
    sun: 'full',
    water: 'moderate',
    spacing: 50,
    rowSpacing: 60,
    height: 120,
    color: '#FF69B4',
    growthDays: 90,
    germinationDays: 14,
    companionPlants: [],
    avoidPlants: [],
    notes: '',
  },
];

describe('usePlantFilters', () => {
  it('returns all plants when searchTerm empty and selectedType "all"', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, '', 'all'));
    expect(result.current.filteredPlants).toEqual(mockPlants);
  });

  it('filters plants by name (case insensitive)', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, 'tom', 'all'));
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Tomato');
  });

  it('filters plants by latinName', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, 'ocimum', 'all'));
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Basil');
  });

  it('filters plants by description', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, 'aromatic', 'all'));
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Basil');
  });

  it('filters plants by type', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, '', 'vegetable'));
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Tomato');
  });

  it('combines search and type filters', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, 'rose', 'flower'));
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Rose');
  });

  it('returns empty array when no matches', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, 'xyz', 'vegetable'));
    expect(result.current.filteredPlants).toHaveLength(0);
  });

  it('returns plantTypes including "all" and unique types', () => {
    const { result } = renderHook(() => usePlantFilters(mockPlants, '', 'all'));
    expect(result.current.plantTypes).toEqual(['all', 'vegetable', 'herb', 'flower']);
  });

  it('updates filteredPlants when searchTerm changes', () => {
    const { result, rerender } = renderHook(
      ({ searchTerm }) => usePlantFilters(mockPlants, searchTerm, 'all'),
      { initialProps: { searchTerm: '' } },
    );
    expect(result.current.filteredPlants).toHaveLength(3);

    rerender({ searchTerm: 'basil' });
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Basil');
  });

  it('updates filteredPlants when selectedType changes', () => {
    const { result, rerender } = renderHook(
      ({ selectedType }) => usePlantFilters(mockPlants, '', selectedType),
      { initialProps: { selectedType: 'all' } },
    );
    expect(result.current.filteredPlants).toHaveLength(3);

    rerender({ selectedType: 'herb' });
    expect(result.current.filteredPlants).toHaveLength(1);
    expect(result.current.filteredPlants[0].name).toBe('Basil');
  });

  it('updates plantTypes when plants change', () => {
    const { result, rerender } = renderHook(
      ({ plants }) => usePlantFilters(plants, '', 'all'),
      { initialProps: { plants: mockPlants } },
    );
    expect(result.current.plantTypes).toEqual(['all', 'vegetable', 'herb', 'flower']);

    const newPlants = [mockPlants[0]]; // only tomato
    rerender({ plants: newPlants });
    expect(result.current.plantTypes).toEqual(['all', 'vegetable']);
  });
});
