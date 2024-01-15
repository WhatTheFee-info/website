import { useContext } from 'react';
import FeeRateBox from './FeeRateBox';
import { AppContext } from '../../AppContext';

export default function FeeRatePanel() {
  const appContext = useContext(AppContext);

  return (
    <div className="flex my-4">
      {appContext?.fees ? (
        <>
          <FeeRateBox
            title="No priority"
            feeRateSatVb={appContext?.fees.economyFee}
          />
          <FeeRateBox
            title="Low priority"
            level='low'
            feeRateSatVb={appContext?.fees.hourFee}
          />
          <FeeRateBox
            title="Medium priority"
            level='medium'
            feeRateSatVb={appContext?.fees.halfHourFee}
          />
          <FeeRateBox
            title="High priority"
            level='high'
            feeRateSatVb={appContext?.fees.fastestFee}
          />
        </>
      ) : (
        <div className="text-center p-6 border">(No fees obtained)</div>
      )}
    </div>
  );
}
