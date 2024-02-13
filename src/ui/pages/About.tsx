import FeeLevelUTXOReference from '../components/FeeLevelUTXOReference';
import TxTemplateHealthIcon from '../components/TxTemplate/TxTemplateHealthIcon';
import { usePlayWTFeeAudio } from '../hooks';

export default function About() {
  const playWTFeeAudio = usePlayWTFeeAudio();

  return (
    <div className="text-center mx-auto max-w-3xl">
      <h1 className="mb-10" onClick={playWTFeeAudio}>
        About WTFee
      </h1>
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
        <FeeLevelUTXOReference />
      </p>

      <p className="my-10">
        If you have any problem or feedback, please leave it here:
        <br />
        <a href="https://github.com/wtfee-today/website/issues" target="_blank">
          https://github.com/wtfee-today/website/issues
        </a>
      </p>

      <h2 className="text-xl font-bold mt-10">Thanks</h2>
      <p className="mb-10">
        We want to thank Satoshi, above all.
        <br />
        We want to thank all the people from Coseco. Their unique nature is a
        constant inspiration, and source of fear and wonder.
      </p>
    </div>
  );
}
