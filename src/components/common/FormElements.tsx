import React from 'react';
import { cn } from '../../utils/cn';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FieldLabel = ({ htmlFor, children, required, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm text-gray-700 mb-1 font-medium", className)}
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

interface MessageProps {
  error?: string | null;
  helperText?: string;
  className?: string;
}

export const FieldMessage = ({ error, helperText, className }: MessageProps) => {
  if (error) {
    return (
      <p className={cn("text-xs text-red-600 mt-1 font-medium animate-pulse", className)}>
        {error}
      </p>
    );
  }

  if (helperText) {
    return (
      <p className={cn("text-xs text-gray-500 mt-1", className)}>
        {helperText}
      </p>
    );
  }

  return null;
};
