import APIClient from '../APIClient';
import { MEMPOOL_API_BASE_URL } from '../constants';
import { FeesStats } from '../types';

interface FeesRecommended {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

interface FeesMempoolBlock {
  blockSize: number;
  blockVSize: number;
  nTx: number;
  totalFees: number;
  medianFee: number;
  feeRange: number[];
}

const apiClient = new APIClient(MEMPOOL_API_BASE_URL);

export async function getFeeStats(): Promise<FeesStats> {
  console.log('Getting the fees...');
  const recommendedFees =
    await apiClient.get<FeesRecommended>('/fees/recommended');
  const mempoolBlockFees = await apiClient.get<FeesMempoolBlock[]>(
    '/fees/mempool-blocks',
  );
  return {
    fastest: recommendedFees.fastestFee,
    economy: recommendedFees.economyFee,
    halfHour: recommendedFees.halfHourFee,
    hour: recommendedFees.hourFee,
    minimum: recommendedFees.minimumFee,
    medianNextBlock: mempoolBlockFees[0].medianFee,
    minimumNextBlock: mempoolBlockFees[0].feeRange[0],
  };
}

export function calculateSatsForFeePercent(
  txCostStats: number,
  percentMax: number,
) {
  let minSatsToSpend = (txCostStats ?? 0) / percentMax;
  minSatsToSpend = Math.ceil(minSatsToSpend);

  return minSatsToSpend;
}
