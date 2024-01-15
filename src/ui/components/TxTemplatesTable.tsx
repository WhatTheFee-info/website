import { useContext, useEffect, useState } from 'react';
import { ReportsSolid } from 'iconoir-react';
import { TxTemplate } from '../../types';
import { calcaulteSize } from '../../services/transaction.service';
import { AppContext } from '../../AppContext';
import definedTemplates from '../../templates';

export default function TxTemplatesTable() {
  const { fees } = useContext(AppContext);
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
        economy: template.sizeVB * (fees?.economyFee ?? 0),
        minimum: template.sizeVB * (fees?.minimumFee ?? 0),
        hour: template.sizeVB * (fees?.hourFee ?? 0),
        halfHour: template.sizeVB * (fees?.halfHourFee ?? 0),
        fastest: template.sizeVB * (fees?.fastestFee ?? 0),
      };
    }
    setCalculatedTemplates(calculatedTemplates);
  }, [fees]);

  return (
    <div className="flex-1 my-4 md:px-4">
      {!calculatedTemplates || calculatedTemplates.length == 0 ? (
        <p>(No transaction templates available)</p>
      ) : (
        <div className="flex flex-row">
          {calculatedTemplates.map((template) => (
            <div
              key={template.code}
              className="flex flex-row rounded border border-slate-300 drop-shadow p-6 m-2"
            >
              <div className="flex-col m-2">
                <h4 className="text-left font-bold">{template.name}</h4>
                <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
                <div className="text-left">{template.sizeVB} vBytes</div>
              </div>
              <div className="flex-col">
                <div className="text-nowrap text-right flex flex-row">
                  <ReportsSolid className="text-slate-600" />
                  {template.costSats?.economy} sats
                </div>
                <div className="text-nowrap text-right flex flex-row">
                  <ReportsSolid className="text-lime-600" />
                  {template.costSats?.hour} sats
                </div>
                <div className="text-nowrap text-right flex flex-row">
                  <ReportsSolid className="text-amber-600" />
                  {template.costSats?.halfHour} sats
                </div>
                <div className="text-nowrap text-right flex flex-row">
                  <ReportsSolid className="text-red-600" />
                  {template.costSats?.fastest} sats
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
