import * as dateFns from 'date-fns';
import FeeRateCard from './FeeRateCard';
import { useAppContext } from '../../AppContext';

export default function FeeRatePanel() {
  const {
    state: { feeStats, feesLastFetchedAt },
  } = useAppContext();

  return (
    <div className="flex flex-col my-4">
      {feeStats ? (
        <>
          <div className="flex md:flex-row flex-col">
            <FeeRateCard
              title="Median for next block 🥵🏃"
              level="high"
              feeRateSatVb={feeStats.fastestFee}
            />
            <FeeRateCard
              title="Minimum for next block 😯🚶"
              level="medium"
              feeRateSatVb={Math.round(feeStats.minimumNextBlock * 100) / 100}
            />
            <FeeRateCard
              title="Next hour ☕🧉"
              level="low"
              feeRateSatVb={feeStats.hourFee}
            />
          </div>
          {feesLastFetchedAt && (
            <small className="text-center text-slate-500">
              {`(last updated ${dateFns.formatDistance(feesLastFetchedAt, new Date())} ago)`}
            </small>
          )}
        </>
      ) : (
        <div className="text-center p-6 border w-full bg-slate-0">
          (No fees obtained)
        </div>
      )}
    </div>
  );
}
