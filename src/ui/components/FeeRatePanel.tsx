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
            title="Median for next block 🥵🏃"
            level="medium"
            feeRateSatVb={Math.round(feeStats.medianNextBlock * 100) / 100}
          />
          <FeeRateCard
            title="Minimum for next block 😯🚶"
            level="high"
            feeRateSatVb={feeStats.fastestFee}
          />
          <FeeRateCard
            title="Next hour ☕🧉"
            level="low"
            feeRateSatVb={feeStats.hourFee}
          />
        </>
      ) : (
        <div className="text-center p-6 border">(No fees obtained)</div>
      )}
    </div>
  );
}
