import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('bg-white', 'rounded-xl', 'shadow-lg', 'p-6');
  });

  it('applies custom className', () => {
    render(<Card className='custom-class'>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('custom-class');
    // Still has default classes
    expect(card).toHaveClass('bg-white');
  });

  it('adds hover classes when hover={true}', () => {
    render(<Card hover>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass(
      'transition-transform',
      'hover:scale-[1.02]',
      'cursor-pointer',
    );
  });

  it('does not add hover classes when hover is false or omitted', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).not.toHaveClass(
      'transition-transform',
      'hover:scale-[1.02]',
      'cursor-pointer',
    );
  });
});
