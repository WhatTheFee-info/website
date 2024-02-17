import { CheckCircle, CheckCircleSolid } from 'iconoir-react';
import { useAppContext } from '../../../context/AppContext';
import { ActionType } from '../../../context/reducer';
import { useState } from 'react';

interface FeeRateCardProps {}

export default function CustomFeeRateCard({}: FeeRateCardProps) {
  const {
    state: { selectedFeeRate, customFeeRate },
    dispatch,
  } = useAppContext();
  const [feeRate, setFeeRate] = useState<number>(customFeeRate);
  const [isInvalidValue, setIsInvalidValue] = useState<boolean>(false);

  function handleCardClick() {
    dispatch({
      type: ActionType.SET_SELECTED_FEERATE,
      selectedFeeRate: 'custom',
    });
  }

  function handleFeeRateClick(event: React.MouseEvent<HTMLInputElement>) {
    event.stopPropagation();
  }

  function handleFeeRateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    const number = parseFloat(text);
    if (Number.isNaN(number)) {
      setIsInvalidValue(true);
      return;
    }
    setIsInvalidValue(false);
    setFeeRate(number);

    dispatch({
      type: ActionType.SET_CUSTOM_FEERATE,
      customFeeRate: number,
    });
  }

  return (
    <div
      className={`group flex-1 text-center text-slate-800 rounded border shadow relative
          dark:text-slate-200
          cursor-pointer p-6 m-3 bg-gradient-to-tr 
          from-slate-200 to-slate-400 dark:from-slate-600 dark:to-slate-800 
          border-slate-300 dark:border-slate-600`}
      onClick={handleCardClick}
    >
      {'custom' == selectedFeeRate ? (
        <CheckCircleSolid className="absolute top-2 left-2" />
      ) : (
        <CheckCircle className="absolute top-2 left-2 hidden group-hover:block" />
      )}
      <h4 className="font-bold text-nowrap">Custom ⚙️🧐</h4>
      <div className="flex flex-row flex-nowrap justify-center">
        <input
          className={`flex-initial rounded bg-slate-200 text-slate-900 p-1 text-right text-sm max-w-20
            ${isInvalidValue ? 'border border-red-700 bg-red-200' : ''}`}
          type="number"
          name="custom-fee-rate"
          defaultValue={feeRate}
          onChange={handleFeeRateChange}
          onClick={handleFeeRateClick}
        />
        <span className="flex-initial whitespace-nowrap ms-2">sat/vB</span>
      </div>
    </div>
  );
}
