import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatCard from './StatCard';
import type { LucideIcon } from 'lucide-react';

// Mock a Lucide icon component
vi.mock('lucide-react', () => ({
  Sun: () => <div data-testid='mock-icon' />,
}));

describe('StatCard', () => {
  const MockIcon = ((props: any) => (
    <div data-testid='mock-icon' {...props} />
  )) as LucideIcon;

  it('renders icon and value', () => {
    render(<StatCard icon={MockIcon} label='Sun' value='full' />);
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByText('Full')).toBeInTheDocument();
  });

  it('capitalizes string values', () => {
    render(<StatCard icon={MockIcon} label='Water' value='regular' />);
    expect(screen.getByText('Regular')).toBeInTheDocument();
  });

  it('does not capitalize numeric values', () => {
    render(<StatCard icon={MockIcon} label='Growth' value={70} />);
    expect(screen.getByText('70')).toBeInTheDocument();
  });

  it('applies default color class (gray) when color prop is omitted', () => {
    render(<StatCard icon={MockIcon} label='Default' value='test' />);
    const icon = screen.getByTestId('mock-icon');
    expect(icon).toHaveClass('text-gray-500');
  });

  const colorCases = [
    { color: 'amber', expectedClass: 'text-amber-500' },
    { color: 'blue', expectedClass: 'text-blue-500' },
    { color: 'green', expectedClass: 'text-green-500' },
    { color: 'gray', expectedClass: 'text-gray-500' },
  ] as const;

  it.each(colorCases)(
    'applies $expectedClass when color="$color"',
    ({ color, expectedClass }) => {
      render(<StatCard icon={MockIcon} label='Test' value='test' color={color as any} />);
      expect(screen.getByTestId('mock-icon')).toHaveClass(expectedClass);
    },
  );
});
