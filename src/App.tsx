import { useEffect, useReducer } from 'react';
import {
  ActionType,
  AppContext,
  AppDispatchContext,
  feeReducer,
  initialState,
} from './AppContext';
import FeeRatePanel from './ui/components/FeeRatePanel';
import TxTemplatesTable from './ui/components/TxTemplatesTable';
import './App.css';
import { getRecommendedFees } from './services/fee.service';

function App() {
  const [state, dispatch] = useReducer(feeReducer, initialState);

  useEffect(() => {
    // load the recommended fees
    getRecommendedFees()
      .then((recommendedFees) => {
        dispatch({
          type: ActionType.SET_FEES,
          fees: recommendedFees,
        });
      })
      .catch((error) => {
        console.error('Error getting fees', error);
      });
  }, []);

  return (
    <>
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <div className="container mx-auto">
            <section className="text-center mb-8">
              <h1 className="">WhatTheFee.info</h1>
              <p>Check how much your transaction will cost</p>
            </section>

            <section id="fee-rates" className="mb-8">
              <FeeRatePanel />
            </section>

            <section id="tx-templates" className="mb-8">
              <h2 className="text-2xl font-bold">Transaction templates</h2>
              <TxTemplatesTable />
            </section>
          </div>
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
