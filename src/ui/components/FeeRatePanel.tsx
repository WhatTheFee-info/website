import { useContext } from 'react';
import FeeRateCard from './FeeRateCard';
import { AppContext } from '../../AppContext';

export default function FeeRatePanel() {
  const appContext = useContext(AppContext);

  return (
    <div className="flex md:flex-row flex-col my-4">
      {appContext?.feeStats ? (
        <>
          <FeeRateCard
            title="Next hour"
            level="low"
            feeRateSatVb={appContext?.feeStats.hourFee}
          />
          <FeeRateCard
            title="Median (next block)"
            level="medium"
            feeRateSatVb={
              Math.round(appContext?.feeStats.medianNextBlock * 100) / 100
            }
          />
          <FeeRateCard
            title="Next block"
            level="high"
            feeRateSatVb={appContext?.feeStats.fastestFee}
          />
        </>
      ) : (
        <div className="text-center p-6 border">(No fees obtained)</div>
      )}
    </div>
  );
}
