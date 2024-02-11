import APIClient from '../APIClient';
import { YADIO_API_BASE_URL } from '../constants';
import { ExchangeRates } from '../types';

interface ExRatesCurrency {
  // we define the interface this way because we'll be fetching ex rates for BTC
  BTC: {
    [currency: string]: number;
  };
  base: string;
  timestamp: number;
}

const apiClient = new APIClient(YADIO_API_BASE_URL);

const fiatNumberFormatter = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export async function getExchangeRates(): Promise<ExchangeRates> {
  console.debug('Getting the exchange rates...');
  // we get exrates against BTC (hardcoded)
  const rates = await apiClient.get<ExRatesCurrency>('/exrates/BTC');
  console.debug('Fetched the exchange rates.');

  return rates.BTC;
}

export function convertToCurrencyAndFormat(
  sats: number,
  exRates?: ExchangeRates,
  selectedCurrency?: string,
) {
  let amount = sats;
  let costFormatted = amount?.toFixed(2);
  if (exRates) {
    amount = (sats ?? 0) * exRates[selectedCurrency ?? 'BTC'];

    if (selectedCurrency == 'BTC') {
      // if BTC display in sats
      costFormatted = amount.toString();
      costFormatted += ` sats`;
    } else {
      // now divide to convert sats to BTC
      amount = amount / 100000000;
      costFormatted = fiatNumberFormatter.format(amount);
      costFormatted += ` ${selectedCurrency}`;
    }
  }

  return costFormatted;
}
