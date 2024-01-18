import React, { createContext, useContext } from 'react';
import { ExchangeRates, FeesStats, Theme } from './types';

export interface IAppState {
  theme: Theme;
  feeStats?: FeesStats;
  feesLastFetchedAt?: Date;
  exRates?: ExchangeRates;
  exRatesLastFetchedAt?: Date;
  selectedCurrency?: string;
}

export const initialState: IAppState = {
  theme: Theme.light,
  feeStats: undefined,
  feesLastFetchedAt: undefined,
};

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

//#region ------ Reducers ------

export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  SET_FEES_STATS = 'SET_FEES_STATS',
  SET_EX_RATES = 'SET_EX_RATES',
  SET_SELECTED_CURRENCY = 'SET_SELECTED_CURRENCY',
}
export type IAction = {
  type: ActionType;
  theme?: Theme;
  fees?: FeesStats;
  exRates?: ExchangeRates;
  selectedCurrency?: string;
};
export function appReducer(prevState: IAppState, action: IAction): IAppState {
  console.debug(`appReducer called: ${action.type}`);

  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return {
        ...prevState,
        theme: action.theme ?? Theme.light,
      };
    case ActionType.SET_FEES_STATS:
      return {
        ...prevState,
        feeStats: action.fees,
        feesLastFetchedAt: new Date(),
      };
    case ActionType.SET_EX_RATES:
      return {
        ...prevState,
        exRates: action.exRates,
        exRatesLastFetchedAt: new Date(),
      };
    case ActionType.SET_SELECTED_CURRENCY:
      return {
        ...prevState,
        selectedCurrency: action.selectedCurrency,
      };
    default:
      throw Error(`App reducer - Unknown action: ${action.type}`);
  }
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
