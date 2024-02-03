import {
  ArrowRight,
  Cube,
  ReportsSolid,
  WarningCircleSolid,
} from 'iconoir-react';
import { TxTemplate } from '../../../types';
import { TxTemplateCardMode } from './types';
import TxTemplateCardMinSatsFee from './TxTemplateCardMinSatsFee';

interface TxTemplateCardProps {
  template: TxTemplate;
  mode?: TxTemplateCardMode;
}

export default function TxTemplateCard({
  template,
  mode = TxTemplateCardMode.card,
}: TxTemplateCardProps) {
  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div
      className={`flex flex-col rounded border bg-white border-slate-300 shadow
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
          hover:shadow-lg p-4 m-2
          ${mode == TxTemplateCardMode.card ? '' : 'w-full'}`}
    >
      <div className="flex flex-row p-1">
        <div className="flex flex-col grow">
          <h4 className="text-left font-bold mb-1">{template.name}</h4>
          <small>{`${template.inputs.length} inputs -> ${template.outputs.length} outputs`}</small>
          {mode == TxTemplateCardMode.card && (
            <div className="text-left">
              <span title="Transaction size">
                <Cube className="inline-block me-1" />
              </span>
              {template.sizeVB} vBytes
            </div>
          )}
        </div>
        <div className={`flex flex-col ml-4`}>
          <div
            className={`flex ${mode == TxTemplateCardMode.card ? 'flex-col' : 'flex-row'} ml-4`}
          >
            <div
              className={`text-nowrap flex-nowrap text-left flex flex-row justify-end items-center
                  ${mode == TxTemplateCardMode.card ? '' : 'ms-4'}`}
            >
              Total fees:{' '}
              {template.costSats?.medianNextBlock &&
                satsNumberFormatter.format(
                  template.costSats?.medianNextBlock,
                )}{' '}
              sats
              <ArrowRight
                className="inline-block mx-1"
                height="1em"
                width="1em"
              />
            </div>
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.001}
              icon={<ReportsSolid className="text-lime-600 ms-1" />}
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.01}
              title="Spend up to 0.1% in fees"
              icon={<ReportsSolid className="text-amber-600 ms-1" />}
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.05}
              icon={<ReportsSolid className="text-red-600 ms-1" />}
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={1}
              title="Uneconomic UTXO spend"
              icon={<WarningCircleSolid className="text-red-600 ms-1" />}
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
