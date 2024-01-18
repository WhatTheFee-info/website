import { useEffect, useState } from 'react';
import { TxTemplate } from '../../types';
import { calcaulteSize } from '../../services/transaction.service';
import definedTemplates from '../../templates';
import TxTemplateCard from './TxTemplateCard';
import { useAppContext } from '../../AppContext';

export default function TxTemplatesGrid() {
  const {
    state: { feeStats },
  } = useAppContext();
  const [calculatedTemplates, setCalculatedTemplates] =
    useState<TxTemplate[]>();

  function calculateTemplatesCosts() {
    console.debug('Calculating size and cost...');

    const calculatedTemplates = definedTemplates as TxTemplate[];
    for (let t = 0; t < definedTemplates.length; t++) {
      const template = definedTemplates[t];
      template.sizeVB = calcaulteSize(template);
      // now calculate cost (use Math.ceil to round up sats amoung)
      template.costSats = {
        economy: Math.ceil(template.sizeVB * (feeStats?.economyFee ?? 0)),
        minimum: Math.ceil(template.sizeVB * (feeStats?.minimumFee ?? 0)),
        hour: Math.ceil(template.sizeVB * (feeStats?.hourFee ?? 0)),
        halfHour: Math.ceil(template.sizeVB * (feeStats?.halfHourFee ?? 0)),
        fastest: Math.ceil(template.sizeVB * (feeStats?.fastestFee ?? 0)),
        median: Math.ceil(template.sizeVB * (feeStats?.medianNextBlock ?? 0)),
      };
    }
    setCalculatedTemplates(calculatedTemplates);
  }

  useEffect(() => {
    calculateTemplatesCosts();
  }, [feeStats]);

  return (
    <div className="flex-1 my-4 md:px-4">
      {!calculatedTemplates || calculatedTemplates.length == 0 ? (
        <p>(No transaction templates available)</p>
      ) : (
        <div className="flex sm:flex-row sm:flex-wrap flex-col">
          {calculatedTemplates.map((template) => (
            <TxTemplateCard key={template.code} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
