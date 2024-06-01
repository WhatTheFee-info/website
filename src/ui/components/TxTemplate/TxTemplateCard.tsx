import { Coins, Cube } from 'iconoir-react';
import { TxTemplate } from '../../../types';
import { TxTemplateCardMode } from './types';
import TxTemplateCardMinSatsFee from './TxTemplateCardMinSatsFee';
import { useAppContext } from '../../../context/AppContext';
import { convertToCurrencyAndFormat } from '../../../services/exchangeRate.service';
import { useEffect } from 'react';
import { calcaulteSize } from '../../../services/transaction.service';
import { calculateTxCostPerFeeRate } from '../../../services/fee.service';

interface TxTemplateCardProps {
  template: TxTemplate;
  mode?: TxTemplateCardMode;
}

function TxTemplateTotalFees({
  template,
  mode,
  className,
}: TxTemplateCardProps & { className: string }) {
  const {
    state: { selectedFeeRate, exRates, selectedCurrency },
  } = useAppContext();

  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div
      className={`text-nowrap flex-nowrap flex flex-row items-center ${className}
          ${mode == TxTemplateCardMode.card ? '' : 'md:ms-4'}`}
    >
      <div className="flex flex-row" title="Total fee for the transaction">
        <Coins />
        {mode == TxTemplateCardMode.row && (
          <span className="hidden md:inline">Total fees:</span>
        )}
      </div>
      <div className="ms-1 text-nowrap text-right flex flex-col justify-center">
        {template.costSats && template.costSats[selectedFeeRate] && (
          <>
            {satsNumberFormatter.format(template.costSats[selectedFeeRate])}{' '}
            sats
            {selectedCurrency != 'BTC' && (
              <>
                <br />
                <small>
                  {convertToCurrencyAndFormat(
                    template.costSats[selectedFeeRate],
                    exRates,
                    selectedCurrency,
                  )}
                </small>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function TxTemplateCard({
  template,
  mode = TxTemplateCardMode.card,
}: TxTemplateCardProps) {
  const {
    state: {
      exRates,
      selectedCurrency,
      selectedFeeRate,
      customFeeRate,
      feeStats,
    },
  } = useAppContext();

  useEffect(() => {
    // recalculate cost
    template.sizeVB = calcaulteSize(template);
    template.costSats = calculateTxCostPerFeeRate(
      template,
      feeStats,
      customFeeRate,
    );
  }, [feeStats, selectedFeeRate, customFeeRate, selectedCurrency, exRates]);
  return (
    <div
      className={`flex flex-col rounded border bg-white border-slate-300 shadow
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
          hover:shadow-lg p-4
          ${mode == TxTemplateCardMode.card ? '' : 'md:w-full'}`}
    >
      <div className="flex flex-row p-1">
        <div className="flex flex-col grow">
          <h4 className="text-left font-bold mb-1">{template.name}</h4>
          <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
          {mode == TxTemplateCardMode.card && (
            <>
              <div className="text-left">
                <span title="Transaction size">
                  <Cube className="inline-block me-1" />
                </span>
                {template.sizeVB} vBytes
                <TxTemplateTotalFees
                  mode={mode}
                  template={template}
                  className="justify-start"
                />
              </div>
            </>
          )}
        </div>
        <div className={`flex flex-col ml-4`}>
          <div
            className={`flex flex-col ${mode == TxTemplateCardMode.card ? '' : 'md:flex-row'} ml-4`}
          >
            {mode == TxTemplateCardMode.row && (
              <TxTemplateTotalFees
                mode={mode}
                template={template}
                className="me-3"
              />
            )}
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.001}
              color="bg-lime-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.01}
              color="bg-amber-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.05}
              color="bg-red-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={1}
              title="Uneconomic UTXO spend"
              color="bg-black dark:border dark:border-slate-200"
              icon={<>💀</>}
            />
          </div>
          {mode == TxTemplateCardMode.row && (
            <div className="text-right mt-1.5">
              {template.sizeVB} vBytes
              <span title="Transaction size">
                <Cube className="inline-block ms-1" />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-row">
        {template.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-sky-200 text-sky-950 mx-1 text-xs py-1 px-1.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
