import { FeesRecommended } from '../types';

const MEMPOO_API_BASE_URL = 'https://mempool.space/api/v1';

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

export async function getRecommendedFees(): Promise<FeesRecommended> {
  console.log('Getting the fees...');
  const fees = await apiGet<FeesRecommended>('/fees/recommended');
  return fees;
}
