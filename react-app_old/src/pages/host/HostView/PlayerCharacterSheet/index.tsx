import React, { useReducer, useContext, useEffect, useState } from 'react';
import './PlayerCharacterSheet.css';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../../../components/Footer';
import { playerReducer, InitialPlayerState, PlayerContext } from '../../../../reducers/PlayerReducer';
import { weaponsAndGearReducer, InitialWeaponsAndGearState, WeaponsAndGearContext } from '../../../../reducers/WeaponsAndGearReducer';
import { investigatorSkillsReducer, InitialInvestigatorSkillsState, InvestigatorSkillsContext } from '../../../../reducers/InvestigatorSkillsReducer';
import { backstoryReducer, InitialBackstoryState, BackstoryContext } from '../../../../reducers/BackstoryReducer';
import { fellowInvestigatorsReducer, InitialFellowInvestigatorsState, FellowInvestigatorsContext } from '../../../../reducers/FellowInvestigatorsReducer';

import SheetPageOne from '../../../player/SheetPageOne';
import SheetPageTwo from '../../../player/SheetPageTwo';
import { GameHostContext } from '../../../../reducers/GameHostReducer';
import OpenableContainer from '../../../../components/Footer/OpenableContainer';

import chatSVG from '../../../../assets/images/chat.svg';
import GameChat from '../../../../components/GameChat';
import { BackstoryActions, FellowInvestigatorsActions, GameHostActions, InvestigatorSkillsActions, PlayerActions, WeaponsAndGearActions } from '../../../../actions';

const PlayerCharacterSheet: React.FC = () => {
    const [chatClicked, setChatClicked] = useState(0);
    const params = useParams() as { playerId: string };
    const [playerState, playerDispatch] = useReducer(playerReducer, InitialPlayerState(params.playerId ? params.playerId : undefined));
    const [weaponsAndGearState, weaponsAndGearDispatch] = useReducer(weaponsAndGearReducer, InitialWeaponsAndGearState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [investigatorSkillsState, investigatorSkillsDispatch] = useReducer(investigatorSkillsReducer, InitialInvestigatorSkillsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [backstoryState, backstoryDispatch] = useReducer(backstoryReducer, InitialBackstoryState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [fellowInvestigatorsState, fellowInvestigatorsDispatch] = useReducer(fellowInvestigatorsReducer, InitialFellowInvestigatorsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));

    const { state, dispatch } = useContext(GameHostContext);

    const sendMessage = (message: { message: string, sender: string, timeStamp: number, type: 'roll' | 'alert' | 'message' }) => {
        // For some reason it was pushing it twice if done in reducer, so do it this way...
        let messages = state.CHAT_MESSAGES;
        messages.push(message);
        if (messages.length > 30) {
            messages.shift();
        }
        dispatch(
            {
                type: GameHostActions.SET_CHAT_MESSAGES,
                value: messages
            });
    }

    const sendChatMessage = (chatMessage: string) => {
        if (chatMessage !== "") {
            sendMessage({ message: chatMessage, type: 'message', sender: 'Host', timeStamp: Date.now() })
        }
    }

    const sendDiceRollMessage = (result: number) => {
        sendMessage({ message: "Host rolled " + result.toString(), type: 'roll', sender: 'Host', timeStamp: Date.now() })
    }

    // Spaghetti-O, just for re-rendering purposes to scroll the chat
    const chatIconWasClicked = (e: React.FocusEvent<HTMLDivElement>) => {
        setChatClicked(chatClicked + 1);
    }

    useEffect(() => {
        console.log("Player did updates");
        if (state.PLAYERS[params.playerId]) {
            
            playerDispatch({ type: PlayerActions.SET_EVERYTHING, value: state.PLAYERS[params.playerId] });
            weaponsAndGearDispatch({ type: WeaponsAndGearActions.SET_EVERYTHING, value: state.PLAYERS[params.playerId] })
            investigatorSkillsDispatch({ type: InvestigatorSkillsActions.SET_EVERYTHING, value: state.PLAYERS[params.playerId] })
            fellowInvestigatorsDispatch({ type: FellowInvestigatorsActions.SET_EVERYTHING, value: state.PLAYERS[params.playerId] })
            backstoryDispatch({ type: BackstoryActions.SET_EVERYTHING, value: state.PLAYERS[params.playerId] })
        }

    }, [state]);

    return (
        <PlayerContext.Provider value={{ state: playerState, dispatch: playerDispatch }}>
            <WeaponsAndGearContext.Provider value={{ state: weaponsAndGearState, dispatch: weaponsAndGearDispatch }}>

                <Link to="/host/game">
                    <button className="back-button">Back to Host view</button>
                </Link>

                <InvestigatorSkillsContext.Provider value={{ state: investigatorSkillsState, dispatch: investigatorSkillsDispatch }}>
                    <SheetPageOne />
                </InvestigatorSkillsContext.Provider>

                <FellowInvestigatorsContext.Provider value={{ state: fellowInvestigatorsState, dispatch: fellowInvestigatorsDispatch }}>
                    <BackstoryContext.Provider value={{ state: backstoryState, dispatch: backstoryDispatch }}>
                        <SheetPageTwo />
                    </BackstoryContext.Provider>

                </FellowInvestigatorsContext.Provider>

                <Footer diceRollCallback={sendDiceRollMessage}>
                    <OpenableContainer onFocus={chatIconWasClicked} imgSrc={chatSVG} className="ChatContainer">
                        <GameChat messages={state.CHAT_MESSAGES} sendChatMessage={sendChatMessage} />
                    </OpenableContainer>
                </Footer>
            </WeaponsAndGearContext.Provider>
        </PlayerContext.Provider >
    );
}

export default PlayerCharacterSheet;