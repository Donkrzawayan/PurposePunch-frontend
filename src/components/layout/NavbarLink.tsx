import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
}

export const NavbarLink = ({ to, children }: Props) => {
  const baseClasses = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors";
  const activeClasses = "border-blue-500 text-gray-900";
  const inactiveClasses = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  return (
    <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </NavLink>
  );
};
