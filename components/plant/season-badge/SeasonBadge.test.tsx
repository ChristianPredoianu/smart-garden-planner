import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SeasonBadge from './SeasonBadge';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  CircleDot: () => <div data-testid='icon-sowing' />,
  Trees: () => <div data-testid='icon-planting' />,
  Wheat: () => <div data-testid='icon-harvest' />,
}));

describe('SeasonBadge', () => {
  const seasons = ['March', 'April', 'May'];

  describe('renders based on type', () => {
    it.each([
      {
        type: 'sowing',
        iconTestId: 'icon-sowing',
        defaultLabel: 'Sowing',
        bgClass: 'bg-green-50',
        textClass: 'text-green-700',
      },
      {
        type: 'planting',
        iconTestId: 'icon-planting',
        defaultLabel: 'Planting',
        bgClass: 'bg-blue-50',
        textClass: 'text-blue-700',
      },
      {
        type: 'harvest',
        iconTestId: 'icon-harvest',
        defaultLabel: 'Harvest',
        bgClass: 'bg-amber-50',
        textClass: 'text-amber-700',
      },
    ])('for type $type', ({ type, iconTestId, defaultLabel, bgClass, textClass }) => {
      render(<SeasonBadge type={type as any} seasons={seasons} />);

      // Check icon
      expect(screen.getByTestId(iconTestId)).toBeInTheDocument();

      // Check default label
      expect(screen.getByText(`${defaultLabel}:`)).toBeInTheDocument();

      // Check season chips
      seasons.forEach((season) => {
        const chip = screen.getByText(season);
        expect(chip).toBeInTheDocument();
        expect(chip).toHaveClass(bgClass, textClass);
      });
    });
  });

  it('uses custom label when provided', () => {
    render(<SeasonBadge type='sowing' seasons={seasons} label='Custom' />);
    expect(screen.getByText('Custom:')).toBeInTheDocument();
    expect(screen.queryByText('Sowing:')).not.toBeInTheDocument();
  });

  it('handles empty seasons array', () => {
    render(<SeasonBadge type='planting' seasons={[]} />);
    expect(screen.getByText('Planting:')).toBeInTheDocument();
    // No season chips should be rendered
    const chips = screen.queryAllByRole('generic'); // but we can check that no span with season text exists
    expect(screen.queryByText(/March|April|May/)).not.toBeInTheDocument();
  });

  it('applies the correct classes to the container and chips', () => {
    render(<SeasonBadge type='harvest' seasons={['September']} />);
    const chip = screen.getByText('September');
    expect(chip).toHaveClass(
      'bg-amber-50',
      'text-amber-700',
      'px-2.5',
      'py-1',
      'text-xs',
      'font-medium',
      'rounded-full',
    );
  });
});
