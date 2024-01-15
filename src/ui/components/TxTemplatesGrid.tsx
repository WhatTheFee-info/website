import { useContext, useEffect, useState } from 'react';
import { TxTemplate } from '../../types';
import { calcaulteSize } from '../../services/transaction.service';
import { AppContext } from '../../AppContext';
import definedTemplates from '../../templates';
import TxTemplateBox from './TxTemplateBox';

export default function TxTemplatesGrid() {
  const { fees } = useContext(AppContext);
  const [calculatedTemplates, setCalculatedTemplates] =
    useState<TxTemplate[]>();

  function calculateTemplatesCosts() {
    console.debug('Calculating size and cost...');

    const calculatedTemplates = definedTemplates as TxTemplate[];
    for (let t = 0; t < definedTemplates.length; t++) {
      const template = definedTemplates[t];
      template.sizeVB = calcaulteSize(template);
      // now calculate cost
      template.costSats = {
        economy: template.sizeVB * (fees?.economyFee ?? 0),
        minimum: template.sizeVB * (fees?.minimumFee ?? 0),
        hour: template.sizeVB * (fees?.hourFee ?? 0),
        halfHour: template.sizeVB * (fees?.halfHourFee ?? 0),
        fastest: template.sizeVB * (fees?.fastestFee ?? 0),
      };
    }
    setCalculatedTemplates(calculatedTemplates);
  }

  useEffect(() => {
    calculateTemplatesCosts();
  }, [fees]);

  return (
    <div className="flex-1 my-4 md:px-4">
      {!calculatedTemplates || calculatedTemplates.length == 0 ? (
        <p>(No transaction templates available)</p>
      ) : (
        <div className="flex flex-row">
          {calculatedTemplates.map((template) => (
            <TxTemplateBox key={template.code} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
