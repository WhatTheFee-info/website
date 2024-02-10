import { useEffect } from 'react';
import { AppContext, AppDispatchContext } from './context/AppContext';
import { ActionType, appReducer, useAsyncReducer } from './context/reducer';
import { getInitialState } from './context/state';
import FeeRatePanel from './ui/components/FeeRatePanel';
import TxTemplatesGrid from './ui/components/TxTemplate/TxTemplatesGrid';
import './App.css';
import SiteHeader from './ui/components/SiteHeader';
import SiteFooter from './ui/components/SiteFooter';

function App() {
  const [state, dispatch] = useAsyncReducer(appReducer, getInitialState());

  useEffect(() => {
    // fetch data from APIs on start
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
          <main className="container mx-auto ">
            <div className="relative pt-20 px-2 md:px-0">
              <section id="fee-rates" className="mb-8">
                <h2 className="text-2xl font-bold">
                  Current fees of the Bitcoin network
                </h2>
                <FeeRatePanel />
              </section>

              <section id="tx-templates" className="mb-8">
                <TxTemplatesGrid />
              </section>
            </div>
          </main>
          <SiteFooter />
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
