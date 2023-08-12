import React, { useReducer } from 'react';
import { Route, useLocation } from 'react-router-dom';
//import { AppContext } from '../../reducers';
import { GameHostContext, InitialGameHostState, gameHostReducer } from '../../reducers/GameHostReducer';
import './HostPage.css';
import HostView from './HostView';
import HostPageSettings from './HostView/HostPageSettings';
import PlayerCharacterSheet from './HostView/PlayerCharacterSheet';

const HostPage: React.FC = () => {
    //const { state, dispatch } = useContext(AppContext);
    const [gameHostState, gameHostDispatch] = useReducer(gameHostReducer, InitialGameHostState);
    const location = useLocation(); 

    return (
        <div className={'HostPage ' + location.pathname}>
            <GameHostContext.Provider value={{ state: gameHostState, dispatch: gameHostDispatch }}>

                <Route path="/host" exact>
                    <HostPageSettings />
                </Route>

                <Route path="/host/game" exact>
                    <HostView />
                </Route>

                <Route path="/host/game/:playerId">
                    <PlayerCharacterSheet />
                </Route>
            </GameHostContext.Provider>
        </div>
    );
}

export default HostPage;