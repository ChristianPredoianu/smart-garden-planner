import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PlantHero from './PlantHero';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Sprout: () => <div data-testid='icon-sprout' />,
  Leaf: () => <div data-testid='icon-leaf' />,
}));

// Mock framer-motion to render regular divs (simplify testing)
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
}));

describe('PlantHero', () => {
  const defaultProps = {
    totalPlants: 42,
    categoryCount: 5,
  };

  it('renders without crashing', () => {
    render(<PlantHero {...defaultProps} />);
    expect(screen.getByText('Plant Database')).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<PlantHero {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Plant Database');
    expect(heading).toHaveClass(
      'bg-gradient-to-r',
      'from-green-800',
      'via-green-600',
      'to-emerald-600',
      'bg-clip-text',
      'text-transparent',
    );
  });

  it('displays the subheading', () => {
    render(<PlantHero {...defaultProps} />);
    const subheading = screen.getByRole('heading', { level: 2 });
    expect(subheading).toHaveTextContent(
      'Browse and learn about different vegetables, herbs, and flowers',
    );
  });

  it('renders the animated icon container', () => {
    render(<PlantHero {...defaultProps} />);
    const icon = screen.getByTestId('icon-sprout');
    expect(icon).toBeInTheDocument();
    // Check that the icon is wrapped in the expected structure
    const iconWrapper = icon.closest('.bg-gradient-to-br');
    expect(iconWrapper).toBeInTheDocument();
  });

  describe('Stats Display', () => {
    it('displays total plants stat correctly', () => {
      render(<PlantHero {...defaultProps} />);
      expect(screen.getByText('42 plants available')).toBeInTheDocument();
    });

    it('displays category count stat correctly', () => {
      render(<PlantHero {...defaultProps} />);
      expect(screen.getByText('5 categories')).toBeInTheDocument();
    });

    it('renders the leaf icon in the category stat', () => {
      render(<PlantHero {...defaultProps} />);
      expect(screen.getByTestId('icon-leaf')).toBeInTheDocument();
    });
  });

  it('renders the decorative line', () => {
    render(<PlantHero {...defaultProps} />);
    // The decorative line is a div with gradient classes; we can check for its existence by className
    expect(screen.getByTestId('decorative-line')).toBeInTheDocument();
  });

  it('handles zero values gracefully', () => {
    render(<PlantHero totalPlants={0} categoryCount={0} />);
    expect(screen.getByText('0 plants available')).toBeInTheDocument();
    expect(screen.getByText('0 categories')).toBeInTheDocument();
  });
});
