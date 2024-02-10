import React, { createContext, useContext } from 'react';
import { IAppState, getInitialState } from './state';
import { IAction } from './reducer';

export interface IAppContext {
  state: IAppState;
  dispatch: React.Dispatch<IAction>;
}

export const AppContext = createContext<IAppState>(getInitialState());

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
