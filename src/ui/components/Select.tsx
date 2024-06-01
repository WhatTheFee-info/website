import React from 'react';

interface SelectItem {
  value: string;
  display: string | React.ReactNode;
}

interface SelectProps {
  items: SelectItem[];
  value?: string | readonly string[] | number | undefined;
  onChange?: React.ChangeEventHandler;
}

export default function Select({ items, value, onChange }: SelectProps) {
  return (
    <div className="">
      <select
        id="currency-select"
        onChange={onChange}
        value={value}
        className="p-2 bg-slate-50 dark:bg-slate-400 dark:text-slate-800 rounded-lg border border-slate-300"
      >
        {items.map((item) => (
          <option value={item.value} key={item.value}>
            {item.display}
          </option>
        ))}
      </select>
    </div>
  );
}
