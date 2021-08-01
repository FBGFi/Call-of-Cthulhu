import React, { useReducer } from 'react';
import './App.css';
import Footer from './components/Footer';

import SheetPageOne from './pages/player/SheetPageOne';
import SheetPageTwo from './pages/player/SheetPageTwo';

import { appReducer, InitialState, AppContext } from './reducers';
import { playerReducer, InitialPlayerState, PlayerContext } from './reducers/PlayerReducer';
import { weaponsAndGearReducer, InitialWeaponsAndGearState, WeaponsAndGearContext } from './reducers/WeaponsAndGearReducer';

const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(appReducer, InitialState);
  const [playerState, playerDispatch] = useReducer(playerReducer, InitialPlayerState);
  const [weaponsAndGearState, weaponsAndGearDispatch] = useReducer(weaponsAndGearReducer, InitialWeaponsAndGearState);

  return (
    <div className="App">
      <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
        <PlayerContext.Provider value={{ state: playerState, dispatch: playerDispatch }}>
          <WeaponsAndGearContext.Provider value={{ state: weaponsAndGearState, dispatch: weaponsAndGearDispatch }}>
            <SheetPageOne />
            <SheetPageTwo />
            <Footer />
          </WeaponsAndGearContext.Provider>
        </PlayerContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
