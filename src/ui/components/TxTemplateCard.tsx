import { ReportsSolid } from 'iconoir-react';
import { TxTemplate } from '../../types';

interface TxTemplateCardProps {
  template: TxTemplate;
}

export default function TxTemplateCard({ template }: TxTemplateCardProps) {
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
          {template.costSats?.hour} sats
          <ReportsSolid className="text-lime-600" />
        </div>
        <div
          className="text-nowrap text-right flex flex-row justify-end"
          title="Median (next block)"
        >
          {template.costSats?.halfHour} sats
          <ReportsSolid className="text-amber-600" />
        </div>
        <div
          className="text-nowrap text-right flex flex-row justify-end"
          title="Next block"
        >
          {template.costSats?.fastest} sats
          <ReportsSolid className="text-red-600" />
        </div>
      </div>
    </div>
  );
}
