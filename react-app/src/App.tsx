import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import StartPage from './pages/start';

import Game from './pages/game';

import { appReducer, InitialState, AppContext } from './reducers';

const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(appReducer, InitialState);
  
  // console.log(JSON.parse(window.localStorage.CALL_OF_CTHULHU));
  

  if(window.localStorage.CALL_OF_CTHULHU === undefined) {
    localStorage.setItem('CALL_OF_CTHULHU', '{}');
  } else {
    let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
    // If for some reason something stupid happened
    if(localValues.LOCAL_SAVES && localValues.LOCAL_SAVES[""]){
      delete localValues.LOCAL_SAVES[""];
      localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localValues));
    }
    
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ state: appState, dispatch: appDispatch }}>
        <Router>

          <Switch>
            <Route path={["/local/game/:playerId", "/local/game"]}>
              <Game />
            </Route>
            <Route path="/">
              <StartPage />
            </Route>

          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
