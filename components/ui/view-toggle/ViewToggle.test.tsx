import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import ViewToggle from './ViewToggle';

// Mock lucide-react icons to forward props (so className is applied)
vi.mock('lucide-react', () => ({
  Grid: (props: any) => <svg data-testid='grid-icon' {...props} />,
  List: (props: any) => <svg data-testid='list-icon' {...props} />,
}));

describe('ViewToggle', () => {
  const defaultProps = {
    viewMode: 'grid' as const,
    onViewModeChange: vi.fn(),
  };

  it('renders both buttons with labels and icons', () => {
    render(<ViewToggle {...defaultProps} />);
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByTestId('grid-icon')).toBeInTheDocument();
    expect(screen.getByTestId('list-icon')).toBeInTheDocument();
  });

  it('applies active styles to the active button', () => {
    render(<ViewToggle {...defaultProps} viewMode='grid' />);
    const gridButton = screen.getByText('Grid');
    const listButton = screen.getByText('List');
    expect(gridButton).toHaveClass('bg-white', 'shadow');
    expect(listButton).not.toHaveClass('bg-white', 'shadow');
  });

  it('applies default buttonClassName and activeButtonClassName', () => {
    render(<ViewToggle {...defaultProps} viewMode='grid' />);
    const gridButton = screen.getByText('Grid');
    expect(gridButton).toHaveClass(
      'px-4',
      'py-2',
      'rounded-md',
      'flex',
      'items-center',
      'bg-white',
      'shadow',
    );
    const listButton = screen.getByText('List');
    expect(listButton).toHaveClass('px-4', 'py-2', 'rounded-md', 'flex', 'items-center');
    expect(listButton).not.toHaveClass('bg-white', 'shadow');
  });

  it('calls onViewModeChange with correct mode when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<ViewToggle {...defaultProps} onViewModeChange={handleChange} />);
    const listButton = screen.getByText('List');
    await user.click(listButton);
    expect(handleChange).toHaveBeenCalledWith('list');

    const gridButton = screen.getByText('Grid');
    await user.click(gridButton);
    expect(handleChange).toHaveBeenCalledWith('grid');
  });

  it('sets aria-pressed correctly based on active state', () => {
    render(<ViewToggle {...defaultProps} viewMode='grid' />);
    const gridButton = screen.getByText('Grid');
    const listButton = screen.getByText('List');
    expect(gridButton).toHaveAttribute('aria-pressed', 'true');
    expect(listButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies custom className to container', () => {
    const { container } = render(
      <ViewToggle {...defaultProps} className='custom-container' />,
    );
    // The root element is the first child of the container
    expect(container.firstChild).toHaveClass('custom-container');
  });

  it('applies custom buttonClassName to buttons', () => {
    render(<ViewToggle {...defaultProps} buttonClassName='custom-button' />);
    const gridButton = screen.getByText('Grid');
    expect(gridButton).toHaveClass('custom-button');
  });

  it('applies custom activeButtonClassName to active button', () => {
    render(<ViewToggle {...defaultProps} activeButtonClassName='custom-active' />);
    const gridButton = screen.getByText('Grid');
    expect(gridButton).toHaveClass('custom-active');
  });

  it('applies custom iconClassName to icons', () => {
    render(<ViewToggle {...defaultProps} iconClassName='custom-icon' />);
    const gridIcon = screen.getByTestId('grid-icon');
    const listIcon = screen.getByTestId('list-icon');
    expect(gridIcon).toHaveClass('custom-icon');
    expect(listIcon).toHaveClass('custom-icon');
  });

  it('accepts custom modes', () => {
    const CustomIcon = (props: any) => <svg data-testid='custom-icon' {...props} />;
    const modes = [
      { value: 'grid' as const, label: 'Cards', icon: CustomIcon },
      { value: 'list' as const, label: 'Rows', icon: CustomIcon },
    ];
    render(<ViewToggle {...defaultProps} modes={modes} />);
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Rows')).toBeInTheDocument();
    expect(screen.getAllByTestId('custom-icon')).toHaveLength(2);
  });
});
