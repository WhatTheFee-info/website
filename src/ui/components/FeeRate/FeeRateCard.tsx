import { CheckCircle, CheckCircleSolid } from 'iconoir-react';
import { useAppContext } from '../../../context/AppContext';
import { IAppState } from '../../../context/state';
import { ActionType } from '../../../context/reducer';

interface FeeRateCardProps {
  title: string;
  level?: 'no-priority' | 'low' | 'medium' | 'high' | 'custom';
  feeRateCode: IAppState['selectedFeeRate'];
}

export default function FeeRateCard({
  title,
  feeRateCode,
  level,
}: FeeRateCardProps) {
  const {
    state: { feeStats, selectedFeeRate },
    dispatch,
  } = useAppContext();

  function handleCardClick() {
    dispatch({
      type: ActionType.SET_SELECTED_FEERATE,
      selectedFeeRate: feeRateCode,
    });
  }

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
    case 'custom':
      bgClass =
        'from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800';
      borderClas = 'border-slate-300 dark:border-slate-600';
      break;
  }

  return (
    <div
      className={`group flex-1 text-center text-slate-800 rounded border shadow relative
          dark:text-slate-200
          cursor-pointer p-6 m-3 bg-gradient-to-tr ${bgClass} ${borderClas}`}
      onClick={handleCardClick}
    >
      {feeRateCode == selectedFeeRate ? (
        <CheckCircleSolid className="absolute top-2 left-2" />
      ) : (
        <CheckCircle className="absolute top-2 left-2 hidden group-hover:block" />
      )}
      <h4 className="font-bold text-nowrap">{title}</h4>

      <div>
        {feeStats &&
          feeRateCode != 'custom' &&
          Math.round(feeStats[feeRateCode])}{' '}
        sat/vB
      </div>
    </div>
  );
}
