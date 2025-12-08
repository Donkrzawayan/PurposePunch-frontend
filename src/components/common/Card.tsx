import React from 'react';
import { cn } from '../../utils/cn';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: Props) => {
  return (
    <div
      className={cn(
        "bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
