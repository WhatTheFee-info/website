import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { calculateSatsForFeePercent } from '../../services/fee.service';
import Card from './Card';
import TxTemplateHealthIcon from './TxTemplate/TxTemplateHealthIcon';
import { TxTemplate } from '../../types';
import definedTemplates from '../../templates';
import { convertToCurrencyAndFormat } from '../../services/exchangeRate.service';

export default function DeadUTXOCard() {
  const {
    state: { exRates, selectedCurrency, selectedFeeRate },
  } = useAppContext();

  const [smallerTxTemplate, setSmallerTxTemplate] = useState<TxTemplate>();

  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const sortedTemplates = definedTemplates.sort(
      (t1, t2) => (t1.sizeVB ?? 0) - (t2.sizeVB ?? 0),
    );
    const smallerTxTem = sortedTemplates[0];

    setSmallerTxTemplate(smallerTxTem);
  }, [definedTemplates]);

  function calculateSatsForFeePercentAndFormat() {
    if (!smallerTxTemplate) return '';

    const minSatsToSpend =
      calculateSatsForFeePercent(
        (smallerTxTemplate.costSats &&
          smallerTxTemplate.costSats[selectedFeeRate]) ??
          0,
        1,
      ) / smallerTxTemplate.inputs.length;

    return satsNumberFormatter.format(minSatsToSpend);
  }

  function calculateFiatForPercentAndFormat() {
    if (!smallerTxTemplate) return '';

    const minSatsToSpendPerUTXO =
      calculateSatsForFeePercent(
        (smallerTxTemplate.costSats &&
          smallerTxTemplate.costSats[selectedFeeRate]) ??
          0,
        1,
      ) / smallerTxTemplate.inputs.length;

    return convertToCurrencyAndFormat(
      minSatsToSpendPerUTXO,
      exRates,
      selectedCurrency,
    );
  }

  return (
    <Card className="flex justify-center text-center text-2xl">
      <TxTemplateHealthIcon
        className="bg-black dark:border dark:border-slate-200"
        icon={<>💀</>}
        percent={1}
      />
      <p>
        UTXOs equal or under{' '}
        <span
          className={`rounded-full mx-1 py-1 px-2
          bg-slate-950 text-slate-200 dark:bg-slate-200 dark:text-slate-950 `}
        >
          {calculateSatsForFeePercentAndFormat()} sat{' '}
          {selectedCurrency != 'BTC' && (
            <>
              <small>({calculateFiatForPercentAndFormat()})</small>
            </>
          )}
        </span>{' '}
        are dead
      </p>
      <TxTemplateHealthIcon
        className="bg-black dark:border dark:border-slate-200"
        icon={<>💀</>}
        percent={1}
      />
    </Card>
  );
}
