import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
      bg-white rounded-xl shadow-lg p-6
      ${hover ? 'transition-transform hover:scale-[1.02] cursor-pointer' : ''}
      ${className}
    `}
    >
      {children}
    </div>
  );
}
