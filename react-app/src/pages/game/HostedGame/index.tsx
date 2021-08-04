import React, { useReducer, useContext, useState, useEffect } from 'react';
import './HostedGame.css';
import { useParams } from 'react-router-dom';
import Footer from '../../../components/Footer';
import { playerReducer, InitialPlayerState, PlayerContext } from '../../../reducers/PlayerReducer';
import { weaponsAndGearReducer, InitialWeaponsAndGearState, WeaponsAndGearContext } from '../../../reducers/WeaponsAndGearReducer';
import { investigatorSkillsReducer, InitialInvestigatorSkillsState, InvestigatorSkillsContext } from '../../../reducers/InvestigatorSkillsReducer';
import { backstoryReducer, InitialBackstoryState, BackstoryContext } from '../../../reducers/BackstoryReducer';
import { fellowInvestigatorsReducer, InitialFellowInvestigatorsState, FellowInvestigatorsContext } from '../../../reducers/FellowInvestigatorsReducer';

import SheetPageOne from '../../player/SheetPageOne';
import SheetPageTwo from '../../player/SheetPageTwo';
import { HostedGameContext } from '../../../reducers/HostedGameReducer';
import { HostedGameActions, PlayerActions } from '../../../actions';
import OpenableContainer from '../../../components/Footer/OpenableContainer';
import GameChat from '../../../components/GameChat';

import chatSVG from '../../../assets/images/chat.svg';

const HostedGame: React.FC = () => {
    const params = useParams() as { playerId: string };

    const [chatClicked, setChatClicked] = useState(0);
    const [newMessages, areNewMessages] = useState(false);
    const { state, dispatch } = useContext(HostedGameContext);
    const [playerState, playerDispatch] = useReducer(playerReducer, InitialPlayerState(params.playerId ? params.playerId : undefined));
    const [weaponsAndGearState, weaponsAndGearDispatch] = useReducer(weaponsAndGearReducer, InitialWeaponsAndGearState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [investigatorSkillsState, investigatorSkillsDispatch] = useReducer(investigatorSkillsReducer, InitialInvestigatorSkillsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [backstoryState, backstoryDispatch] = useReducer(backstoryReducer, InitialBackstoryState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [fellowInvestigatorsState, fellowInvestigatorsDispatch] = useReducer(fellowInvestigatorsReducer, InitialFellowInvestigatorsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));

    const sendMessage = (message: { message: string, sender: string, timeStamp: number, type: 'roll' | 'alert' | 'message' }) => {
        if (state.SOCKET) {
            state.SOCKET.emit('player-send-message', message);
        }
    }

    const getPlayerName = (): string => {
        return playerState.CHARACTER_INFO.PLAYER !== "" ? playerState.CHARACTER_INFO.PLAYER : "Unnamed Player"
    }

    const sendChatMessage = (chatMessage: string) => {
        if (chatMessage !== "") {
            sendMessage({ message: chatMessage, type: 'message', sender: getPlayerName(), timeStamp: Date.now() })
        }
    }

    const sendDiceRollMessage = (result: number) => {
        sendMessage({ message: getPlayerName() + " rolled " + result.toString(), type: 'roll', sender: getPlayerName(), timeStamp: Date.now() })
    }

    // Spaghetti-O, just for re-rendering purposes to scroll the chat
    const chatIconWasClicked = (e: React.FocusEvent<HTMLDivElement>) => {
        setChatClicked(chatClicked + 1);
        areNewMessages(false);
    }

    useEffect(() => {
        if (state.PLAYER_NAME !== "") {
            playerDispatch({ type: PlayerActions.SET_CHARACTER_INFO.PLAYER, value: state.PLAYER_NAME });
        }
        if (state.SOCKET && state.VERIFIED) {
            console.log("Player was verified");

            dispatch({ type: HostedGameActions.SET_VERIFIED });
            state.SOCKET.emit('connect-player', { ...playerState, ...weaponsAndGearState, ...investigatorSkillsState, ...backstoryState, ...fellowInvestigatorsState });
        }
    }, [state.VERIFIED]);

    useEffect(() => {
        dispatch({ type: HostedGameActions.SEND_PLAYER_DATA, value: { ...playerState, ...weaponsAndGearState, ...investigatorSkillsState, ...backstoryState, ...fellowInvestigatorsState } })

    }, [playerState, weaponsAndGearState, investigatorSkillsState, backstoryState, fellowInvestigatorsState]);

    useEffect(() => {
        areNewMessages(true);
    }, [state.CHAT_MESSAGES]);

    useEffect(() => {
        if (state.SOCKET) {
            state.SOCKET.once('player-verified', () => {
                console.log('Verified');
                dispatch({ type: HostedGameActions.SET_VERIFIED });
            });
            state.SOCKET.on('new-messages', data => {
                dispatch({ type: HostedGameActions.SET_CHAT_MESSAGES, value: data });
            });
            state.SOCKET.on('player-was-kicked', () => {

                if (window.confirm("You were kicked by the Host!")) {
                    dispatch({ type: HostedGameActions.DISCONNECT_FROM_HOST });
                    window.location.href = '/#';
                }
            });
        } else {
            dispatch({ type: HostedGameActions.CONNECT_TO_HOST })
        }
    }, [state.SOCKET]);

    return (
        <div className="HostedGame">
            <PlayerContext.Provider value={{ state: playerState, dispatch: playerDispatch }}>
                <WeaponsAndGearContext.Provider value={{ state: weaponsAndGearState, dispatch: weaponsAndGearDispatch }}>
                    <InvestigatorSkillsContext.Provider value={{ state: investigatorSkillsState, dispatch: investigatorSkillsDispatch }}>
                        <SheetPageOne />
                    </InvestigatorSkillsContext.Provider>

                    <FellowInvestigatorsContext.Provider value={{ state: fellowInvestigatorsState, dispatch: fellowInvestigatorsDispatch }}>
                        <BackstoryContext.Provider value={{ state: backstoryState, dispatch: backstoryDispatch }}>
                            <SheetPageTwo />
                        </BackstoryContext.Provider>

                    </FellowInvestigatorsContext.Provider>
                    <Footer diceRollCallback={sendDiceRollMessage}>
                        <OpenableContainer 
                            onFocus={chatIconWasClicked} 
                            onBlur={chatIconWasClicked}
                            imgClass={newMessages ? "new-messages" : undefined}
                            imgSrc={chatSVG} 
                            className="ChatContainer">
                            <GameChat messages={state.CHAT_MESSAGES} sendChatMessage={sendChatMessage} />
                        </OpenableContainer>   
                    </Footer>
                </WeaponsAndGearContext.Provider>
            </PlayerContext.Provider >
        </div>
    );
}

export default HostedGame;