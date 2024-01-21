import { ReportsSolid } from 'iconoir-react';
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

  function calcualteCostAndFormat(costInSats?: number) {
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
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Median for next block"
            >
              {calcualteCostAndFormat(template.costSats?.medianNextBlock)}
              <ReportsSolid className="text-red-600" />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Minimum for next block"
            >
              {calcualteCostAndFormat(template.costSats?.minimumNextBlock)}
              <ReportsSolid className="text-amber-600" />
            </div>
            <div
              className={`text-nowrap flex-nowrap text-right flex flex-row justify-end
                    ${mode == TxTemplaceCardMode.card ? '' : 'ms-4'}`}
              title="Next hour"
            >
              {calcualteCostAndFormat(template.costSats?.hour)}
              <ReportsSolid className="text-lime-600" />
            </div>
          </div>
          {mode == TxTemplaceCardMode.row && (
            <div className="text-right mt-1.5">{template.sizeVB} vBytes</div>
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
