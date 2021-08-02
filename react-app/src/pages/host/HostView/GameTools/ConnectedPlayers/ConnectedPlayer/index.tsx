import React, { useContext } from 'react';
import { GameHostActions } from '../../../../../../actions';
import { GameHostContext } from '../../../../../../reducers/GameHostReducer';
import './ConnectedPlayer.css';

type ConnectedPlayerProps = {
    player: string;
    character: string;
    playerId: string;
}

const ConnectedPlayer: React.FC<ConnectedPlayerProps> = (props) => {
    const { state, dispatch } = useContext(GameHostContext);

    const kickPlayer = () => {
        let time = Date.now();

        // For some reason it was pushing it twice if done in reducer, so do it this way...
        let messages = state.CHAT_MESSAGES;
        messages.push({
            message: `${props.player} was kicked by Host`,
            sender: "Host",
            timeStamp: time,
            type: 'alert'
        });
        if (messages.length > 30) {
            messages.shift();
        }
        dispatch({ type: GameHostActions.REMOVE_PLAYER_DATA, value: props.playerId });
        dispatch({ type: GameHostActions.SET_CHAT_MESSAGES, value: messages });
    }

    return (
        <div className='ConnectedPlayer'>
            <span><b>Player:</b> {props.player}<br /><b>Character:</b> {props.character}</span>
            <button onClick={kickPlayer}>Kick</button>
        </div>
    );
}

export default ConnectedPlayer;