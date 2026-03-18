import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SelectWithIcons from './SelectWithIcons';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Filter: () => <svg data-testid='default-icon' />,
  ChevronDown: () => <svg data-testid='chevron-icon' />,
}));

describe('SelectWithIcons', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    options: ['apple', 'banana', 'cherry'],
  };

  it('renders select element with options', () => {
    render(<SelectWithIcons {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    // placeholder + 3 options
    expect(options).toHaveLength(4);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SelectWithIcons {...defaultProps} value='banana' />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('banana');
  });

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SelectWithIcons {...defaultProps} onChange={handleChange} />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'banana');
    expect(handleChange).toHaveBeenCalledWith('banana');
  });

  it('renders the default Filter icon', () => {
    render(<SelectWithIcons {...defaultProps} />);
    expect(screen.getByTestId('default-icon')).toBeInTheDocument();
  });

  it('renders a custom icon when provided', () => {
    const CustomIcon = () => <svg data-testid='custom-icon' />;
    render(<SelectWithIcons {...defaultProps} icon={CustomIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('default-icon')).not.toBeInTheDocument();
  });

  it('renders chevron by default', () => {
    render(<SelectWithIcons {...defaultProps} />);
    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('hides chevron when showChevron={false}', () => {
    render(<SelectWithIcons {...defaultProps} showChevron={false} />);
    expect(screen.queryByTestId('chevron-icon')).not.toBeInTheDocument();
  });

  it('applies custom className to container', () => {
    render(<SelectWithIcons {...defaultProps} className='custom-container' />);
    const container = screen.getByRole('combobox').parentElement;
    expect(container).toHaveClass('custom-container');
  });

  it('applies custom selectClassName to select element', () => {
    render(<SelectWithIcons {...defaultProps} selectClassName='custom-select' />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-select');
  });

  it('disables placeholder option (value empty)', () => {
    render(<SelectWithIcons {...defaultProps} />);
    const placeholderOption = screen.getByText('Select an option') as HTMLOptionElement;
    expect(placeholderOption.disabled).toBe(true);
    expect(placeholderOption.value).toBe('');
  });

  it('capitalizes option labels', () => {
    render(<SelectWithIcons {...defaultProps} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });
});
