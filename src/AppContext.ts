import React, { createContext, useContext } from 'react';
import { FeesStats, Themes } from './types';

export interface IAppState {
  feeStats?: FeesStats;
  feesLastFetchedAt?: Date;
  theme: Themes;
}

export const initialState: IAppState = {
  feeStats: undefined,
  feesLastFetchedAt: undefined,
  theme: Themes.light,
};

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

//#region ------ Reducers ------

export enum ActionType {
  SET_FEES_STATS = 'SET_FEES_STATS',
  CHANGE_THEME = 'CHANGE_THEME',
}
export type IAction = {
  type: ActionType;
  fees?: FeesStats;
  theme?: Themes;
};
export function appReducer(prevState: IAppState, action: IAction): IAppState {
  console.debug(`appReducer called: ${action.type}`);

  switch (action.type) {
    case ActionType.SET_FEES_STATS:
      return {
        ...prevState,
        feeStats: action.fees,
        feesLastFetchedAt: new Date(),
      };
    case ActionType.CHANGE_THEME:
      return {
        ...prevState,
        theme: action.theme ?? Themes.light,
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
