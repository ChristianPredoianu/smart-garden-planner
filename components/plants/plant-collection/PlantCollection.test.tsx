import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PlantCollection from './PlantCollection';
import type { Plant } from '@/lib/types';

// Mock child components
vi.mock('@/components/cards/plant-card/PlantCard', () => ({
  default: ({ plant, compact }: any) => (
    <div data-testid={`plant-card-${plant.id}`} data-compact={compact}>
      {plant.name}
    </div>
  ),
}));

vi.mock('@/components/ui/EmptyResults', () => ({
  default: ({ title, description }: any) => (
    <div data-testid='empty-results'>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

// Mock framer-motion to render children directly (simplifies testing)
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => (
    <div data-testid='animate-presence'>{children}</div>
  ),
}));

describe('PlantCollection', () => {
  const mockPlants: Plant[] = [
    {
      id: 1,
      name: 'Tomato',
      latinName: 'Solanum lycopersicum',
      type: 'fruit',
      family: 'Solanaceae',
      description: 'A tasty fruit',
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
      type: 'herb',
      family: 'Lamiaceae',
      description: 'Aromatic herb',
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
  ];

  describe('when plants array is empty', () => {
    it('renders EmptyResults with correct props', () => {
      render(<PlantCollection plants={[]} viewMode='grid' />);
      const emptyResults = screen.getByTestId('empty-results');
      expect(emptyResults).toBeInTheDocument();
      expect(screen.getByText('No plants found')).toBeInTheDocument();
      expect(
        screen.getByText('Try adjusting your search or filters'),
      ).toBeInTheDocument();
    });
  });

  describe('when plants array has items', () => {
    it('renders the correct number of PlantCard components', () => {
      render(<PlantCollection plants={mockPlants} viewMode='grid' />);
      expect(screen.getByTestId('plant-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('plant-card-2')).toBeInTheDocument();
      expect(screen.queryByTestId('empty-results')).not.toBeInTheDocument();
    });

    it('passes compact={false} to PlantCard when viewMode="grid"', () => {
      render(<PlantCollection plants={mockPlants} viewMode='grid' />);
      const card1 = screen.getByTestId('plant-card-1');
      const card2 = screen.getByTestId('plant-card-2');
      expect(card1).toHaveAttribute('data-compact', 'false');
      expect(card2).toHaveAttribute('data-compact', 'false');
    });

    it('passes compact={true} to PlantCard when viewMode="list"', () => {
      render(<PlantCollection plants={mockPlants} viewMode='list' />);
      const card1 = screen.getByTestId('plant-card-1');
      const card2 = screen.getByTestId('plant-card-2');
      expect(card1).toHaveAttribute('data-compact', 'true');
      expect(card2).toHaveAttribute('data-compact', 'true');
    });

    it('applies grid layout classes when viewMode="grid"', () => {
      render(<PlantCollection plants={mockPlants} viewMode='grid' />);
      const container = screen.getByTestId('animate-presence').firstChild as HTMLElement;
      expect(container).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4',
        'gap-6',
      );
    });

    it('applies list layout classes when viewMode="list"', () => {
      render(<PlantCollection plants={mockPlants} viewMode='list' />);
      const container = screen.getByTestId('animate-presence').firstChild as HTMLElement;
      expect(container).toHaveClass('space-y-4');
    });
  });
});
