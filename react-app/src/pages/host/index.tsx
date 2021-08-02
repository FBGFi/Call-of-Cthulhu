import React, { useReducer, useContext, useState, useRef } from 'react';
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
    const selectionRef = useRef<HTMLSelectElement>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
    const [gameHostState, gameHostDispatch] = useReducer(gameHostReducer, InitialGameHostState);
    const location = useLocation();

    const setGameInformation = (e: React.FocusEvent<HTMLInputElement>, key: "SET_PORT" | "SET_ROOM_CODE") => {
        gameHostDispatch({ type: GameHostActions[key], value: e.target.value });
    }

    const checkIfPortSet = (): boolean => {
        return gameHostState.PORT > 0 && gameHostState.PORT <= 65535;
    }

    const startGame = (): string => {
        if (checkIfPortSet() && gameHostState.ROOM_CODE !== "") {
            return "/host/game";
        }
        return "/host";
    }

    const setSavedRoom = () => {
        if(selectedRoom){
            gameHostDispatch({ type: GameHostActions.SET_ROOM_CODE, value: selectedRoom });
        }
    }

    const deleteSavedRoom = () => {
        if(selectionRef.current && selectionRef.current.value !== ""){
            let value = selectionRef.current.value;
            let localSaves = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
            if(localSaves.SAVED_ROOMS[value]){
                delete localSaves.SAVED_ROOMS[value];
                localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localSaves));  
                setSelectedRoom(undefined);            
            }                  
        }
    }

    const getSavedRooms = (): JSX.Element | null => {
        let options: JSX.Element[] = [];
        let localSaves = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
        if (localSaves) {
            if (localSaves.SAVED_ROOMS) {
                for (let roomId in localSaves.SAVED_ROOMS) {
                    options.push(<option key={roomId} value={roomId}>{roomId}</option>);
                }
                if (options.length > 0) {
                    options.unshift(<option style={{ display: "none" }} key="" value=""></option>);
                    return <>
                        <span>Saved Rooms:</span>
                        <select ref={selectionRef} onChange={(e) => setSelectedRoom(e.target.value)}>
                            {options}
                        </select>
                        <Link to={selectedRoom && checkIfPortSet() ? '/host/game' : '/host'}>
                            <button onClick={setSavedRoom}>Load Room</button>
                        </Link>
                        <button onClick={deleteSavedRoom}>Delete Room</button>
                    </>
                }
            }
        }
        return null;
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
                            {getSavedRooms()}
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