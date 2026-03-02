import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PlantCard from './PlantCard';
import type { Plant } from '@/lib/types';

// Mock child components
vi.mock('@/components/cards/stat-card/StatCard', () => ({
  default: ({ icon: Icon, label, value, color }: any) => (
    <div data-testid={`stat-${label}`} data-color={color}>
      {label}: {value}
    </div>
  ),
}));

vi.mock('@/components/plant/season-badge/SeasonBadge', () => ({
  default: ({ type, seasons }: any) => (
    <div data-testid={`season-${type}`}>
      {type}: {seasons.join(', ')}
    </div>
  ),
}));

// Mock lucide icons
vi.mock('lucide-react', () => ({
  Sprout: () => <div data-testid='sprout-icon' />,
  Sun: () => <div data-testid='sun-icon' />,
  Droplets: () => <div data-testid='droplets-icon' />,
  Leaf: () => <div data-testid='leaf-icon' />,
  Ruler: () => <div data-testid='ruler-icon' />,
}));

// Sample plant data (matching your actual plant structure)
const mockPlant: Plant = {
  id: 1,
  name: 'Tomato',
  latinName: 'Solanum lycopersicum',
  type: 'fruit',
  family: 'Solanaceae',
  description:
    'Popular fruit vegetable that requires warm temperatures and plenty of sun.',
  sowingSeason: ['March', 'April'],
  plantingSeason: ['May'],
  harvestSeason: ['July', 'August', 'September'],
  sun: 'full',
  water: 'moderate',
  spacing: 40,
  rowSpacing: 60,
  height: 100,
  color: '#FF0000',
  growthDays: 70,
  germinationDays: 7,
  companionPlants: [2, 3, 4],
  avoidPlants: [5, 6],
  notes: 'Needs support/staking. Regular watering but avoid wetting leaves.',
};

const seasonCases = [
  { type: 'sowing', expected: 'March, April' },
  { type: 'planting', expected: 'May' },
  { type: 'harvest', expected: 'July, August, September' },
];

describe('PlantCard', () => {
  describe('compact mode', () => {
    it('renders compact version with plant name and latin name', () => {
      render(<PlantCard plant={mockPlant} compact />);
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Solanum lycopersicum')).toBeInTheDocument();
    });

    it('calls onClick when clicked in compact mode', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PlantCard plant={mockPlant} compact onClick={handleClick} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockPlant);
    });
  });

  describe('full mode (default)', () => {
    it('renders all plant details', () => {
      render(<PlantCard plant={mockPlant} />);

      // Header
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Solanum lycopersicum')).toBeInTheDocument();

      // Description
      expect(screen.getByText(mockPlant.description)).toBeInTheDocument();

      // Stats (using mocked StatCard)
      expect(screen.getByTestId('stat-Sun')).toHaveTextContent('full');
      expect(screen.getByTestId('stat-Water')).toHaveTextContent('moderate');
      expect(screen.getByTestId('stat-Harvest')).toHaveTextContent('70 days');

      // Footer info
      expect(screen.getByText('100cm')).toBeInTheDocument();
      expect(screen.getByText('Spacing: 40cm')).toBeInTheDocument();
      expect(screen.getByText('70 days')).toBeInTheDocument(); // growth days in footer
    });

    // Seasons (using mocked SeasonBadge)
    it.each(seasonCases)('displays $type season correctly', ({ type, expected }) => {
      render(<PlantCard plant={mockPlant} />);
      expect(screen.getByTestId(`season-${type}`)).toHaveTextContent(expected);
    });

    it('calls onClick when clicked in full mode', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PlantCard plant={mockPlant} onClick={handleClick} />);
      const article = screen.getByRole('article');
      await user.click(article);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockPlant);
    });

    it('applies the plant color to the header and icon background', () => {
      render(<PlantCard plant={mockPlant} />);

      // Check header gradient line
      const headerDiv = screen.getByTestId('plant-card-header');
      expect(headerDiv).toHaveStyle(
        `background: linear-gradient(90deg, ${mockPlant.color} 0%, ${mockPlant.color}80 100%)`,
      );

      // Check icon container background
      const iconDiv = screen.getByTestId('plant-card-icon');
      expect(iconDiv).toHaveStyle(`background-color: ${mockPlant.color}`);
    });
  });
});
