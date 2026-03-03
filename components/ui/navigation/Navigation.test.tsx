import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navigation from './Navigation';

// Use vi.hoisted to define the mock function before vi.mock is hoisted
const { mockUsePathname } = vi.hoisted(() => ({
  mockUsePathname: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: mockUsePathname,
}));

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Home: () => <span data-testid='icon-home' />,
  Calendar: () => <span data-testid='icon-calendar' />,
  Sprout: () => <span data-testid='icon-sprout' />,
  Grid3x3: () => <span data-testid='icon-grid' />,
}));

describe('Navigation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the app title', () => {
    render(<Navigation />);
    expect(screen.getByText('Smart Garden Planner')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navigation />);
    const navItems = ['Dashboard', 'Calendar', 'Garden', 'Plants'];
    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders icons for each link', () => {
    render(<Navigation />);

    const navLinks = [
      { label: 'Dashboard', testId: 'icon-home' },
      { label: 'Calendar', testId: 'icon-calendar' },
      { label: 'Garden', testId: 'icon-grid' },
      { label: 'Plants', testId: 'icon-sprout' },
    ];

    navLinks.forEach(({ label, testId }) => {
      const link = screen.getByText(label).closest('a');
      const icon = within(link!).getByTestId(testId);
      expect(icon).toBeInTheDocument();
    });
  });

  it('applies active styles to the current page link', () => {
    mockUsePathname.mockReturnValue('/calendar');
    render(<Navigation />);

    const activeLink = screen.getByText('Calendar').closest('a');
    expect(activeLink).toHaveClass('bg-green-600', 'text-white');

    const inactiveLink = screen.getByText('Dashboard').closest('a');
    expect(inactiveLink).toHaveClass('text-green-100', 'hover:bg-green-600/50');
  });

  it('sets correct href attributes on links', () => {
    render(<Navigation />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/');

    const calendarLink = screen.getByText('Calendar').closest('a');
    expect(calendarLink).toHaveAttribute('href', '/calendar');

    const gardenLink = screen.getByText('Garden').closest('a');
    expect(gardenLink).toHaveAttribute('href', '/garden');

    const plantsLink = screen.getByText('Plants').closest('a');
    expect(plantsLink).toHaveAttribute('href', '/plants');
  });
});
