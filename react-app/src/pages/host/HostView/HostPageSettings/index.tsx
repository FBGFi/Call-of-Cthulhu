import React, {useContext, useEffect, useState, useRef,} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { GameHostContext } from '../../../../reducers/GameHostReducer';
import { GameHostActions } from '../../../../actions';
import InfoBox from '../../../../components/InfoBox';
import LoadingScreen from '../../../../components/LoadingScreen';
import './HostPageSettings.css';

const HostPageSettings: React.FC = () => {
    const {state, dispatch} = useContext(GameHostContext);

    const selectionRef = useRef<HTMLSelectElement>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);
    const [connectionSuccesful, isConnectionSuccessful] = useState(false);

    const setGameInformation = (e: React.FocusEvent<HTMLInputElement>, key: "SET_PORT" | "SET_ROOM_CODE") => {
        dispatch({ type: GameHostActions[key], value: e.target.value });
    }

    const checkIfPortSet = (): boolean => {
        return state.PORT > 0 && state.PORT <= 65535;
    }

    const setSavedRoom = () => {
        if (selectedRoom && checkIfPortSet()) {
            dispatch({ type: GameHostActions.SET_ROOM_CODE, value: selectedRoom });
            dispatch({ type: GameHostActions.SET_WEBSOCKET })
        }
    }

    const deleteSavedRoom = () => {
        if (selectionRef.current && selectionRef.current.value !== "") {
            let value = selectionRef.current.value;
            let localSaves = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
            if (localSaves.SAVED_ROOMS[value]) {
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
                        <button onClick={setSavedRoom}>Load Room</button>
                        <button onClick={deleteSavedRoom}>Delete Room</button>
                    </>
                }
            }
        }
        return null;
    }

    useEffect(() => {
        if (state.SOCKET) {
            state.SOCKET.on('connect', () => {
                console.log('Connected');
                isConnectionSuccessful(true);
                if (state.SOCKET) {
                    state.SOCKET.emit('connect-host', state.ROOM_CODE);
                    state.SOCKET.emit('host-send-messages', state.CHAT_MESSAGES);
                }
            });

            state.SOCKET.on("connect_error", () => {
                window.alert("Error connecting to the server");
                dispatch({ type: GameHostActions.DISCONNECT_FROM_SERVER })

            });
        }
    }, [state.SOCKET])
    
    if (connectionSuccesful) {
        return <Redirect to={"/host/game"} />
    }

    if (state.SOCKET && !connectionSuccesful) {
        return (<LoadingScreen />);
    }

    return (
        <InfoBox title='Host a Game' className="HostPageSettings">
            <div className="inner-container">
                <label htmlFor="port">Port Number:</label>
                <input
                    defaultValue={state.PORT > 0 && state.PORT <= 65535 ? state.PORT : undefined}
                    onBlur={(e) => setGameInformation(e, "SET_PORT")}
                    type="number"
                    name="port" />
                <label htmlFor="room-code">Room Code:</label>
                <input defaultValue={state.ROOM_CODE} onBlur={(e) => setGameInformation(e, "SET_ROOM_CODE")} type="text" name="room-code" />

                <button onClick={() => dispatch({ type: GameHostActions.SET_WEBSOCKET })}>Start</button>
                {getSavedRooms()}
                <Link to='/'>
                    <button>Back</button>
                </Link>
            </div>
        </InfoBox>
    );
}

export default HostPageSettings;