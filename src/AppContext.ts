import React, { createContext } from 'react';
import { FeesStats } from './types';

export interface IAppState {
  feeStats?: FeesStats;
  feesLastFetchedAt?: Date;
}

export const initialState: IAppState = {
  feeStats: undefined,
  feesLastFetchedAt: undefined,
};

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

//#region ------ Reducers ------

export enum ActionType {
  SET_FEES_STATS = 'SET_FEES_STATS',
}
export type IAction = {
  type: ActionType;
  fees?: FeesStats;
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
    default:
      throw Error(`App reducer - Unknown action: ${action.type}`);
  }
}

//#endregion ------ Reducers ------

export const AppContext = createContext<IAppState>(initialState);

export const AppDispatchContext = createContext<React.Dispatch<IAction> | null>(
  null,
);

// const AppProvider: React.FC<{childre: React.ReactNode}> = ({ children }) => {
//   const [state, dispatch] = useReducer(feeReducer, initialState);

//   return (
//     <AppContext.Provider value={{state, dispatch}}>
//       {children}
//     </AppContext.Provider>
//   )
// }

// export { AppContext, AppProvider };
