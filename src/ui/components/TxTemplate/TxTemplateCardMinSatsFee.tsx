import { ReactElement } from 'react';
import { TxTemplate } from '../../../types';
import { useAppContext } from '../../../AppContext';
import { calculateSatsForFeePercent } from '../../../services/fee.service';
import { TxTemplateCardMode } from './types';

export default function TxTemplateCardMinSatsFee({
  template,
  mode,
  percent,
  icon,
  title,
}: {
  template: TxTemplate;
  mode: TxTemplateCardMode;
  percent: number;
  icon: ReactElement;
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

    let cost = minSatsToSpend;
    let costFormatted = cost?.toFixed(2);
    if (exRates) {
      cost = (minSatsToSpend ?? 0) * exRates[selectedCurrency ?? 'BTC'];

      if (selectedCurrency == 'BTC') {
        // if BTC display in sats
        costFormatted = cost.toString();
        costFormatted += ` sats`;
      } else {
        // now divide to convert sats to BTC
        cost = cost / 100000000;
        costFormatted = fiatNumberFormatter.format(cost);
        costFormatted += ` ${selectedCurrency}`;
      }
    }
    return costFormatted;
  }

  return (
    <div
      className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
            ${mode == TxTemplateCardMode.card ? '' : 'ms-4'}`}
      title={title ?? `Spend up to ${percent * 100}% in fees`}
    >
      <div>
        {calculateSatsForFeePercentAndFormat(percent)}
        {selectedCurrency != 'BTC' && (
          <>
            <br />
            <small>{calculateFiatForPercentAndFormat(percent)}</small>
          </>
        )}
      </div>
      {icon}
    </div>
  );
}