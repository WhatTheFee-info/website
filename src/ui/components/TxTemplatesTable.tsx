import { useContext, useEffect, useState } from 'react';
import { TxTemplate } from '../../types';
import { calcaulteSize } from '../../services/transaction.service';
import { AppContext } from '../../AppContext';
import definedTemplates from '../../templates';

export default function TxTemplatesTable() {
  const appContext = useContext(AppContext);
  const [calculatedTemplates, setCalculatedTemplates] =
    useState<TxTemplate[]>();

  useEffect(() => {
    const calculatedTemplates = definedTemplates as TxTemplate[];
    console.debug('Calculating size and cost...');
    for (let t = 0; t < definedTemplates.length; t++) {
      const template = definedTemplates[t];
      template.sizeVB = calcaulteSize(template);
      // now calculate cost
      template.costSats = {
        economy: template.sizeVB * (appContext.fees?.economyFee ?? 0),
        minimum: template.sizeVB * (appContext.fees?.minimumFee ?? 0),
        hour: template.sizeVB * (appContext.fees?.hourFee ?? 0),
        halfHour: template.sizeVB * (appContext.fees?.halfHourFee ?? 0),
        fastest: template.sizeVB * (appContext.fees?.fastestFee ?? 0),
      };
    }
    setCalculatedTemplates(calculatedTemplates);
  }, [appContext.fees]);

  return (
    <div className="flex-1 my-4 md:px-4">
      {!calculatedTemplates || calculatedTemplates.length == 0 ? (
        <p>(No transaction templates available)</p>
      ) : (
        <div className="flex-1 flex-column">
          <div className="flex flex-row font-bold text-lg border-b border-slate-300">
            <div className="grow">
              <h4 className="text-left">Template</h4>
            </div>
            <div className="w-1/12">
              <h4 className="text-right">Size</h4>
            </div>
            <div className="w-1/12">
              <h4 className="text-right">No priority</h4>
            </div>
            <div className="w-1/12">
              <h4 className="text-right">Low</h4>
            </div>
            <div className="w-1/12">
              <h4 className="text-right">Medium</h4>
            </div>
            <div className="w-1/12">
              <h4 className="text-right">High</h4>
            </div>
          </div>
          {calculatedTemplates.map((template) => (
            <div key={template.code} className="flex flex-row">
              <div className="grow">
                <h4 className="text-left">{template.name}</h4>
                <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
              </div>
              <div className="w-1/12 text-right">{template.sizeVB} vBytes</div>
              <div className="w-1/12 text-right">
                {template.costSats?.economy} sats
              </div>
              <div className="w-1/12 text-right">
                {template.costSats?.hour} sats
              </div>
              <div className="w-1/12 text-right">
                {template.costSats?.halfHour} sats
              </div>
              <div className="w-1/12 text-right">
                {template.costSats?.fastest} sats
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
