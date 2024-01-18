import FeeRateCard from './FeeRateCard';
import { useAppContext } from '../../AppContext';

export default function FeeRatePanel() {
  const {
    state: { feeStats },
  } = useAppContext();

  return (
    <div className="flex md:flex-row flex-col my-4">
      {feeStats ? (
        <>
          <FeeRateCard
            title="Next hour"
            level="low"
            feeRateSatVb={feeStats.hourFee}
          />
          <FeeRateCard
            title="Median (next block)"
            level="medium"
            feeRateSatVb={Math.round(feeStats.medianNextBlock * 100) / 100}
          />
          <FeeRateCard
            title="Next block"
            level="high"
            feeRateSatVb={feeStats.fastestFee}
          />
        </>
      ) : (
        <div className="text-center p-6 border">(No fees obtained)</div>
      )}
    </div>
  );
}
