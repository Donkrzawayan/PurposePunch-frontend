import React from 'react';
import { cn } from '../../utils/cn';

interface Props {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  className?: string;
}

export const PostSection = ({ title, children, isExpanded, className }: Props) => {
  return (
    <>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </h4>
      <div
        className={cn(
          "whitespace-pre-wrap leading-relaxed transition-all",
          !isExpanded && "line-clamp-3",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};
