import { useEffect } from 'react';
import { ActionType, useAppContext } from '../../AppContext';

export default function CurrencySelect() {
  const {
    state: { exRates, selectedCurrency },
    dispatch,
  } = useAppContext();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: ActionType.SET_SELECTED_CURRENCY,
      selectedCurrency: event.target.value,
    });
  }

  useEffect(() => {}, [exRates]);

  return (
    <div className="">
      {exRates && (
        <select
          id="currency-select"
          onChange={handleChange}
          value={selectedCurrency}
          className="p-2 bg-slate-50 dark:bg-slate-400 dark:text-slate-800 rounded-lg border border-slate-300"
        >
          {Object.keys(exRates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
