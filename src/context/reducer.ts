import { useState } from 'react';
import { ExchangeRates, FeesStats, Theme } from '../types';
import { TxTemplateCardMode } from '../ui/components/TxTemplate/types';
import {
  IAppState,
  StateLoadingStatus,
  StateStatus,
  getInitialState,
  persistState,
} from './state';
import * as feeService from '../services/fee.service';
import * as exchangeRateService from '../services/exchangeRate.service';
import config from '../config';

export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  CHANGE_TXTEMPLATE_CARD_MODE = 'CHANGE_TXTEMPLATE_CARD_MODE',
  FETCH_FEE_RATES = 'FETCH_FEE_RATES',
  FETCH_EX_RATES = 'FETCH_EX_RATES',
  SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY',
  SET_SELECTED_FEERATE = 'SET_SELECTED_FEERATE',
}
export type IAction = {
  type: ActionType;
  theme?: Theme;
  txTemplatesCardMode?: TxTemplateCardMode;
  fees?: FeesStats;
  exRates?: ExchangeRates;
  selectedCurrency?: string;
  selectedFeeRate?: string;
};

export async function appReducer(
  prevState: IAppState,
  action: IAction,
): Promise<IAppState> {
  let updatedState = prevState;

  switch (action.type) {
    case ActionType.CHANGE_THEME:
      updatedState = {
        ...prevState,
        theme: action.theme ?? Theme.light,
      };
      break;
    case ActionType.CHANGE_TXTEMPLATE_CARD_MODE:
      updatedState = {
        ...prevState,
        txTemplatesCardMode:
          action.txTemplatesCardMode ?? TxTemplateCardMode.row,
      };
      break;
    case ActionType.FETCH_FEE_RATES:
      // avoid calling if already in progress
      if (StateStatus.feeStatsStatus != StateLoadingStatus.IN_PROGRESS) {
        StateStatus.feeStatsStatus = StateLoadingStatus.IN_PROGRESS;
        const feeStats = await fetchFeesStats(prevState);
        if (feeStats) {
          updatedState = {
            ...prevState,
            feeStats: feeStats,
            feesLastFetchedAt: new Date(),
          };
          StateStatus.feeStatsStatus = StateLoadingStatus.DONE;
        }
      }
      break;
    case ActionType.FETCH_EX_RATES:
      // avoid calling if already in progress
      if (StateStatus.exRatesStatsStatus != StateLoadingStatus.IN_PROGRESS) {
        StateStatus.exRatesStatsStatus = StateLoadingStatus.IN_PROGRESS;
        const exRates = await fetchExchangeRates(prevState);
        if (exRates) {
          updatedState = {
            ...prevState,
            exRates: exRates,
            exRatesLastFetchedAt: new Date(),
          };
          StateStatus.exRatesStatsStatus = StateLoadingStatus.DONE;
        }
      }
      break;
    case ActionType.SET_SELECTED_CURRENCY:
      updatedState = {
        ...prevState,
        selectedCurrency: action.selectedCurrency,
      };
      break;
    case ActionType.SET_SELECTED_FEERATE:
      updatedState = {
        ...prevState,
        selectedFeeRate: action.selectedFeeRate as IAppState['selectedFeeRate'],
      };
      break;
    default:
      throw Error(`App reducer - Unknown action: ${action.type}`);
  }

  // save into storage (only selected properties)
  persistState(updatedState);

  return updatedState;
}

export function useAsyncReducer(
  reducer: typeof appReducer,
  initState: IAppState = getInitialState(),
): [IAppState, (action: IAction) => Promise<void>] {
  const [state, setState] = useState(initState);

  const dispatch = async (action: IAction) => {
    const result = reducer(state, action);
    try {
      const newState = await result;
      setState(newState);
    } catch (err) {
      console.error(err, 'Error running reducer on async dispatch.');
      // setState({ ...state, error: err });
    }
  };

  return [state, dispatch];
}

function fetchFeesStats(state: IAppState) {
  // only fetch if not fetched fro FEES_FETCH_INTERVAL_SEC seconds
  if (state.feeStats && state.feesLastFetchedAt) {
    const secondsFromLastFetch =
      (new Date().getTime() - state.feesLastFetchedAt.getTime()) / 1000;
    if (secondsFromLastFetch < config.fees.fetchInterval) {
      console.debug(
        `Already fetched fees ${secondsFromLastFetch} seconds ago.`,
      );
      return undefined;
    }
  }

  // load the recommended fees from API
  return feeService.getFeeStats();
}

function fetchExchangeRates(state: IAppState) {
  // only fetch if not fetched fro EXRATES_FETCH_INTERVAL_SEC seconds
  if (state.exRates && state.exRatesLastFetchedAt) {
    const secondsFromLastFetch =
      (new Date().getTime() - state.exRatesLastFetchedAt.getTime()) / 1000;
    if (secondsFromLastFetch < config.exRates.fetchInterval) {
      console.debug(
        `Already fetched exchange rates ${secondsFromLastFetch} seconds ago.`,
      );
      return undefined;
    }
  }

  // load the recommended fees
  return exchangeRateService.getExchangeRates();
}
