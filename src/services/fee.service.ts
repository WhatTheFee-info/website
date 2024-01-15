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

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${MEMPOO_API_BASE_URL}${path}`);
  const body = await response.json();
  if (response.status >= 200 && response.status < 300) {
    return body;
  } else {
    const error = new Error(body);
    throw error;
  }
}

export async function getFeeStats(): Promise<FeesStats> {
  console.log('Getting the fees...');
  const recommendedFees = await apiGet<FeesRecommended>('/fees/recommended');
  const mempoolBlockFees =
    await apiGet<FeesMempoolBlock[]>('/fees/mempool-blocks');
  return {
    ...recommendedFees,
    medianNextBlock: mempoolBlockFees[0].medianFee,
  };
}
