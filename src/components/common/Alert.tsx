import React from 'react';
import { cn } from '../../utils/cn';

interface AlertProps {
  children?: React.ReactNode;
  message?: string | null;
  variant?: 'error' | 'success' | 'info';
  className?: string;
}

export const Alert = ({
  children,
  message,
  variant = 'error',
  className
}: AlertProps) => {
  if (!message && !children) return null;

  const variants = {
    error: "bg-red-50 border-red-400 text-red-600",
    success: "bg-green-100 border-green-400 text-green-700",
    info: "bg-blue-100 border-blue-400 text-blue-700"
  };

  return (
    <div
      className={cn(
        "border px-4 py-3 rounded mb-6 text-sm whitespace-pre-wrap",
        variants[variant],
        className
      )}
    >
      {message || children}
    </div>
  );
};
