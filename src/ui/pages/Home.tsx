import FeeRatePanel from '../components/FeeRate/FeeRatePanel';
import TxTemplatesGrid from '../components/TxTemplate/TxTemplatesGrid';

export default function Home() {
  return (
    <>
      <section id="fee-rates" className="mb-8">
        <h2 className="text-2xl font-bold">
          Current fees of the Bitcoin network
        </h2>
        <FeeRatePanel />
      </section>

      <section id="tx-templates" className="mb-8">
        <TxTemplatesGrid />
      </section>
    </>
  );
}
