import APIClient from '../APIClient';

const YADIO_API_BASE_URL = 'https://api.yadio.io';

interface ExRatesCurrency {
  // we define the interface this way because we'll be fetching ex rates for BTC
  BTC: {
    [currency: string]: number;
  };
  base: string;
  timestamp: number;
}

const apiClient = new APIClient(YADIO_API_BASE_URL);

export async function getExchangeRates() {
  console.debug('Getting the exchange rates...');
  // we get for BTC (hardcoded)
  const rates = await apiClient.get<ExRatesCurrency>('/exrates/BTC');
  console.debug('Fetched the exchange rates.');

  return rates.BTC;
}
