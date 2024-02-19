import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  className,
  title,
  active,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1 rounded border bg-white hover:bg-slate-100 shadow text-slate-900
        border-slate-300 ${active ? 'border-slate-800' : ''}
        dark:bg-slate-950 hover:dark:bg-slate-900 dark:border-slate-600 dark:shadow-slate-400 dark:text-slate-100
        ${className}`}
    >
      {children}
    </button>
  );
}
