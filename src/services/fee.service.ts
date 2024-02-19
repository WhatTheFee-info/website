import APIClient from '../APIClient';
import config from '../config';
import { FeesStats, TxTemplate } from '../types';

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

const apiClient = new APIClient(config.fees.mempoolBaseUrl);

export async function getFeeStats(): Promise<FeesStats> {
  console.log('Getting the fees...');
  const recommendedFees =
    await apiClient.get<FeesRecommended>('/fees/recommended');
  const mempoolBlockFees = await apiClient.get<FeesMempoolBlock[]>(
    '/fees/mempool-blocks',
  );
  console.debug('Fetched the fees.');
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

export function calculateTxCostPerFeeRate(
  template: TxTemplate,
  feeStats?: FeesStats,
  customFeeRate?: number,
) {
  let costSats = {
    economy: 0,
    minimum: 0,
    hour: 0,
    halfHour: 0,
    fastest: 0,
    medianNextBlock: 0,
    minimumNextBlock: 0,
    custom: 0,
  };

  if (template.sizeVB) {
    costSats = {
      economy: Math.ceil(template.sizeVB * (feeStats?.economy ?? 0)),
      minimum: Math.ceil(template.sizeVB * (feeStats?.minimum ?? 0)),
      hour: Math.ceil(template.sizeVB * (feeStats?.hour ?? 0)),
      halfHour: Math.ceil(template.sizeVB * (feeStats?.halfHour ?? 0)),
      fastest: Math.ceil(template.sizeVB * (feeStats?.fastest ?? 0)),
      medianNextBlock: Math.ceil(
        template.sizeVB * (feeStats?.medianNextBlock ?? 0),
      ),
      minimumNextBlock: Math.ceil(
        template.sizeVB * (feeStats?.minimumNextBlock ?? 0),
      ),
      custom: Math.ceil(template.sizeVB * (customFeeRate ?? 0)),
    };
  }

  return costSats;
}

export function calculateSatsForFeePercent(
  txCostStats: number,
  percentMax: number,
) {
  let minSatsToSpend = (txCostStats ?? 0) / percentMax;
  minSatsToSpend = Math.ceil(minSatsToSpend);

  return minSatsToSpend;
}
