import { useEffect, useReducer } from 'react';
import {
  ActionType,
  AppContext,
  AppDispatchContext,
  appReducer,
  initialState,
} from './AppContext';
import FeeRatePanel from './ui/components/FeeRatePanel';
import TxTemplatesGrid from './ui/components/TxTemplatesGrid';
import './App.css';
import { getFeeStats } from './services/fee.service';
import { FEES_FETCH_INTERVAL_SEC } from './constants';
import ThemeSwitch from './ui/components/ThemeSwitch';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function fetchFeesStats() {
    // only fetch if not fetched fro FEES_FETCH_INTERVAL_SEC seconds
    if (state.feeStats && state.feesLastFetchedAt) {
      const secondsFromLastFetch =
        (new Date().getTime() - state.feesLastFetchedAt.getTime()) / 1000;
      if (secondsFromLastFetch < FEES_FETCH_INTERVAL_SEC) {
        console.debug(
          `Already fetched fees ${secondsFromLastFetch} seconds ago.`,
        );
        return;
      }
    }

    // load the recommended fees
    getFeeStats()
      .then((feeStats) => {
        dispatch({
          type: ActionType.SET_FEES_STATS,
          fees: feeStats,
        });
      })
      .catch((error) => {
        console.error('Error getting fees stats', error);
      });
  }

  useEffect(() => {
    fetchFeesStats();
  }, []);

  return (
    <>
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <div className="container mx-auto">
            <ThemeSwitch />
            <section className="text-center mb-8">
              <h1 className="">WhatTheFee.info</h1>
              <p>Check how much your transaction will cost</p>
            </section>

            <section id="fee-rates" className="mb-8">
              <FeeRatePanel />
            </section>

            <section id="tx-templates" className="mb-8">
              <h2 className="text-2xl font-bold">Transaction templates</h2>
              <TxTemplatesGrid />
            </section>
          </div>
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
