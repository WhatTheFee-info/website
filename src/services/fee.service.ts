import APIClient from '../APIClient';
import { FeesStats } from '../types';

const MEMPOO_API_BASE_URL = 'https://mempool.space/api/v1';

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

const apiClient = new APIClient(MEMPOO_API_BASE_URL);

export async function getFeeStats(): Promise<FeesStats> {
  console.log('Getting the fees...');
  const recommendedFees =
    await apiClient.get<FeesRecommended>('/fees/recommended');
  const mempoolBlockFees = await apiClient.get<FeesMempoolBlock[]>(
    '/fees/mempool-blocks',
  );
  return {
    ...recommendedFees,
    medianNextBlock: mempoolBlockFees[0].medianFee,
  };
}
