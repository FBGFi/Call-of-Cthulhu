import React, { createContext } from 'react';
import { GameHostActions } from '../../actions';
import { TBackstoryState } from '../BackstoryReducer';
import { TWeaponsAndGearState } from '../WeaponsAndGearReducer';
import { TFellowInvestigatorsState } from '../FellowInvestigatorsReducer';
import { TInvestigatorSkillsState } from '../InvestigatorSkillsReducer';
import { TPlayerState } from '../PlayerReducer';
import { TChatMessage } from '../../components/ChatMessage';

type TAction = {
    type: string;
    value: any;
}

type TPlayers = {
    [ID: string]: TBackstoryState & TWeaponsAndGearState & TPlayerState & TInvestigatorSkillsState & TFellowInvestigatorsState
}

type TGameHostState = {
    ROOM_CODE: string;
    PORT: number;
    PLAYERS: TPlayers;
    CHAT_MESSAGES: TChatMessage[]
}

const removeThisAfterTesting = (): TPlayers => {
    let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
    if (localValues.LOCAL_SAVES) {
        return localValues.LOCAL_SAVES;
    }
    return {};
}

const getRecentRoomCode = (): string => {
    let code = document.cookie.split('CALL_OF_CTHULHU_RECENT_ROOM=');
    if (code.length === 2) {
        return code[1];
    }
    return "";
}

const getSavedChatMessages = (roomCode: string): TChatMessage[] => {
    let messages: TChatMessage[] = [];
    if (roomCode !== "") {
        let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
        if (localValues.SAVED_ROOMS && localValues.SAVED_ROOMS[roomCode]) {
            messages = localValues.SAVED_ROOMS[roomCode].CHAT_MESSAGES;
        }
    }
    return messages;
}

const InitialGameHostState: TGameHostState = {
    ROOM_CODE: getRecentRoomCode(),
    PORT: 0,
    PLAYERS: removeThisAfterTesting(),
    CHAT_MESSAGES: getSavedChatMessages(getRecentRoomCode())
}

function gameHostReducer(state: TGameHostState, action: TAction): TGameHostState {
    switch (action.type) {
        case GameHostActions.SET_ROOM_CODE:
            state.ROOM_CODE = action.value;
            document.cookie = `CALL_OF_CTHULHU_RECENT_ROOM=${action.value}`;
            break;
        case GameHostActions.SET_PORT:
            if (!isNaN(parseInt(action.value))) {
                state.PORT = parseInt(action.value);
            }
            break;
        case GameHostActions.SET_PLAYER_DATA:
            if (action.value.CHARACTER_ID) {
                state.PLAYERS[action.value.CHARACTER_ID] = action.value;
                let savedCharacters = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
                if (savedCharacters.LOCAL_SAVES === undefined) {
                    savedCharacters.LOCAL_SAVES = {};
                }
                savedCharacters.LOCAL_SAVES[action.value.CHARACTER_ID] = { ...savedCharacters.LOCAL_SAVES[action.value.CHARACTER_ID], ...action.value };
                localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(savedCharacters));
            }
            break;
        case GameHostActions.REMOVE_PLAYER_DATA:
            delete state.PLAYERS[action.value];
            break;
        case GameHostActions.SET_CHAT_MESSAGES:
            state.CHAT_MESSAGES = action.value;
            if (state.ROOM_CODE !== "") {
                let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
                if (!localValues.SAVED_ROOMS) {
                    localValues.SAVED_ROOMS = {};
                }
                if (!localValues.SAVED_ROOMS[state.ROOM_CODE]) {
                    localValues.SAVED_ROOMS[state.ROOM_CODE] = {};
                }
                localValues.SAVED_ROOMS[state.ROOM_CODE].CHAT_MESSAGES = state.CHAT_MESSAGES;
                localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localValues));
            }
            break;
        default:
            break;
    }
    return { ...state };
}

const GameHostContext = createContext<{ state: TGameHostState, dispatch: React.Dispatch<TAction> }>({ state: InitialGameHostState, dispatch: () => { } });

export { InitialGameHostState, GameHostContext, gameHostReducer };