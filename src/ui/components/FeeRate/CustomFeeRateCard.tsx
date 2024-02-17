import { CheckCircle, CheckCircleSolid } from 'iconoir-react';
import { useAppContext } from '../../../context/AppContext';
import { ActionType } from '../../../context/reducer';
import { useState } from 'react';
import Button from '../Button';

interface FeeRateCardProps {}

export default function CustomFeeRateCard({}: FeeRateCardProps) {
  const {
    state: { selectedFeeRate, customFeeRate, feeStats },
    dispatch,
  } = useAppContext();
  const [feeRate, setFeeRate] = useState<number>(customFeeRate);
  const [isInvalidValue, setIsInvalidValue] = useState<boolean>(false);

  function saveNewFeeRate(newFeeRate: number) {
    setIsInvalidValue(false);
    setFeeRate(newFeeRate);

    dispatch({
      type: ActionType.SET_CUSTOM_FEERATE,
      customFeeRate: newFeeRate,
    });
  }

  function handleCardClick() {
    dispatch({
      type: ActionType.SET_SELECTED_FEERATE,
      selectedFeeRate: 'custom',
    });
  }

  function handleFeeRateClick(event: React.MouseEvent<HTMLInputElement>) {
    // prevent selecting the card
    event.stopPropagation();
  }

  function handleFeeRateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    const number = parseFloat(text);
    if (Number.isNaN(number)) {
      setIsInvalidValue(true);
      return;
    }

    saveNewFeeRate(number);
  }

  function handleMultipleRateClick(
    multiple: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    // prevent selecting the card
    event.stopPropagation();

    // round to 2 decimals
    const newFeeRate = Math.round((feeStats?.medianNextBlock ?? 0) * multiple);
    saveNewFeeRate(newFeeRate);
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
        <div>
          <Button
            title="2 times the median for next block"
            onClick={(e) => handleMultipleRateClick(2, e)}
            className={`rounded-e-none p-[4px] border-e-0 text-sm shadow-none`}
          >
            2x
          </Button>
          <Button
            title="5 times the median for next block"
            onClick={(e) => handleMultipleRateClick(5, e)}
            className={`rounded-none p-[4px] border-e-0 text-sm shadow-none`}
          >
            5x
          </Button>
          <input
            className={`flex-initial rounded-e rounded-s-none 
              bg-slate-200 border border-slate-700
              text-slate-900 p-1 text-right text-sm max-w-24
            ${isInvalidValue ? 'border-red-700 bg-red-200' : ''}`}
            type="number"
            name="custom-fee-rate"
            value={feeRate ?? 0}
            onChange={handleFeeRateChange}
            onClick={handleFeeRateClick}
          />
        </div>
        <span className="flex-initial whitespace-nowrap ms-2">sat/vB</span>
      </div>
    </div>
  );
}
