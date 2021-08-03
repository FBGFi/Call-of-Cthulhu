import React, { createContext } from 'react';
import { HostedGameActions } from '../../actions';
import { Socket, io } from 'socket.io-client';
import { TChatMessage } from '../../components/ChatMessage';
import md5 from 'md5';

type TAction = {
    type: string;
    value?: any;
}
type THostedGameState = {
    SOCKET: Socket | undefined;
    SOCKET_ADDRESS: string;
    CHAT_MESSAGES: TChatMessage[];
    ROOM_CODE: string;
    PLAYER_ID: string;
    PLAYER_NAME: string;
}

const getCookieValue = (name: string): string => {
    let cookies = document.cookie.split('; ');
    let splitCookie: string[];
    if (cookies.length > 1) {
        for (let cookie of cookies) {
            splitCookie = cookie.split(name + '=');
            if (splitCookie.length > 1) {
                return splitCookie[1];
            }
        }
    } else {
        cookies = document.cookie.split(name + '=');
        if (cookies.length === 2) {
            return cookies[1];
        }
    }
    return "";
}

const InitialHostedGameState: THostedGameState = {
    SOCKET: undefined,
    SOCKET_ADDRESS: getCookieValue('CALL_OF_CTHULHU_RECENT_HOST_ADDRESS'),
    ROOM_CODE: getCookieValue('CALL_OF_CTHULHU_RECENT_HOST_ROOM_CODE'),
    PLAYER_ID: getCookieValue('CALL_OF_CTHULHU_RECENT_PLAYER_ID'),
    PLAYER_NAME: getCookieValue('CALL_OF_CTHULHU_RECENT_PLAYER_NAME'),
    CHAT_MESSAGES: []
}

const changeSavedCharacterData = (id: string, playerName: string) => {
    let localValues = JSON.parse(window.localStorage.CALL_OF_CTHULHU);
    if (localValues.LOCAL_SAVES[id]) {
        if (!localValues.LOCAL_SAVES[id].CHARACTER_INFO) {
            localValues.LOCAL_SAVES[id].CHARACTER_INFO = {
                NAME: "",
                PLAYER: "",
                OCCUPATICE: "",
                AGE: undefined,
                SEX: "NONE",
                RESIDENCE: "",
                BIRTHPLACE: "",
                IMAGE: {
                    SRC: undefined,
                    TITLE: undefined
                }
            }
        }
        localValues.LOCAL_SAVES[id].CHARACTER_INFO.PLAYER = playerName;
        localStorage.setItem('CALL_OF_CTHULHU', JSON.stringify(localValues));
    }
}

function hostedGameReducer(state: THostedGameState, action: TAction): THostedGameState {
    switch (action.type) {
        case HostedGameActions.SET_ROOM_CODE:
            state.ROOM_CODE = action.value;
            document.cookie = `CALL_OF_CTHULHU_RECENT_HOST_ROOM_CODE=${action.value}; path=/hosted`;
            break;
        case HostedGameActions.SET_PLAYER_ID:
            state.PLAYER_ID = action.value;
            document.cookie = `CALL_OF_CTHULHU_RECENT_PLAYER_ID=${action.value}; path=/hosted`;
            if (state.PLAYER_NAME !== "") {
                changeSavedCharacterData(action.value, state.PLAYER_NAME);
            }
            break;
        case HostedGameActions.SET_PLAYER_NAME:
            state.PLAYER_NAME = action.value;
            document.cookie = `CALL_OF_CTHULHU_RECENT_PLAYER_NAME=${action.value}; path=/hosted`;
            if (state.PLAYER_ID !== "") {
                changeSavedCharacterData(state.PLAYER_ID, action.value);
            }
            break;
        case HostedGameActions.SET_SOCKET_ADDRESS:
            if (action.value.split(':').length > 1) {
                state.SOCKET_ADDRESS = action.value;
                document.cookie = `CALL_OF_CTHULHU_RECENT_HOST_ADDRESS=${action.value}; path=/hosted`;
            }
            break;
        case HostedGameActions.CONNECT_TO_HOST:
            if(state.PLAYER_ID === ""){
                state.PLAYER_ID = md5(Date.now().toString());
            }
            
            if(state.SOCKET_ADDRESS === "" && state.ROOM_CODE === ""){
                state.SOCKET_ADDRESS = getCookieValue('CALL_OF_CTHULHU_RECENT_HOST_ADDRESS');
                state.ROOM_CODE = getCookieValue('CALL_OF_CTHULHU_RECENT_HOST_ROOM_CODE');
            }
            if (!state.SOCKET && state.SOCKET_ADDRESS !== "" && state.ROOM_CODE !== "") {   
            
                state.SOCKET = io(state.SOCKET_ADDRESS, {
                    reconnectionAttempts: 10,
                    reconnectionDelay: 1000,
                });
                state.SOCKET.on('connect', () => {
                    console.log('Connected');
                    if(state.SOCKET){
                        state.SOCKET.emit('verify-player', state.ROOM_CODE);
                    }
                });
                state.SOCKET.on('disconnect', () => {
                    console.log('Disconnected');
                });
                state.SOCKET.on('host-disconnected', () => {
                    window.alert('Host has disconnected');                  
                });
                state.SOCKET.on('incorrect-room-code', () => {
                    window.alert('Incorrect room code!');
                });
            }
            break;
        case HostedGameActions.SEND_PLAYER_DATA:
            if (state.SOCKET) {
                state.SOCKET.emit('player-data-update', action.value);
            }
            break;
        case HostedGameActions.SET_CHAT_MESSAGES:
            state.CHAT_MESSAGES = action.value;
            break;
        case HostedGameActions.SEND_CHAT_MESSAGE:
            if(state.SOCKET){
                state.SOCKET.emit('player-send-message', action.value);
            }
            break;
        case HostedGameActions.DISCONNECT_FROM_HOST:
            if(state.SOCKET){
                state.SOCKET.disconnect();
                state.SOCKET_ADDRESS = "";
                state.ROOM_CODE = "";
                state.SOCKET = undefined;
            }
            break;
        default:
            break;
    }
    return { ...state };
}

const HostedGameContext = createContext<{ state: THostedGameState, dispatch: React.Dispatch<TAction> }>({ state: InitialHostedGameState, dispatch: () => { } });

export { InitialHostedGameState, HostedGameContext, hostedGameReducer };