import { ReportsSolid } from 'iconoir-react';
import { TxTemplate } from '../../types';
import { useAppContext } from '../../AppContext';
import { useEffect, useState } from 'react';

interface TxTemplateCardProps {
  template: TxTemplate;
}

export default function TxTemplateCard({ template }: TxTemplateCardProps) {
  const {
    state: { exRates, selectedCurrency },
  } = useAppContext();

  function calcualteCost(costInSats?: number) {
    let cost = costInSats;
    if (exRates) {
      cost =
        (template.costSats?.hour ?? 0) * exRates[selectedCurrency ?? 'BTC'];
      // now divide to convert sats to BTC
      cost = cost / 100000000;
    }
    return cost?.toFixed(2);
  }

  return (
    <div className="flex flex-row rounded border border-slate-300 shadow dark:shadow-slate-300 hover:shadow-lg p-4 m-2">
      <div className="flex-col m-2">
        <h4 className="text-left font-bold">{template.name}</h4>
        <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
        <div className="text-left">{template.sizeVB} vBytes</div>
      </div>
      <div className="flex-col ml-2">
        <div
          className="text-nowrap text-right flex flex-row justify-end"
          title="Next hour"
        >
          {calcualteCost(template.costSats?.hour)} {selectedCurrency}
          <ReportsSolid className="text-lime-600" />
        </div>
        <div
          className="text-nowrap text-right flex flex-row justify-end"
          title="Median (next block)"
        >
          {calcualteCost(template.costSats?.halfHour)} {selectedCurrency}
          <ReportsSolid className="text-amber-600" />
        </div>
        <div
          className="text-nowrap text-right flex flex-row justify-end"
          title="Next block"
        >
          {calcualteCost(template.costSats?.fastest)} {selectedCurrency}
          <ReportsSolid className="text-red-600" />
        </div>
      </div>
    </div>
  );
}
