import { ArrowRight, Cube } from 'iconoir-react';
import { TxTemplate } from '../../../types';
import { TxTemplateCardMode } from './types';
import TxTemplateCardMinSatsFee from './TxTemplateCardMinSatsFee';
import { useAppContext } from '../../../context/AppContext';

interface TxTemplateCardProps {
  template: TxTemplate;
  mode?: TxTemplateCardMode;
}

export default function TxTemplateCard({
  template,
  mode = TxTemplateCardMode.card,
}: TxTemplateCardProps) {
  const {
    state: { selectedFeeRate },
  } = useAppContext();

  const satsNumberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div
      className={`flex flex-col rounded border bg-white border-slate-300 shadow
        dark:bg-slate-950 dark:border-slate-600 dark:shadow-slate-400
          hover:shadow-lg p-4 m-2
          ${mode == TxTemplateCardMode.card ? '' : 'md:w-full'}`}
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
            className={`flex flex-col ${mode == TxTemplateCardMode.card ? '' : 'md:flex-row'} ml-4`}
          >
            <div
              className={`text-nowrap flex-nowrap text-left flex flex-row justify-end items-center
                  ${mode == TxTemplateCardMode.card ? '' : 'md:ms-4'}`}
            >
              Total fees:{' '}
              {template.costSats &&
                template.costSats[selectedFeeRate] &&
                satsNumberFormatter.format(
                  template.costSats[selectedFeeRate],
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
              color="bg-lime-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.01}
              color="bg-amber-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={0.05}
              color="bg-red-600"
            />
            <TxTemplateCardMinSatsFee
              template={template}
              mode={mode}
              percent={1 * template.inputs.length}
              title="Uneconomic UTXO spend"
              color="bg-slate-950"
              icon={<>💀</>}
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
