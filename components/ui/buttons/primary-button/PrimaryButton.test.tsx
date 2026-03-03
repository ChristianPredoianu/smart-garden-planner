import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PrimaryButton from './PrimaryButton';

// Mock framer-motion to render a regular button and capture whileTap prop
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, whileTap, ...props }: any) => (
      <button {...props} data-whiletap={JSON.stringify(whileTap)}>
        {children}
      </button>
    ),
  },
}));

describe('PrimaryButton', () => {
  const defaultProps = {
    children: 'Click me',
  };

  it('renders children correctly', () => {
    render(<PrimaryButton {...defaultProps} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant (primary) and size (md) classes', () => {
    render(<PrimaryButton {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-lg',
      'font-medium',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:ring-green-500',
      'bg-green-600',
      'text-white',
      'hover:bg-green-700',
      'disabled:bg-green-300',
      'px-4',
      'py-2',
      'text-base',
    );
  });

  describe('variants', () => {
    const variantCases = [
      {
        variant: 'primary',
        expectedClass: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300',
      },
      {
        variant: 'secondary',
        expectedClass: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
      },
      {
        variant: 'outline',
        expectedClass:
          'border-2 border-green-600 text-green-600 hover:bg-green-50 disabled:border-green-300 disabled:text-green-300',
      },
      {
        variant: 'ghost',
        expectedClass: 'text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
      },
    ];

    it.each(variantCases)(
      'applies $variant variant classes',
      ({ variant, expectedClass }) => {
        render(<PrimaryButton {...defaultProps} variant={variant as any} />);
        const button = screen.getByRole('button');
        expectedClass.split(' ').forEach((cls) => {
          expect(button).toHaveClass(cls);
        });
      },
    );
  });

  describe('sizes', () => {
    const sizeCases = [
      { size: 'sm', expectedClass: 'px-3 py-1.5 text-sm' },
      { size: 'md', expectedClass: 'px-4 py-2 text-base' },
      { size: 'lg', expectedClass: 'px-6 py-3 text-lg' },
    ];

    it.each(sizeCases)('applies $size size classes', ({ size, expectedClass }) => {
      render(<PrimaryButton {...defaultProps} size={size as any} />);
      const button = screen.getByRole('button');
      expectedClass.split(' ').forEach((cls) => {
        expect(button).toHaveClass(cls);
      });
    });
  });

  it('applies fullWidth class when fullWidth=true', () => {
    render(<PrimaryButton {...defaultProps} fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('applies custom className', () => {
    render(<PrimaryButton {...defaultProps} className='custom-class' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is true', () => {
    render(<PrimaryButton {...defaultProps} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });

  describe('loading state', () => {
    it('shows loading spinner and text when loading=true', () => {
      render(<PrimaryButton {...defaultProps} loading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveClass('cursor-not-allowed');
      expect(document.querySelector('svg.animate-spin')).toBeInTheDocument();
    });

    it('does not show children when loading', () => {
      render(<PrimaryButton {...defaultProps} loading />);
      expect(screen.queryByText('Click me')).not.toBeInTheDocument();
    });

    it('disables button when loading (even if disabled not passed)', () => {
      render(<PrimaryButton {...defaultProps} loading />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('click handling', () => {
    it('calls onClick when not disabled or loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PrimaryButton {...defaultProps} onClick={handleClick} />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PrimaryButton {...defaultProps} onClick={handleClick} disabled />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<PrimaryButton {...defaultProps} onClick={handleClick} loading />);
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  it('passes additional props to button element', () => {
    render(
      <PrimaryButton
        {...defaultProps}
        type='submit'
        aria-label='Submit'
        data-testid='custom-button'
      />,
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('aria-label', 'Submit');
  });

  it('sets whileTap scale based on disabled/loading state', () => {
    const { rerender } = render(<PrimaryButton {...defaultProps} />);
    let button = screen.getByRole('button');
    let whileTap = JSON.parse(button.getAttribute('data-whiletap') || '{}');
    expect(whileTap).toEqual({ scale: 0.98 });

    rerender(<PrimaryButton {...defaultProps} disabled />);
    button = screen.getByRole('button');
    whileTap = JSON.parse(button.getAttribute('data-whiletap') || '{}');
    expect(whileTap).toEqual({ scale: 1 });

    rerender(<PrimaryButton {...defaultProps} loading />);
    button = screen.getByRole('button');
    whileTap = JSON.parse(button.getAttribute('data-whiletap') || '{}');
    expect(whileTap).toEqual({ scale: 1 });
  });
});
