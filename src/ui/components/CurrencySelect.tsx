import { ActionType, useAppContext } from '../../AppContext';

export default function CurrencySelect() {
  const {
    state: { exRates },
    dispatch,
  } = useAppContext();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch({
      type: ActionType.SET_SELECTED_CURRENCY,
      selectedCurrency: event.target.value,
    });
  }

  return (
    <div className="absolute right-4 top-4">
      {exRates && (
        <select
          id="currency-select"
          onChange={handleChange}
          className="p-1 rounded border border-slate-300"
        >
          {Object.keys(exRates).map((currency) => (
            <option value={currency} key={currency}>{currency}</option>
          ))}
        </select>
      )}
    </div>
  );
}
