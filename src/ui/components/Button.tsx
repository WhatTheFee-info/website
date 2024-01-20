import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded border bg-white border-slate-300 shadow text-slate-900
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400 dark:text-slate-100
        ${className}`}
    >
      {children}
    </button>
  );
}
