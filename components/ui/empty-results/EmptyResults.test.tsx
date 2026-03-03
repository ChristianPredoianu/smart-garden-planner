import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyResults from './EmptyResults';

vi.mock('lucide-react', () => ({
  Search: () => <div data-testid='search-icon' />,
}));

describe('EmptyResults', () => {
  const defaultProps = {
    title: 'No results found',
    description: 'Try adjusting your search or filters',
  };

  it('renders title and description', () => {
    render(<EmptyResults {...defaultProps} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    render(<EmptyResults {...defaultProps} />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('applies custom className to the container', () => {
    render(<EmptyResults {...defaultProps} className='custom-class' />);
    const container = screen.getByText('No results found').closest('div');
    expect(container).toHaveClass('custom-class', 'text-center', 'py-12');
  });

  it('renders with empty strings gracefully', () => {
    render(<EmptyResults title='' description='' />);
    expect(screen.getByRole('heading', { level: 3 })).toBeEmptyDOMElement();
    expect(screen.getByRole('paragraph')).toBeEmptyDOMElement();
  });
});
