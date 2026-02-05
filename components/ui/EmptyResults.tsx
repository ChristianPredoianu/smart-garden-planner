import { Search } from 'lucide-react';

interface EmptyResultsProps {
  title: string;
  description: string;
  className?: string;
}

export default function EmptyResults({
  title,
  description,
  className = '',
}: EmptyResultsProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className='text-gray-400 mb-4'>
        <Search className='h-16 w-16 mx-auto' />
      </div>
      <h3 className='text-xl font-semibold text-gray-600 mb-2'>{title}</h3>
      <p className='text-gray-500'>{description}</p>
    </div>
  );
}
