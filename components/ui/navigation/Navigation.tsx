'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Sprout, Grid3x3 } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/garden', label: 'Garden', icon: Grid3x3 },
  { href: '/plants', label: 'Plants', icon: Sprout },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='bg-green-700 text-white shadow-lg'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Sprout className='h-8 w-8 mr-3' />
            <h1 className='text-xl font-bold'>Smart Garden Planner</h1>
          </div>
          <div className='flex space-x-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-green-100 hover:bg-green-600/50'
                  }`}
                >
                  <Icon className='h-5 w-5 mr-2' />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
