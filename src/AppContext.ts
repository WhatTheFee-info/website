import React, { createContext } from 'react';
import { FeesRecommended } from './types';

export interface IAppState {
  fees?: FeesRecommended;
}

export const initialState: IAppState = {
  fees: undefined,
};

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

//#region ------ Reducers ------

export enum ActionType {
  SET_FEES = 'SET_FEES',
}
export type IAction = {
  type: ActionType;
  fees?: FeesRecommended;
};
export function feeReducer(prevState: IAppState, action: IAction): IAppState {
  console.debug(`feeReducer called: ${action.type}`);

  switch (action.type) {
    case ActionType.SET_FEES:
      return { ...prevState, fees: action.fees };
      break;
    default:
      throw Error(`Fee reducer - Unknown action: ${action.type}`);
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
