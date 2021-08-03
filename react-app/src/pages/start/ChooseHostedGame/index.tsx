import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HostedGameActions } from '../../../actions';
import { HostedGameContext } from '../../../reducers/HostedGameReducer';
import SavedCharacters from '../SavedCharacters';
import './ChooseHostedGame.css';

const ChooseHostedGame: React.FC = () => {
    const { state, dispatch } = useContext(HostedGameContext);

    const setSavedCharacterName = (id: string, type: 'set'|'remove') => {
        if(id !== "None"){
            dispatch({ type: HostedGameActions.SET_PLAYER_ID, value: id });  
        } else {
            dispatch({ type: HostedGameActions.SET_PLAYER_ID, value: "" });  
        }
    }

    const setSessionInformation = (e: React.FocusEvent<HTMLInputElement>, action: 'SET_ROOM_CODE' | 'SET_SOCKET_ADDRESS' | 'SET_PLAYER_NAME') => {
        dispatch({ type: HostedGameActions[action], value: e.target.value });
    }

    return (
        <div className='ChooseHostedGame'>
            <span>Room address and port</span>
            <input onBlur={(e) => setSessionInformation(e, 'SET_SOCKET_ADDRESS')} type="text" />
            <span>Room code</span>
            <input onBlur={(e) => setSessionInformation(e, 'SET_ROOM_CODE')} type="text" />
            <span>Player Name</span>
            <input onBlur={(e) => setSessionInformation(e, 'SET_PLAYER_NAME')} type="text" />
            <SavedCharacters onChange={setSavedCharacterName} hostedGame={true} />
            <Link to={state.SOCKET_ADDRESS !== "" && state.ROOM_CODE !== "" && state.PLAYER_NAME !== "" ? '/hosted/game/' + state.PLAYER_ID : '/hosted'}>
                <button onClick={() => { dispatch({ type: HostedGameActions.CONNECT_TO_HOST }) }}>Join Game</button>
            </Link>
        </div >
    );
}

export default ChooseHostedGame;