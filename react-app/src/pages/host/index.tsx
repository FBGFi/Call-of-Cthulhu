import React, { useReducer, useContext } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { GameHostActions } from '../../actions';
import InfoBox from '../../components/InfoBox';
import { AppContext } from '../../reducers';
import { GameHostContext, InitialGameHostState, gameHostReducer } from '../../reducers/GameHostReducer';
import './HostPage.css';
import HostView from './HostView';
import PlayerCharacterSheet from './HostView/PlayerCharacterSheet';

const HostPage: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);
    const [gameHostState, gameHostDispatch] = useReducer(gameHostReducer, InitialGameHostState);
    const location = useLocation();
    
    const setGameInformation = (e: React.FocusEvent<HTMLInputElement>, key: "SET_PORT" | "SET_ROOM_CODE") => {
        gameHostDispatch({ type: GameHostActions[key], value: e.target.value });
    }

    const startGame = (): string => {
        if (gameHostState.PORT > 0 && gameHostState.PORT <= 65535 && gameHostState.ROOM_CODE !== "") {
            return "/host/game";
        }
        return "/host";
    }

    return (
        <div className={'HostPage ' + location.pathname}>
            <GameHostContext.Provider value={{ state: gameHostState, dispatch: gameHostDispatch }}>

                <Route path="/host" exact>
                    <InfoBox title='Call of Cthulhu' className="host-page-settings">
                        <div className="inner-container">
                            <label htmlFor="port">Port Number:</label>
                            <input
                                defaultValue={gameHostState.PORT > 0 && gameHostState.PORT <= 65535 ? gameHostState.PORT : undefined}
                                onBlur={(e) => setGameInformation(e, "SET_PORT")}
                                type="number"
                                name="port" />
                            <label htmlFor="room-code">Room Code:</label>
                            <input defaultValue={gameHostState.ROOM_CODE} onBlur={(e) => setGameInformation(e, "SET_ROOM_CODE")} type="text" name="room-code" />
                            <Link to={startGame}>
                                <button>Start</button>
                            </Link>
                        </div>
                    </InfoBox>
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