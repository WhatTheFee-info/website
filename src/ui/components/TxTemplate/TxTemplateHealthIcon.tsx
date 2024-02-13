import { ReactElement } from 'react';

interface TxTemplateHealthIcon {
  icon?: ReactElement;
  className?: string;
  percent: number;
}

export default function TxTemplateHealthIcon({
  icon,
  className,
  percent,
}: TxTemplateHealthIcon) {
  return (
    <span
      className={`mx-1 rounded-full size-6 leading-6 text-[0.75em] text-center
          ${className} text-slate-50`}
    >
      {icon ? icon : percent * 100}
    </span>
  );
}
