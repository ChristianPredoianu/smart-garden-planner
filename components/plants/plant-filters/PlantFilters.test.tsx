import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PlantFilters from '@/components/plants/plant-filters/PlantFilters';

// Mock child components
vi.mock('@/components/ui/SearchInput', () => ({
  default: ({ value, onChange }: any) => (
    <input
      data-testid='search-input'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search'
    />
  ),
}));

vi.mock('@/components/ui/SelectWithIcons', () => ({
  default: ({ value, onChange, options, placeholder }: any) => (
    <select
      data-testid='select-with-icons'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value=''>{placeholder}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
}));

vi.mock('@/components/ui/ViewToggle', () => ({
  default: ({ viewMode, onViewModeChange }: any) => (
    <div data-testid='view-toggle'>
      <button
        data-testid='grid-button'
        onClick={() => onViewModeChange('grid')}
        className={viewMode === 'grid' ? 'active' : ''}
      >
        Grid
      </button>
      <button
        data-testid='list-button'
        onClick={() => onViewModeChange('list')}
        className={viewMode === 'list' ? 'active' : ''}
      >
        List
      </button>
    </div>
  ),
}));

describe('PlantFilters', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    selectedType: 'all',
    onTypeChange: vi.fn(),
    plantTypes: ['all', 'vegetable', 'herb'],
    viewMode: 'grid' as const,
    onViewModeChange: vi.fn(),
  };

  it('renders all child components', () => {
    render(<PlantFilters {...defaultProps} />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('select-with-icons')).toBeInTheDocument();
    expect(screen.getByTestId('grid-button')).toBeInTheDocument();
  });

  it('passes correct searchTerm to SearchInput', () => {
    render(<PlantFilters {...defaultProps} searchTerm='tomato' />);
    const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
    expect(searchInput.value).toBe('tomato');
  });

  it('calls onSearchChange when SearchInput value changes', async () => {
    const user = userEvent.setup();
    render(<PlantFilters {...defaultProps} />);
    const searchInput = screen.getByTestId('search-input');
    await user.type(searchInput, 'b');
    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('b');
  });

  it('passes correct selectedType to SelectWithIcons', () => {
    render(<PlantFilters {...defaultProps} selectedType='vegetable' />);
    const select = screen.getByTestId('select-with-icons') as HTMLSelectElement;
    expect(select.value).toBe('vegetable');
  });

  it('passes plantTypes options to SelectWithIcons', () => {
    render(<PlantFilters {...defaultProps} />);
    const select = screen.getByTestId('select-with-icons');
    const options = within(select).getAllByRole('option');

    expect(options).toHaveLength(4);
    expect(options[0]).toHaveTextContent('Filter by type');
    expect(options[1]).toHaveTextContent('All');
    expect(options[2]).toHaveTextContent('Vegetable');
    expect(options[3]).toHaveTextContent('Herb');
  });

  it('displays the correct placeholder in SelectWithIcons', () => {
    render(<PlantFilters {...defaultProps} />);
    expect(screen.getByText('Filter by type')).toBeInTheDocument();
  });

  it('calls onTypeChange when SelectWithIcons value changes', async () => {
    const user = userEvent.setup();
    render(<PlantFilters {...defaultProps} />);
    const select = screen.getByTestId('select-with-icons');
    await user.selectOptions(select, 'herb');
    expect(defaultProps.onTypeChange).toHaveBeenCalledWith('herb');
  });

  it('passes correct viewMode to ViewToggle', () => {
    const { rerender } = render(<PlantFilters {...defaultProps} viewMode='grid' />);
    let gridButton = screen.getByTestId('grid-button');
    let listButton = screen.getByTestId('list-button');
    expect(gridButton).toHaveClass(
      'px-4 py-2 rounded-md flex items-center bg-white shadow',
    );
    expect(listButton).not.toHaveClass(
      'px-4 py-2 rounded-md flex items-center bg-white shadow',
    );

    rerender(<PlantFilters {...defaultProps} viewMode='list' />);
    gridButton = screen.getByTestId('grid-button');
    listButton = screen.getByTestId('list-button');
    expect(gridButton).not.toHaveClass(
      'px-4 py-2 rounded-md flex items-center bg-white shadow',
    );
    expect(listButton).toHaveClass(
      'px-4 py-2 rounded-md flex items-center bg-white shadow',
    );
  });

  it('calls onViewModeChange when ViewToggle buttons are clicked', async () => {
    const user = userEvent.setup();
    const onViewModeChange = vi.fn();
    render(
      <PlantFilters
        {...defaultProps}
        onViewModeChange={onViewModeChange}
        viewMode='grid'
      />,
    );
    const listButton = screen.getByTestId('list-button');
    await user.click(listButton);
    expect(onViewModeChange).toHaveBeenCalledWith('list');

    const gridButton = screen.getByTestId('grid-button');
    await user.click(gridButton);
    expect(onViewModeChange).toHaveBeenCalledWith('grid');
  });
});
