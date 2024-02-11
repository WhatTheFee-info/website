import { ReactElement } from 'react';
import { TxTemplate } from '../../../types';
import { useAppContext } from '../../../context/AppContext';
import { calculateSatsForFeePercent } from '../../../services/fee.service';
import { TxTemplateCardMode } from './types';
import { convertToCurrencyAndFormat } from '../../../services/exchangeRate.service';

export default function TxTemplateCardMinSatsFee({
  template,
  mode,
  percent,
  icon,
  color,
  title,
}: {
  template: TxTemplate;
  mode: TxTemplateCardMode;
  percent: number;
  icon?: ReactElement;
  color?: string;
  title?: string;
}) {
  const {
    state: { exRates, selectedCurrency, selectedFeeRate },
  } = useAppContext();

  const fiatNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function calculateSatsForFeePercentAndFormat(percentMax: number) {
    const minSatsToSpend = calculateSatsForFeePercent(
      (template.costSats && template.costSats[selectedFeeRate]) ?? 0,
      percentMax,
    );

    return satsNumberFormatter.format(minSatsToSpend);
  }

  function calculateFiatForPercentAndFormat(percentMax: number) {
    const minSatsToSpend = calculateSatsForFeePercent(
      (template.costSats && template.costSats[selectedFeeRate]) ?? 0,
      percentMax,
    );

    return convertToCurrencyAndFormat(
      minSatsToSpend,
      exRates,
      selectedCurrency,
    );
  }

  return (
    <div
      className={`text-nowrap flex-nowrap text-right flex flex-row justify-end items-center
            ${mode == TxTemplateCardMode.card ? '' : 'md:ms-4'}`}
      title={title ?? `Spend up to ${percent * 100}% in fees`}
    >
      <div className="flex flex-col justify-center">
        {calculateSatsForFeePercentAndFormat(percent)}
        {selectedCurrency != 'BTC' && (
          <>
            <br />
            <small>{calculateFiatForPercentAndFormat(percent)}</small>
          </>
        )}
      </div>
      <div
        className={`ms-1 rounded-full size-6 leading-6 text-[0.75em] text-center
          ${color} text-slate-50`}
      >
        {icon ? icon : percent * 100}
      </div>
    </div>
  );
}
