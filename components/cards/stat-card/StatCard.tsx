import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: 'amber' | 'blue' | 'green' | 'gray';
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  color = 'gray',
}: StatCardProps) {
  const colorClasses = {
    amber: 'text-amber-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    gray: 'text-gray-500',
  };

  return (
    <div className='bg-gray-50 rounded-lg p-3 text-center group-hover:bg-gray-100 transition-colors'>
      <Icon className={`h-5 w-5 mx-auto mb-2 ${colorClasses[color]}`} />
      <span className='text-sm font-medium text-gray-700'>
        {typeof value === 'string'
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value}
      </span>
    </div>
  );
}
