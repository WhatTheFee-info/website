import { useContext } from 'react';
import FeeRateBox from './FeeRateBox';
import { AppContext } from '../../AppContext';

export default function FeeRatePanel() {
  const appContext = useContext(AppContext);

  return (
    <div className="flex my-4">
      {appContext?.feeStats ? (
        <>
          <FeeRateBox
            title="Next hour"
            level="low"
            feeRateSatVb={appContext?.feeStats.hourFee}
          />
          <FeeRateBox
            title="Median (next block)"
            level="medium"
            feeRateSatVb={Math.round(appContext?.feeStats.medianNextBlock * 100) / 100}
          />
          <FeeRateBox
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
