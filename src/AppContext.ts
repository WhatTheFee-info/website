import React, { createContext, useContext, useState } from 'react';
import { ExchangeRates, FeesStats, Theme } from './types';
import {
  EXRATES_FETCH_INTERVAL_SEC,
  FEES_FETCH_INTERVAL_SEC,
} from './constants';
import * as feeService from './services/fee.service';
import * as exchangeRateService from './services/exchangeRate.service';

export interface IAppState {
  theme: Theme;
  feeStats?: FeesStats;
  feesLastFetchedAt?: Date;
  exRates?: ExchangeRates;
  exRatesLastFetchedAt?: Date;
  selectedCurrency?: string;
  selectedFeeRate: 'medianNextBlock' | 'minimumNextBlock' | 'hour';
}

export const initialState: IAppState = {
  theme: Theme.light,
  feeStats: undefined,
  feesLastFetchedAt: undefined,
  exRates: { BTC: 1 }, // default to only having BTC
  selectedCurrency: 'BTC', // default to BTC
  selectedFeeRate: 'medianNextBlock',
};

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

//#region ------ Reducers ------

export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  FETCH_FEE_RATES = 'FETCH_FEE_RATES',
  FETCH_EX_RATES = 'FETCH_EX_RATES',
  SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY',
  SET_SELECTED_FEERATE = 'SET_SELECTED_FEERATE',
}
export type IAction = {
  type: ActionType;
  theme?: Theme;
  fees?: FeesStats;
  exRates?: ExchangeRates;
  selectedCurrency?: string;
  selectedFeeRate?: string;
};
export async function appReducer(
  prevState: IAppState,
  action: IAction,
): Promise<IAppState> {
  console.debug(`appReducer called: ${action.type}`);

  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return {
        ...prevState,
        theme: action.theme ?? Theme.light,
      };
    case ActionType.FETCH_FEE_RATES:
      const feeStats = await fetchFeesStats(prevState);
      if (feeStats) {
        return {
          ...prevState,
          feeStats: feeStats,
          feesLastFetchedAt: new Date(),
        };
      } else {
        return prevState;
      }
    case ActionType.FETCH_EX_RATES:
      const exRates = await fetchExchangeRates(prevState);
      if (exRates) {
        return {
          ...prevState,
          exRates: exRates,
          exRatesLastFetchedAt: new Date(),
        };
      } else {
        return prevState;
      }
    case ActionType.SET_SELECTED_CURRENCY:
      return {
        ...prevState,
        selectedCurrency: action.selectedCurrency,
      };
    case ActionType.SET_SELECTED_FEERATE:
      return {
        ...prevState,
        selectedFeeRate: action.selectedFeeRate as IAppState['selectedFeeRate'],
      };
    default:
      throw Error(`App reducer - Unknown action: ${action.type}`);
  }
}

export function useAsyncReducer(
  reducer: typeof appReducer,
  initState: IAppState = initialState,
): [IAppState, (action: IAction) => Promise<void>] {
  const [state, setState] = useState(initState);

  const dispatch = async (action: IAction) => {
    const result = reducer(state, action);
    try {
      const newState = await result;
      setState(newState);
    } catch (err) {
      console.error('Error running reducer on async dispatch.');
      // setState({ ...state, error: err });
    }
  };

  return [state, dispatch];
}

async function fetchFeesStats(state: IAppState) {
  // only fetch if not fetched fro FEES_FETCH_INTERVAL_SEC seconds
  if (state.feeStats && state.feesLastFetchedAt) {
    const secondsFromLastFetch =
      (new Date().getTime() - state.feesLastFetchedAt.getTime()) / 1000;
    if (secondsFromLastFetch < FEES_FETCH_INTERVAL_SEC) {
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
    if (secondsFromLastFetch < EXRATES_FETCH_INTERVAL_SEC) {
      console.debug(
        `Already fetched exchange rates ${secondsFromLastFetch} seconds ago.`,
      );
      return undefined;
    }
  }

  // load the recommended fees
  return exchangeRateService.getExchangeRates();
}

//#endregion ------ Reducers ------

export const AppContext = createContext<IAppState>(initialState);

export const AppDispatchContext = createContext<React.Dispatch<IAction> | null>(
  null,
);

// Define helpful hook to get AppContext state and AppDispatchContext dispatch
export function useAppContext(): {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
} {
  const context = useContext(AppContext);
  const dispatchContext = useContext(AppDispatchContext);
  if (!context || !dispatchContext) {
    throw new Error('context or dispatchContext not defined');
  }
  return { state: context, dispatch: dispatchContext };
}
