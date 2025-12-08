import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', ...props }: Props) => {
  const baseClasses = "p-6 rounded-lg border transition-all";
  const defaultColor = className.includes('bg-') ? '' : 'bg-white border-gray-200 shadow-sm';

  return (
    <div className={`${baseClasses} ${defaultColor} ${className}`} {...props}>
      {children}
    </div>
  );
};
