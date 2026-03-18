import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';

interface SelectWithIconProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  selectClassName?: string;
  showChevron?: boolean;
}

export default function SelectWithIcons({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  icon: Icon = Filter,
  className = '',
  selectClassName = '',
  showChevron = true,
}: SelectWithIconProps) {
  return (
    <div className={`relative ${className}`}>
      <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10' />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full ${selectClassName}`}
      >
        {placeholder && (
          <option value='' disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>

      {showChevron && (
        <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
      )}
    </div>
  );
}
