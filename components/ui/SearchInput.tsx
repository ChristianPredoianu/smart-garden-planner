'use client';

import { Search as SearchIcon } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search plants by name or description...',
}: SearchInputProps) {
  return (
    <div className='relative w-full'>
      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-green-500
                   focus:border-green-500 transition'
      />
    </div>
  );
}
