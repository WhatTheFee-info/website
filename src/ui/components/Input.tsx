import React, { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  isInvalid?: boolean;
  name?: string;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | readonly string[] | number | undefined;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export default function Input({
  isInvalid,
  name,
  value,
  className,
  onChange,
  onClick,
}: InputProps) {
  return (
    <input
      className={`flex-initial rounded
            bg-slate-200 border border-slate-700
            text-slate-900 p-1
          ${isInvalid ? 'border-red-700 bg-red-200' : ''}
          ${className}`}
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      onClick={onClick}
    />
  );
}
