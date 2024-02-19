import React from 'react';

interface CardProps extends React.PropsWithChildren {
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded border bg-white border-slate-300 shadow
      dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
      p-4
        ${className}`}
    >
      {children}
    </div>
  );
}
