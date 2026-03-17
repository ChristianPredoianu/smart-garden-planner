import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchInput from './SearchInput';

// Mock lucide-react to avoid rendering the actual icon
vi.mock('lucide-react', () => ({
  Search: () => <svg data-testid='search-icon' />,
}));

describe('SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  it('renders input with search icon', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SearchInput {...defaultProps} value='tomato' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('tomato');
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchInput {...defaultProps} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'basil');
    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenCalledWith('b');
    expect(handleChange).toHaveBeenCalledWith('a');
    expect(handleChange).toHaveBeenCalledWith('s');
    expect(handleChange).toHaveBeenCalledWith('i');
    expect(handleChange).toHaveBeenCalledWith('l');
  });

  it('uses default placeholder when not provided', () => {
    render(<SearchInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute(
      'placeholder',
      'Search plants by name or description...',
    );
  });

  it('uses custom placeholder when provided', () => {
    render(<SearchInput {...defaultProps} placeholder='Find plants...' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Find plants...');
  });
});
