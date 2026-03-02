import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SeasonBadge from './SeasonBadge';

// Mock icons to verify which one is rendered
vi.mock('lucide-react', () => ({
  CircleDot: (props: any) => <div data-testid='icon-sowing' {...props} />,
  Trees: (props: any) => <div data-testid='icon-planting' {...props} />,
  Wheat: (props: any) => <div data-testid='icon-harvest' {...props} />,
}));

describe('SeasonBadge', () => {
  const seasons = ['March', 'April', 'May'];

  // Type‑safe test cases
  const typeCases = [
    {
      type: 'sowing' as const,
      iconTestId: 'icon-sowing',
      defaultLabel: 'Sowing',
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
    },
    {
      type: 'planting' as const,
      iconTestId: 'icon-planting',
      defaultLabel: 'Planting',
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
    },
    {
      type: 'harvest' as const,
      iconTestId: 'icon-harvest',
      defaultLabel: 'Harvest',
      bgClass: 'bg-amber-50',
      textClass: 'text-amber-700',
    },
  ];

  describe.each(typeCases)(
    'for type $type',
    ({ type, iconTestId, defaultLabel, bgClass, textClass }) => {
      it('renders correct icon, label, and season chips', () => {
        render(<SeasonBadge type={type} seasons={seasons} />);

        // Icon is rendered with the correct test ID and receives base classes
        const icon = screen.getByTestId(iconTestId);
        expect(icon).toBeInTheDocument();
        // Optionally check that the icon gets the base styling class
        expect(icon).toHaveClass('h-4', 'w-4', 'text-gray-600');

        // Default label
        expect(screen.getByText(`${defaultLabel}:`)).toBeInTheDocument();

        // Season chips have correct colors
        seasons.forEach((season) => {
          const chip = screen.getByText(season);
          expect(chip).toHaveClass(
            bgClass,
            textClass,
            'px-2.5',
            'py-1',
            'text-xs',
            'font-medium',
            'rounded-full',
          );
        });
      });
    },
  );

  it('uses custom label when provided', () => {
    render(<SeasonBadge type='sowing' seasons={seasons} label='Custom' />);
    expect(screen.getByText('Custom:')).toBeInTheDocument();
    expect(screen.queryByText('Sowing:')).not.toBeInTheDocument();
  });

  it('handles empty seasons array', () => {
    render(<SeasonBadge type='planting' seasons={[]} />);
    expect(screen.getByText('Planting:')).toBeInTheDocument();
    expect(screen.queryByText(/March|April|May/)).not.toBeInTheDocument();
  });
});
