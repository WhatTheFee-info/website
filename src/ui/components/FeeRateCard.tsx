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
  let bgClass = 'from-slate-200 to-slage-400';
  switch (level) {
    case 'low':
      bgClass = 'from-slate-200 to-lime-400';
      break;
    case 'medium':
      bgClass = 'from-slate-200 to-amber-400';
      break;
    case 'high':
      bgClass = 'from-slate-200 to-red-400';
      break;
  }

  return (
    <div
      className={`flex-1 text-center text-slate-800 rounded border border-slate-300 shadow p-6 m-3 bg-gradient-to-tr ${bgClass}`}
    >
      <h4 className="font-bold text-nowrap">{title}</h4>
      <div>{feeRateSatVb} sat/vB</div>
    </div>
  );
}
