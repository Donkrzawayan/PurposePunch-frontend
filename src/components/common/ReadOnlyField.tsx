import React from 'react';
import { cn } from '../../utils/cn';

interface ReadOnlyFieldProps {
  label: string;
  children: React.ReactNode;
  contentClassName?: string;
}

export const ReadOnlyField = ({ label, children, contentClassName = '' }: ReadOnlyFieldProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide opacity-90 mb-1">
        {label}
      </h3>

      <p className={cn("whitespace-pre-wrap mt-1 text-gray-900", contentClassName)}>
        {children}
      </p>
    </div>
  );
};
