import { ExchangeRates, FeesStats, Theme } from '../types';
import { TxTemplateCardMode } from '../ui/components/TxTemplate/types';
import * as storageService from '../services/storage.service';

export interface IAppState {
  theme: Theme;
  txTemplatesCardMode: TxTemplateCardMode;
  feeStats?: FeesStats;
  feesLastFetchedAt?: Date;
  exRates?: ExchangeRates;
  exRatesLastFetchedAt?: Date;
  selectedCurrency?: string;
  selectedFeeRate: 'medianNextBlock' | 'minimumNextBlock' | 'hour' | 'custom';
  customFeeRate: number;
}

enum LocalStorageKeys {
  APP_STATE = 'APP_STATE',
}

export enum StateLoadingStatus {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  FAIL = 'FAIL',
}

function convertToPersistState(state: IAppState) {
  return (({
    theme,
    txTemplatesCardMode,
    feeStats,
    feesLastFetchedAt,
    exRates,
    exRatesLastFetchedAt,
    selectedCurrency,
    selectedFeeRate,
    customFeeRate,
  }) => ({
    theme,
    txTemplatesCardMode,
    feeStats,
    feesLastFetchedAt,
    exRates,
    exRatesLastFetchedAt,
    selectedCurrency,
    selectedFeeRate,
    customFeeRate,
  }))(state);
}

export function persistState(state: IAppState) {
  const stateToPersist = convertToPersistState(state);
  storageService.saveValueObject(LocalStorageKeys.APP_STATE, stateToPersist);
}

const defaultInitialState: IAppState = {
  theme: Theme.light,
  txTemplatesCardMode: TxTemplateCardMode.row,
  feeStats: undefined,
  feesLastFetchedAt: undefined,
  exRates: { BTC: 1 }, // default to only having BTC
  exRatesLastFetchedAt: undefined,
  selectedCurrency: 'BTC', // default to BTC
  selectedFeeRate: 'medianNextBlock',
  customFeeRate: 0,
};
export function getInitialState() {
  const storedState = storageService.getValueObject<object>(
    LocalStorageKeys.APP_STATE,
    ['feesLastFetchedAt', 'exRatesLastFetchedAt'],
  );
  return { ...defaultInitialState, ...storedState };
}

export const StateStatus = {
  exRatesStatsStatus: StateLoadingStatus.IDLE,
  feeStatsStatus: StateLoadingStatus.IDLE,
};
