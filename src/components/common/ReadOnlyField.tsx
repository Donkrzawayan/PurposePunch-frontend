import React from 'react';

interface ReadOnlyFieldProps {
  label: string;
  children: React.ReactNode;
  contentClassName?: string;
}

export const ReadOnlyField = ({
  label,
  children,
  contentClassName = 'text-gray-900'
}: ReadOnlyFieldProps) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide opacity-90 mb-1">
        {label}
      </h3>

      <p className={`whitespace-pre-wrap mt-1 ${contentClassName}`}>
        {children}
      </p>
    </div>
  );
};
