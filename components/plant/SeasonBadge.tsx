// components/plant/SeasonBadge.tsx
import { CircleDot, Trees, Wheat, LucideIcon } from 'lucide-react';

interface SeasonBadgeProps {
  type: 'sowing' | 'planting' | 'harvest';
  seasons: string[];
  label?: string;
}

export default function SeasonBadge({ type, seasons, label }: SeasonBadgeProps) {
  const config: Record<
    'sowing' | 'planting' | 'harvest',
    {
      icon: LucideIcon;
      bgColor: string;
      textColor: string;
      defaultLabel: string;
    }
  > = {
    sowing: {
      icon: CircleDot,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      defaultLabel: 'Sowing',
    },
    planting: {
      icon: Trees,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      defaultLabel: 'Planting',
    },
    harvest: {
      icon: Wheat,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      defaultLabel: 'Harvest',
    },
  };

  const { icon: Icon, bgColor, textColor, defaultLabel } = config[type];

  return (
    <div className='flex items-center gap-2'>
      <Icon className='h-4 w-4 text-gray-600 flex-shrink-0' />
      <div className='flex flex-wrap gap-1.5'>
        <span className='text-sm font-medium text-gray-700 mr-1'>
          {label || defaultLabel}:
        </span>
        {seasons.map((season) => (
          <span
            key={`${type}-${season}`}
            className={`px-2.5 py-1 ${bgColor} ${textColor} text-xs font-medium rounded-full`}
          >
            {season}
          </span>
        ))}
      </div>
    </div>
  );
}
