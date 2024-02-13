import TxTemplateHealthIcon from './TxTemplate/TxTemplateHealthIcon';

export default function FeeLevelUTXOReference() {
  return (
    <ul className="flex flex-col ">
      <li className="flex flex-row mb-1">
        <TxTemplateHealthIcon className={'bg-lime-600'} percent={0.001} />
        Sats to spend in UTXO for the fees to be up to 0.1%
      </li>
      <li className="flex flex-row mb-1">
        <TxTemplateHealthIcon className={'bg-amber-600'} percent={0.01} />
        Sats to spend in UTXO for the fees to be up to 1%
      </li>
      <li className="flex flex-row mb-1">
        <TxTemplateHealthIcon className={'bg-red-600'} percent={0.05} />
        Sats to spend in UTXO for the fees to be 5%
      </li>
      <li className="flex flex-row mb-1">
        <TxTemplateHealthIcon
          className={'bg-black dark:border dark:border-slate-200'}
          icon={<>💀</>}
          percent={1}
        />
        Sats to spend in UTXO to make in uneconomic (basically dead)
      </li>
    </ul>
  );
}
