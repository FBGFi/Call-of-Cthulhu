import React, { useContext, useEffect } from 'react';
import { GameHostContext } from '../../../reducers/GameHostReducer';
import GameTools from './GameTools';
import './HostView.css';
import PlayerCard from './PlayerCard';
import { GameHostActions } from '../../../actions';
import { TChatMessage } from '../../../components/ChatMessage';

// fucking redux...
var chatMessages: TChatMessage[];
let connectionSuccesful = false;

const HostView: React.FC = () => {
    const { state, dispatch } = useContext(GameHostContext);

    const renderPlayerCards = (): JSX.Element[] => {
        let cards: JSX.Element[] = [];

        for (let id in state.PLAYERS) {
            cards.push(
                <PlayerCard
                    key={id}
                    player={state.PLAYERS[id].CHARACTER_INFO.PLAYER}
                    character={state.PLAYERS[id].CHARACTER_INFO.NAME !== "" ? state.PLAYERS[id].CHARACTER_INFO.NAME : "Unnamed Character"}
                    playerImg={state.PLAYERS[id].CHARACTER_INFO.IMAGE.SRC}
                    playerId={id} />
            );
        }


        return cards;
    }


    useEffect(() => {
        if (!state.SOCKET) {
            dispatch({ type: GameHostActions.SET_WEBSOCKET });
        }
        if (state.SOCKET && !connectionSuccesful) {
            state.SOCKET.once('connect', () => {
                if (!connectionSuccesful) {
                    connectionSuccesful = true;
                    console.log('Connected');
                    if (state.SOCKET) {
                        state.SOCKET.emit('connect-host', state.ROOM_CODE);
                        state.SOCKET.emit('host-send-messages', state.CHAT_MESSAGES);
                    }
                }
            });

            state.SOCKET.once('get-public-ip', (ip) => {
                dispatch({ type: GameHostActions.SET_PUBLIC_IP, value: ip })
            })

            state.SOCKET.on("connect_error", () => {
                window.alert("Error connecting to the server");
                dispatch({ type: GameHostActions.DISCONNECT_FROM_SERVER })

            });
            state.SOCKET.on('player-connected', data => {
                if (data) {
                    dispatch({ type: GameHostActions.SET_PLAYER_DATA, value: data });
                }
            });
            state.SOCKET.on('player-disconnected', data => {
                if (data) {
                    if (data.CHARACTER_ID) {
                        if (state.PLAYERS[data.CHARACTER_ID as string]) {
                            dispatch({ type: GameHostActions.PLAYER_DISCONNECTED, value: data.CHARACTER_ID });
                        }
                    }
                }
            });
            state.SOCKET.on('player-data-update', data => {
                if (data) {
                    console.log("Updating player data");
                    dispatch({ type: GameHostActions.SET_PLAYER_DATA, value: data });
                }
            });
            state.SOCKET.on('new-player-message', message => {
                chatMessages.push(message);
                if (chatMessages.length > 30) {
                    chatMessages.shift();
                }

                dispatch(
                    {
                        type: GameHostActions.SET_CHAT_MESSAGES,
                        value: chatMessages
                    });
            });

        }
    }, []);

    useEffect(() => {
        chatMessages = state.CHAT_MESSAGES;
    }, [state.CHAT_MESSAGES]);

    useEffect(() => {

    }, []);

    return (
        <div className='HostView'>
            <div className="room-info-container">
                <span><b>Room address:</b> {state.PUBLIC_IP_ADDRESS}:{state.PORT}</span>
                <span><b>Room code:</b> {state.ROOM_CODE}</span>
            </div>
            <div className="player-card-container">
                {renderPlayerCards()}
            </div>
            <GameTools />
        </div>
    );
}

export default HostView;