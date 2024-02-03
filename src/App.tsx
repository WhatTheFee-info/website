import { useEffect } from 'react';
import {
  ActionType,
  AppContext,
  AppDispatchContext,
  appReducer,
  getInitialState,
  useAsyncReducer,
} from './AppContext';
import FeeRatePanel from './ui/components/FeeRatePanel';
import TxTemplatesGrid from './ui/components/TxTemplatesGrid';
import './App.css';
import SiteHeader from './ui/components/SiteHeader';

function App() {
  const [state, dispatch] = useAsyncReducer(appReducer, getInitialState());

  useEffect(() => {
    dispatch({
      type: ActionType.FETCH_FEE_RATES,
    });
    dispatch({
      type: ActionType.FETCH_EX_RATES,
    });
  }, []);

  return (
    <>
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <SiteHeader />
          <main className="relative pt-20 px-2 md:px-0">
            <section id="fee-rates" className="mb-8">
              <h2 className="text-2xl font-bold">
                Current fees of the Bitcoin network
              </h2>
              <FeeRatePanel />
            </section>

            <section id="tx-templates" className="mb-8">
              <TxTemplatesGrid />
            </section>
          </main>
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
