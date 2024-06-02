import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  calculateSatsForFeePercent,
  calculateTxCostPerFeeRate,
} from '../../services/fee.service';
import { convertToCurrencyAndFormat } from '../../services/exchangeRate.service';
import Card from './Card';
import TxTemplateHealthIcon from './TxTemplate/TxTemplateHealthIcon';
import { TxTemplate } from '../../types';
import definedTemplates from '../../templates';
import { calcaulteSize } from '../../services/transaction.service';

export default function DeadUTXOCard() {
  const {
    state: {
      exRates,
      selectedCurrency,
      selectedFeeRate,
      customFeeRate,
      feeStats,
    },
  } = useAppContext();

  const [satsAmountFormatted, setSatsAmountFormatted] = useState<string>('0');
  const [fiatAmountFormatted, setFiatAmountFormatted] = useState<string>('0');

  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    // get the smaller tx
    const smallerTxTem = definedTemplates.find(
      (template) => template.code == 'p2wpkh_1i-1o',
    );
    if (smallerTxTem) {
      // recalculate cost
      if (!smallerTxTem.sizeVB) {
        smallerTxTem.sizeVB = calcaulteSize(smallerTxTem);
      }
      smallerTxTem.costSats = calculateTxCostPerFeeRate(
        smallerTxTem,
        feeStats,
        customFeeRate,
      );

      // calcaulte and prepare amounts for display
      setSatsAmountFormatted(calculateSatsForFeePercentAndFormat(smallerTxTem));
      setFiatAmountFormatted(calculateFiatForPercentAndFormat(smallerTxTem));
    }
  }, [
    definedTemplates,
    feeStats,
    selectedFeeRate,
    customFeeRate,
    selectedCurrency,
  ]);

  function calculateSatsForFeePercentAndFormat(template: TxTemplate) {
    if (!template) return '';

    const minSatsToSpend =
      calculateSatsForFeePercent(
        (template.costSats && template.costSats[selectedFeeRate]) ?? 0,
        1,
      ) / template.inputs.length;

    return satsNumberFormatter.format(minSatsToSpend);
  }

  function calculateFiatForPercentAndFormat(template: TxTemplate) {
    if (!template) return '';

    const minSatsToSpendPerUTXO =
      calculateSatsForFeePercent(
        (template.costSats && template.costSats[selectedFeeRate]) ?? 0,
        1,
      ) / template.inputs.length;

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
          {satsAmountFormatted} sat{' '}
          {selectedCurrency != 'BTC' && (
            <>
              <small>({fiatAmountFormatted})</small>
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
