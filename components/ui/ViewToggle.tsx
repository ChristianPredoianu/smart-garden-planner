import React from 'react';
import { Grid, List } from 'lucide-react';

type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  modes?: Array<{
    value: ViewMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  iconClassName?: string;
}

export default function ViewToggle({
  viewMode,
  onViewModeChange,
  modes = [
    { value: 'grid', label: 'Grid', icon: Grid },
    { value: 'list', label: 'List', icon: List },
  ],
  className = 'flex bg-gray-100 rounded-lg p-1',
  buttonClassName = 'px-4 py-2 rounded-md flex items-center',
  activeButtonClassName = 'bg-white shadow',
  iconClassName = 'h-4 w-4 mr-2',
}: ViewToggleProps) {
  return (
    <div className={className}>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = viewMode === mode.value;

        return (
          <button
            key={mode.value}
            type='button'
            onClick={() => onViewModeChange(mode.value)}
            className={`${buttonClassName} ${isActive ? activeButtonClassName : ''}`}
            aria-pressed={isActive}
          >
            <Icon className={iconClassName} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
