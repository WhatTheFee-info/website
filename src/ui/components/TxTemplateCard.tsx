import { ReportsSolid } from 'iconoir-react';
import { TxTemplate } from '../../types';
import { useAppContext } from '../../AppContext';

interface TxTemplateCardProps {
  template: TxTemplate;
}

export default function TxTemplateCard({ template }: TxTemplateCardProps) {
  const {
    state: { exRates, selectedCurrency },
  } = useAppContext();

  function calcualteCostAndFormat(costInSats?: number) {
    let cost = costInSats;
    let costFormatted = cost?.toFixed(2);
    if (exRates) {
      cost = (costInSats ?? 0) * exRates[selectedCurrency ?? 'BTC'];

      if (selectedCurrency != 'BTC') {
        // now divide to convert sats to BTC
        cost = cost / 100000000;
        costFormatted = new Intl.NumberFormat().format(cost);
        costFormatted += ` ${selectedCurrency}`;
      } else {
        // if BTC display in sats
        costFormatted = cost.toString();
        costFormatted += ` sats`;
      }
    }
    return costFormatted;
  }

  return (
    <div
      className="flex flex-col rounded border bg-white border-slate-300 shadow
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
          hover:shadow-lg p-4 m-2"
    >
      <div className="flex flex-row">
        <div className="flex-col grow m-2">
          <h4 className="text-left font-bold">{template.name}</h4>
          <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
          <div className="text-left">{template.sizeVB} vBytes</div>
        </div>
        <div className="flex-col ml-2">
          <div
            className="text-nowrap flex-nowrap text-right flex flex-row justify-end"
            title="Median for next block)"
          >
            {calcualteCostAndFormat(template.costSats?.median)}
            <ReportsSolid className="text-red-600" />
          </div>
          <div
            className="text-nowrap flex-nowrap text-right flex flex-row justify-end"
            title="Minimum for next block"
          >
            {calcualteCostAndFormat(template.costSats?.fastest)}
            <ReportsSolid className="text-amber-600" />
          </div>
          <div
            className="text-nowrap flex-nowrap text-right flex flex-row justify-end"
            title="Next hour"
          >
            {calcualteCostAndFormat(template.costSats?.hour)}
            <ReportsSolid className="text-lime-600" />
          </div>
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
