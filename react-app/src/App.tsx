import React, { useReducer } from 'react';
import './App.css';
import Footer from './components/Footer';

import SheetPageOne from './pages/player/SheetPageOne';
import SheetPageTwo from './pages/player/SheetPageTwo';

import { appReducer, InitialState, AppContext } from './reducers';
import { playerReducer, InitialPlayerState, PlayerContext } from './reducers/PlayerReducer';

const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(appReducer, InitialState);
  const [playerState, playerDispatch] = useReducer(playerReducer, InitialPlayerState);

  return (
    <div className="App">
      <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
        <PlayerContext.Provider value={{ state: playerState, dispatch: playerDispatch }}>
          <SheetPageOne />
          <SheetPageTwo />
          <Footer />
        </PlayerContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
