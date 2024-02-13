import { useEffect } from 'react';
import { AppContext, AppDispatchContext } from './context/AppContext';
import { ActionType, appReducer, useAsyncReducer } from './context/reducer';
import { getInitialState } from './context/state';
import './App.css';
import SiteHeader from './ui/components/SiteHeader';
import SiteFooter from './ui/components/SiteFooter';
import { Outlet } from 'react-router-dom';
import wtfeeAudio from './assets/wtfee.mp3';

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
          <main className="container mx-auto pt-20">
            <div className="relative px-2 md:px-0">
              <Outlet />
            </div>
          </main>
          <SiteFooter />
          <audio id="wtfeeAudio">
            <source src={wtfeeAudio}></source>
          </audio>
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
