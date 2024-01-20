interface FeeRateCardProps {
  title: string;
  level?: 'no-priority' | 'low' | 'medium' | 'high';
  feeRateSatVb: number;
}

export default function FeeRateCard({
  title,
  feeRateSatVb,
  level,
}: FeeRateCardProps) {
  let bgClass =
    'from-slate-200 to-slage-400 dark:from-slate-600 dark:to-slage-800';
  let borderClas = 'border-slage-300 dark:border-slage-600';
  switch (level) {
    case 'low':
      bgClass =
        'from-slate-200 to-lime-400 dark:from-slate-600 dark:to-lime-800';
      borderClas = 'border-lime-300 dark:border-lime-600';
      break;
    case 'medium':
      bgClass =
        'from-slate-200 to-amber-400 dark:from-slate-600 dark:to-amber-800';
      borderClas = 'border-amber-300 dark:border-amber-600';
      break;
    case 'high':
      bgClass = 'from-slate-200 to-red-400 dark:from-slate-600 dark:to-red-800';
      borderClas = 'border-red-300 dark:border-red-600';
      break;
  }

  return (
    <div
      className={`flex-1 text-center text-slate-800 rounded border shadow 
          dark:text-slate-200
            p-6 m-3 bg-gradient-to-tr ${bgClass} ${borderClas}`}
    >
      <h4 className="font-bold text-nowrap">{title}</h4>
      <div>{feeRateSatVb} sat/vB</div>
    </div>
  );
}
