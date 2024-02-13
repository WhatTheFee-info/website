import TxTemplateHealthIcon from '../components/TxTemplate/TxTemplateHealthIcon';

export default function About() {
  return (
    <div className="text-center mx-auto max-w-3xl">
      <h1 className="mb-10">About WTFee</h1>
      <p className="my-2">
        WTFee helps you analyze the <em>economic health</em> of your UTXO so you
        can determine the best moment to spend them, and the best way to spend
        them.
      </p>
      <p className="my-2">
        Based on the recommended fees to operate on the betwork, you can see how
        different amounts of UTXO will behave economically when used in
        different types of transactions (what we call{' '}
        <em>transaction templates</em>).
      </p>
      <p className="my-2 flex flex-col content-center items-center">
        Here is how we identify those scenarios in each transaction template:
        <ul className="flex flex-col ">
          <li className="flex flex-row mb-1">
            <TxTemplateHealthIcon color={'bg-lime-600'} percent={0.001} />
            Sats to spend in UTXO for the fees to be up to 0.1%
          </li>
          <li className="flex flex-row mb-1">
            <TxTemplateHealthIcon color={'bg-amber-600'} percent={0.01} />
            Sats to spend in UTXO for the fees to be up to 1%
          </li>
          <li className="flex flex-row mb-1">
            <TxTemplateHealthIcon color={'bg-red-600'} percent={0.05} />
            Sats to spend in UTXO for the fees to be 5%
          </li>
          <li className="flex flex-row mb-1">
            <TxTemplateHealthIcon
              color={'bg-slate-950'}
              icon={<>💀</>}
              percent={1}
            />
            Sats to spend in UTXO to make in uneconomic (basically dead)
          </li>
        </ul>
      </p>

      <h2 className="text-xl font-bold mt-10">Thanks</h2>
      <p className="mb-10">
        We want to thank Satoshi, above all.<br/>
        We want to thank all the people from Coseco. Their unique nature is a
        constant inspiration, and source of fear and wonder.
      </p>
    </div>
  );
}
