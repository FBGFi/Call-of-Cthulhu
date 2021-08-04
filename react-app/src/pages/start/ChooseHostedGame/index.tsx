import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { HostedGameActions } from '../../../actions';
import InfoBox from '../../../components/InfoBox';
import LoadingScreen from '../../../components/LoadingScreen';
import { HostedGameContext } from '../../../reducers/HostedGameReducer';
import SavedCharacters from '../SavedCharacters';
import './ChooseHostedGame.css';

const ChooseHostedGame: React.FC = () => {
    const { state, dispatch } = useContext(HostedGameContext);
    const [connectionSuccesful, isConnectionSuccessful] = useState(false);

    const setSavedCharacterName = (id: string, type: 'set' | 'remove') => {
        if (id !== "None") {
            dispatch({ type: HostedGameActions.SET_PLAYER_ID, value: id });
        } else {
            dispatch({ type: HostedGameActions.SET_PLAYER_ID, value: "" });
        }
    }

    const setSessionInformation = (e: React.FocusEvent<HTMLInputElement>, action: 'SET_ROOM_CODE' | 'SET_SOCKET_ADDRESS' | 'SET_PLAYER_NAME') => {
        dispatch({ type: HostedGameActions[action], value: e.target.value });
    }

    useEffect(() => {
        if (state.SOCKET) {
            state.SOCKET.once('player-verified', () => {
                if (state.SOCKET && !state.VERIFIED) {
                    dispatch({ type: HostedGameActions.SET_VERIFIED });
                    isConnectionSuccessful(true);
                }
            });
            state.SOCKET.on("connect_error", () => {
                window.alert("Error connecting to the host");
                dispatch({ type: HostedGameActions.DISCONNECT_FROM_HOST });
            });
            state.SOCKET.on('incorrect-room-code', () => {
                window.alert('Incorrect room code!');
                dispatch({ type: HostedGameActions.DISCONNECT_FROM_HOST });
            });
            state.SOCKET.on('room-not-started', () => {
                window.alert('Room not started yet!');
                dispatch({ type: HostedGameActions.DISCONNECT_FROM_HOST });
            });
        }
    }, [state.SOCKET]);

    if (connectionSuccesful) {
        return <Redirect to={'/hosted/game/' + state.PLAYER_ID} />
    }

    if (state.SOCKET) {
        return (<LoadingScreen />);
    }
    return (
        <InfoBox title='Call of Cthulhu' className='start-container'>
            <div className='ChooseHostedGame'>
                <span>Room address and port</span>
                <input defaultValue={state.SOCKET_ADDRESS} onBlur={(e) => setSessionInformation(e, 'SET_SOCKET_ADDRESS')} type="text" />
                <span>Room code</span>
                <input defaultValue={state.ROOM_CODE} onBlur={(e) => setSessionInformation(e, 'SET_ROOM_CODE')} type="text" />
                <span>Player Name</span>
                <input defaultValue={state.PLAYER_NAME} onBlur={(e) => setSessionInformation(e, 'SET_PLAYER_NAME')} type="text" />
                <SavedCharacters onChange={setSavedCharacterName} hostedGame={true} />
                <button onClick={() => { dispatch({ type: HostedGameActions.CONNECT_TO_HOST }) }}>Join Game</button>
            </div >
        </InfoBox>
    );
}

export default ChooseHostedGame;