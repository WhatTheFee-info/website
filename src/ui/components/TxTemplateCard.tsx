import {
  ArrowRight,
  Cube,
  ReportsSolid,
  WarningCircleSolid,
} from 'iconoir-react';
import { TxTemplate } from '../../types';
import { useAppContext } from '../../AppContext';

export enum TxTemplaceCardMode {
  card = 'card',
  row = 'row',
}

interface TxTemplateCardProps {
  template: TxTemplate;
  mode?: TxTemplaceCardMode;
}

export default function TxTemplateCard({
  template,
  mode = TxTemplaceCardMode.card,
}: TxTemplateCardProps) {
  const {
    state: { exRates, selectedCurrency },
  } = useAppContext();

  const fiatNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function calculateSatsForFeePercent(percentMax: number) {
    let minSatsToSpend = (template.costSats?.medianNextBlock ?? 0) / percentMax;
    minSatsToSpend = Math.ceil(minSatsToSpend);

    return satsNumberFormatter.format(minSatsToSpend);
  }

  function calculateCostAndFormat(costInSats?: number) {
    let cost = costInSats;
    let costFormatted = cost?.toFixed(2);
    if (exRates) {
      cost = (costInSats ?? 0) * exRates[selectedCurrency ?? 'BTC'];

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
      className={`flex flex-col rounded border bg-white border-slate-300 shadow
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
          hover:shadow-lg p-4 m-2
          ${mode == TxTemplaceCardMode.card ? '' : 'w-full'}`}
    >
      <div className="flex flex-row p-1">
        <div className="flex flex-col grow">
          <h4 className="text-left font-bold mb-1">{template.name}</h4>
          <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
          {mode == TxTemplaceCardMode.card && (
            <div className="text-left">{template.sizeVB} vBytes</div>
          )}
        </div>
        <div className={`flex flex-col ml-4`}>
          <div
            className={`flex ${mode == TxTemplaceCardMode.card ? 'flex-col' : 'flex-row'} ml-4`}
          >
            <div
              className={`text-nowrap flex-nowrap text-left flex flex-row justify-end items-center
                  ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
            >
              Total fees to pay: {template.costSats?.medianNextBlock} sats
              <ArrowRight
                className="inline-block mx-1"
                height="1em"
                width="1em"
              />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                  ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Spend up to 0.1% in fees"
            >
              {calculateSatsForFeePercent(0.001)}
              <ReportsSolid className="text-lime-600 ms-1" />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Spend up to 1% in fees"
            >
              {calculateSatsForFeePercent(0.01)}
              <ReportsSolid className="text-amber-600 ms-1" />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Spend up to 5% in fees"
            >
              {calculateSatsForFeePercent(0.05)}
              <ReportsSolid className="text-red-600 ms-1" />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Spend up to 5% in fees"
            >
              &lt; {calculateSatsForFeePercent(0.05)}
              <WarningCircleSolid className="text-red-600 ms-1" />
            </div>
          </div>
          {mode == TxTemplaceCardMode.row && (
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
